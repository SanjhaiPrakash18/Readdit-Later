// Fixed Popup functionality for Readdit Later
class PopupController {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadData();
    }

    initializeElements() {
        this.elements = {
            loadingState: document.getElementById('loadingState'),
            authSection: document.getElementById('authSection'),
            mainContent: document.getElementById('mainContent'),
            emptyState: document.getElementById('emptyState'),
            errorMessage: document.getElementById('errorMessage'),
            authButton: document.getElementById('authButton'),
            detailedViewButton: document.getElementById('detailedViewButton'),
            totalPosts: document.getElementById('totalPosts'),
            weeklyPosts: document.getElementById('weeklyPosts'),
            topSubreddit: document.getElementById('topSubreddit'),
            topSubredditCount: document.getElementById('topSubredditCount'),
            recentPosts: document.getElementById('recentPosts')
        };
    }

    bindEvents() {
        this.elements.authButton.addEventListener('click', () => this.authenticate());
        this.elements.detailedViewButton.addEventListener('click', () => this.openDetailedView());
    }

    showState(stateName) {
        // Hide all states
        Object.values(this.elements).forEach(el => {
            if (el && el.style) {
                el.style.display = 'none';
            }
        });

        // Show specific state
        switch (stateName) {
            case 'loading':
                this.elements.loadingState.style.display = 'block';
                break;
            case 'auth':
                this.elements.authSection.style.display = 'block';
                break;
            case 'main':
                this.elements.mainContent.style.display = 'block';
                break;
            case 'empty':
                this.elements.emptyState.style.display = 'block';
                break;
        }
    }

    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorMessage.style.display = 'block';
        setTimeout(() => {
            this.elements.errorMessage.style.display = 'none';
        }, 5000);
    }

    async loadData() {
        this.showState('loading');

        try {
            // Check authentication status using background script
            const authStatus = await this.sendMessageToBackground({
                type: 'GET_AUTH_STATUS'
            });

            if (!authStatus.authenticated) {
                this.showState('auth');
                return;
            }

            // Check if we have stored posts
            const storedData = await this.getStoredData();
            
            if (!storedData.saved_posts || storedData.saved_posts.length === 0) {
                // Try to sync first
                try {
                    await this.sendMessageToBackground({ type: 'SYNC_SAVED_POSTS' });
                    const newStoredData = await this.getStoredData();
                    
                    if (!newStoredData.saved_posts || newStoredData.saved_posts.length === 0) {
                        this.showState('empty');
                        return;
                    }
                    
                    this.displayMainContent(newStoredData.saved_posts.map(child => child.data));
                } catch (error) {
                    console.error('Sync failed:', error);
                    this.showState('empty');
                    return;
                }
            } else {
                this.displayMainContent(storedData.saved_posts.map(child => child.data));
            }

        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load your saved posts. Please try again.');
            
            // Check if we have any stored posts to show anyway
            const storedData = await this.getStoredData();
            if (storedData.saved_posts && storedData.saved_posts.length > 0) {
                this.displayMainContent(storedData.saved_posts.map(child => child.data));
            } else {
                this.showState('auth');
            }
        }
    }

    displayMainContent(posts) {
        // Calculate analytics
        const analytics = this.calculateAnalytics(posts);
        
        // Update UI
        this.updateAnalytics(analytics);
        this.updateRecentPosts(posts.slice(0, 3));
        
        this.showState('main');
    }

    async sendMessageToBackground(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else if (response && response.success) {
                    resolve(response.data);
                } else {
                    reject(new Error(response?.error || 'Unknown error'));
                }
            });
        });
    }

    async getStoredData() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['saved_posts', 'last_sync'], (result) => {
                resolve(result);
            });
        });
    }

    // FIXED: Simplified authentication using manual flow
    async authenticate() {
        try {
            this.showState('loading');
            
            // Create a simple redirect-based auth flow
            const authUrl = this.buildAuthUrl();
            
            // Use chrome.tabs instead of identity API for more control
            const tab = await chrome.tabs.create({ url: authUrl, active: true });
            
            // Listen for URL changes in the new tab
            this.listenForAuthCallback(tab.id);

        } catch (error) {
            console.error('Authentication error:', error);
            this.showError('Authentication failed: ' + error.message);
            this.showState('auth');
        }
    }

    buildAuthUrl() {
        const clientId = '8CrlJzuJJQD4Til84uSkZw';
        // Use a simple localhost redirect that we can detect
        const redirectUri = 'https://jpfhhhilbgphfbboemobmmjejaojgmcg.chromiumapp.com/';
        const scope = 'identity history';
        const state = Math.random().toString(36).substring(7);
        
        // Store state for verification
        chrome.storage.local.set({ auth_state: state });
        
        return `https://www.reddit.com/api/v1/authorize?` +
            `client_id=${clientId}&` +
            `response_type=code&` +
            `state=${state}&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `duration=permanent&` +
            `scope=${encodeURIComponent(scope)}`;
    }

    listenForAuthCallback(tabId) {
        const updateListener = (updatedTabId, changeInfo, tab) => {
            if (updatedTabId === tabId && changeInfo.url) {
                const url = changeInfo.url;
                
                // Check if this is our redirect URL
                if (url.includes('jpfhhhilbgphfbboemobmmjejaojgmcg.chromiumapp.com')) {
                    chrome.tabs.onUpdated.removeListener(updateListener);
                    chrome.tabs.remove(tabId);
                    
                    this.handleAuthResponse(url);
                }
                
                // Also handle error cases
                if (url.includes('error=')) {
                    chrome.tabs.onUpdated.removeListener(updateListener);
                    chrome.tabs.remove(tabId);
                    
                    const urlObj = new URL(url);
                    const error = urlObj.searchParams.get('error');
                    this.showError(`Authentication error: ${error}`);
                    this.showState('auth');
                }
            }
        };

        chrome.tabs.onUpdated.addListener(updateListener);
        
        // Also listen for tab removal (user closed auth tab)
        const removeListener = (removedTabId) => {
            if (removedTabId === tabId) {
                chrome.tabs.onRemoved.removeListener(removeListener);
                chrome.tabs.onUpdated.removeListener(updateListener);
                this.showError('Authentication was cancelled.');
                this.showState('auth');
            }
        };

        chrome.tabs.onRemoved.addListener(removeListener);
    }

    async handleAuthResponse(responseUrl) {
        try {
            console.log('Auth response URL:', responseUrl);
            
            const url = new URL(responseUrl);
            const code = url.searchParams.get('code');
            const state = url.searchParams.get('state');
            const error = url.searchParams.get('error');

            if (error) {
                throw new Error(`Reddit OAuth error: ${error}`);
            }

            if (!code) {
                throw new Error('No authorization code received');
            }

            // Verify state parameter
            const storedState = await this.getStoredState();
            if (state !== storedState) {
                throw new Error('Invalid state parameter - possible CSRF attack');
            }

            // Let background script handle token exchange to avoid CORS issues
            const authData = await this.sendMessageToBackground({
                type: 'EXCHANGE_AUTH_CODE',
                code: code
            });

            if (!authData) {
                throw new Error('Failed to exchange authorization code');
            }
            
            // Trigger initial sync
            await this.sendMessageToBackground({ type: 'SYNC_SAVED_POSTS' });
            
            this.loadData(); // Reload with new auth
            
        } catch (error) {
            console.error('Auth processing error:', error);
            this.showError('Authentication processing failed: ' + error.message);
            this.showState('auth');
        }
    }

    async getStoredState() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['auth_state'], (result) => {
                resolve(result.auth_state);
            });
        });
    }

    calculateAnalytics(posts) {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Calculate weekly posts
        const weeklyPosts = posts.filter(post => {
            const postDate = new Date(post.created_utc * 1000);
            return postDate >= weekAgo;
        }).length;

        // Calculate top subreddit
        const subredditCounts = {};
        posts.forEach(post => {
            const subreddit = post.subreddit;
            subredditCounts[subreddit] = (subredditCounts[subreddit] || 0) + 1;
        });

        const topSubredditEntry = Object.entries(subredditCounts)
            .sort(([,a], [,b]) => b - a)[0];

        return {
            totalPosts: posts.length,
            weeklyPosts,
            topSubreddit: topSubredditEntry ? {
                name: topSubredditEntry[0],
                count: topSubredditEntry[1]
            } : { name: 'None', count: 0 }
        };
    }

    updateAnalytics(analytics) {
        this.elements.totalPosts.textContent = analytics.totalPosts;
        this.elements.weeklyPosts.textContent = analytics.weeklyPosts;
        this.elements.topSubreddit.textContent = `r/${analytics.topSubreddit.name}`;
        this.elements.topSubredditCount.textContent = `${analytics.topSubreddit.count} posts`;
    }

    updateRecentPosts(recentPosts) {
        this.elements.recentPosts.innerHTML = '';

        if (recentPosts.length === 0) {
            this.elements.recentPosts.innerHTML = '<p style="text-align: center; color: #7c7c83; padding: 20px;">No recent posts</p>';
            return;
        }

        recentPosts.forEach(post => {
            const postElement = this.createRecentPostElement(post);
            this.elements.recentPosts.appendChild(postElement);
        });
    }

    createRecentPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'recent-item';
        
        const timeAgo = this.getTimeAgo(new Date(post.created_utc * 1000));
        
        postDiv.innerHTML = `
            <div class="recent-title">${this.escapeHtml(post.title)}</div>
            <div class="recent-meta">
                <span class="subreddit">r/${post.subreddit}</span>
                <span class="time">${timeAgo}</span>
            </div>
        `;

        postDiv.addEventListener('click', () => {
            chrome.tabs.create({ url: `https://reddit.com${post.permalink}` });
        });

        return postDiv;
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays}d ago`;
        } else if (diffHours > 0) {
            return `${diffHours}h ago`;
        } else {
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            return diffMinutes > 0 ? `${diffMinutes}m ago` : 'Just now';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    openDetailedView() {
        chrome.tabs.create({ url: chrome.runtime.getURL('detailed-view.html') });
        window.close(); // Close popup
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PopupController();
});