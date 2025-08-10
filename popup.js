// Fixed Popup functionality for Readdit Later
class PopupManager {
    constructor() {
        this.elements = {};
        this.currentState = 'loading';
        this.isDebugMode = false; // Set to true for development
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    async init() {
        this.initializeElements();
        this.setupEventListeners();
        await this.checkAuthStatus();
    }

    initializeElements() {
        this.elements = {
            // States
            loadingState: document.getElementById('loadingState'),
            authSection: document.getElementById('authSection'),
            mainContent: document.getElementById('mainContent'),
            emptyState: document.getElementById('emptyState'),
            errorMessage: document.getElementById('errorMessage'),
            
            // Buttons
            authButton: document.getElementById('authButton'),
            detailedViewButton: document.getElementById('detailedViewButton'),
            syncButton: document.getElementById('syncButton'),
            
            // Stats
            totalPosts: document.getElementById('totalPosts'),
            weeklyPosts: document.getElementById('weeklyPosts'),
            totalSubreddits: document.getElementById('totalSubreddits'),
            
            // Recent posts
            recentPosts: document.getElementById('recentPosts'),
            
            // Debug
            debugInfo: document.getElementById('debugInfo'),
            debugContent: document.getElementById('debugContent')
        };
    }

    setupEventListeners() {
        if (this.elements.authButton) {
            this.elements.authButton.addEventListener('click', () => this.handleAuthentication());
        }
        
        if (this.elements.detailedViewButton) {
            this.elements.detailedViewButton.addEventListener('click', () => this.openDetailedView());
        }

        if (this.elements.syncButton) {
            this.elements.syncButton.addEventListener('click', () => this.forceSyncPosts());
        }

        // Add reload extension button if it exists
        const reloadButton = document.getElementById('reloadExtension');
        if (reloadButton) {
            reloadButton.addEventListener('click', () => {
                chrome.runtime.reload();
            });
        }
    }

    async sendMessageToBackground(message, timeoutMs = 15000) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Background script timeout - no response within ' + (timeoutMs/1000) + ' seconds'));
            }, timeoutMs);

            try {
                chrome.runtime.sendMessage(message, (response) => {
                    clearTimeout(timeout);
                    
                    if (chrome.runtime.lastError) {
                        console.error('Message error:', chrome.runtime.lastError);
                        reject(new Error(chrome.runtime.lastError.message));
                    } else if (response && response.success === false) {
                        console.error('Background script error:', response.error);
                        reject(new Error(response.error));
                    } else {
                        resolve(response);
                    }
                });
            } catch (error) {
                clearTimeout(timeout);
                console.error('Send message error:', error);
                reject(error);
            }
        });
    }

    async handleAuthentication() {
        try {
            console.log('Starting authentication...');
            this.showState('loading');
            this.updateButtonState(true, 'Connecting...');

            // First check if we're already authenticated
            const authStatus = await this.sendMessageToBackground({ type: 'GET_AUTH_STATUS' });
            if (authStatus && authStatus.success && authStatus.data && authStatus.data.authenticated) {
                console.log('Already authenticated, loading data...');
                await this.loadData();
                return;
            }

            // Ensure correct scopes are requested for Reddit OAuth
            // If your background script uses a scopes property, pass it here
            const requiredScopes = 'read save';
            const response = await this.sendMessageToBackground({ type: 'AUTHENTICATE', scopes: requiredScopes }, 60000); // 1 minute timeout for OAuth

            if (response && response.success) {
                console.log('Authentication successful');
                // Wait a moment for data to sync, then load
                setTimeout(() => {
                    this.loadData();
                }, 2000);
            } else {
                throw new Error(response?.error || 'Authentication failed');
            }
        } catch (error) {
            console.error('Authentication error:', error);

            // Handle specific error types
            if (error.message.includes('timeout')) {
                this.showError('Authentication timed out. Please try again.');
            } else if (error.message.includes('cancelled')) {
                this.showError('Authentication was cancelled. Please try again.');
            } else if (error.message.includes('No authorization code')) {
                this.showError('Reddit authorization failed. Please check your Reddit app settings and try again.');
            } else if (error.message.includes('forbidden') || error.message.includes('403')) {
                this.showError('Access forbidden. Please ensure your Reddit app has "read" and "save" scopes enabled in its settings.');
            } else {
                this.showError('Authentication failed: ' + error.message);
            }

            this.showState('auth');
        } finally {
            this.updateButtonState(false, 'Connect Reddit Account');
        }
    }

    updateButtonState(disabled, text) {
        if (this.elements.authButton) {
            this.elements.authButton.disabled = disabled;
            this.elements.authButton.textContent = text;
            
            if (disabled) {
                this.elements.authButton.style.opacity = '0.6';
                this.elements.authButton.style.cursor = 'not-allowed';
            } else {
                this.elements.authButton.style.opacity = '1';
                this.elements.authButton.style.cursor = 'pointer';
            }
        }
    }

    async checkAuthStatus() {
        try {
            console.log('Checking authentication status...');
            this.showState('loading');
            
            const response = await this.sendMessageToBackground({ type: 'GET_AUTH_STATUS' });
            
            if (response && response.success && response.data && response.data.authenticated) {
                console.log('User is authenticated');
                await this.loadData();
            } else {
                console.log('User is not authenticated');
                this.showState('auth');
            }
        } catch (error) {
            console.error('Auth status check error:', error);
            
            // If background script is not responding, show helpful message
            if (error.message.includes('timeout') || error.message.includes('receiving end does not exist')) {
                this.showExtensionError('Extension communication failed. The extension may need to be reloaded.');
            } else {
                this.showError('Failed to check authentication status: ' + error.message);
                this.showState('auth');
            }
        }
    }

    showExtensionError(message) {
        const statusElement = document.getElementById('extensionStatus');
        const contentElement = document.getElementById('statusContent');
        
        if (statusElement && contentElement) {
            contentElement.textContent = message;
            statusElement.style.display = 'block';
        } else {
            this.showError(message);
        }
        
        // Hide other sections
        this.showState('loading'); // This will hide other sections
        this.elements.loadingState.style.display = 'none';
    }

    async loadData() {
        try {
            console.log('Loading user data...');
            
            // Get saved posts data from background script
            const savedPostsResponse = await this.sendMessageToBackground({ type: 'GET_SAVED_POSTS' });
            
            if (savedPostsResponse && savedPostsResponse.success) {
                const data = savedPostsResponse.data;
                const posts = data.posts || [];
                
                console.log('Loaded', posts.length, 'saved posts');
                
                if (posts.length === 0) {
                    // Try to sync first before showing empty state
                    try {
                        console.log('No posts found, attempting sync...');
                        const syncResponse = await this.sendMessageToBackground({ type: 'SYNC_SAVED_POSTS' });
                        if (syncResponse && syncResponse.success) {
                            const updatedResponse = await this.sendMessageToBackground({ type: 'GET_SAVED_POSTS' });
                            if (updatedResponse && updatedResponse.success && updatedResponse.data.posts.length > 0) {
                                this.displayData(updatedResponse.data.posts, updatedResponse.data.last_sync);
                                this.showState('main');
                                return;
                            }
                        }
                    } catch (syncError) {
                        console.warn('Initial sync failed:', syncError);
                    }
                    
                    this.showState('empty');
                } else {
                    this.displayData(posts, data.last_sync);
                    this.showState('main');
                }
            } else {
                console.log('No saved posts data available');
                this.showState('empty');
            }
            
        } catch (error) {
            console.error('Data loading error:', error);
            
            if (error.message.includes('timeout')) {
                this.showError('Failed to load data: Connection timeout. Try refreshing the extension.');
            } else {
                this.showError('Failed to load data: ' + error.message);
            }
            
            // Show empty state instead of keeping loading
            this.showState('empty');
        }
    }

    displayData(posts, lastSync) {
        console.log('Displaying data for', posts.length, 'posts');
        
        // Update stats
        this.updateStats(posts, lastSync);
        
        // Show recent posts (last 3)
        this.displayRecentPosts(posts.slice(0, 3));
        
        // Debug info
        this.updateDebugInfo(posts.length, lastSync);
    }

    updateStats(posts, lastSync) {
        const now = Date.now();
        const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
        
        // Total posts
        if (this.elements.totalPosts) {
            this.elements.totalPosts.textContent = posts.length;
        }
        
        // Weekly posts
        const weeklyPosts = posts.filter(post => {
            const postTime = post.created_utc ? post.created_utc * 1000 : 0;
            return postTime > oneWeekAgo;
        });
        
        if (this.elements.weeklyPosts) {
            this.elements.weeklyPosts.textContent = weeklyPosts.length;
        }
        
        // Total subreddits
        if (this.elements.totalSubreddits) {
            const uniqueSubreddits = new Set(posts.map(post => post.subreddit).filter(Boolean));
            this.elements.totalSubreddits.textContent = uniqueSubreddits.size;
        }
    }

    displayRecentPosts(posts) {
        if (!this.elements.recentPosts) return;
        
        this.elements.recentPosts.innerHTML = '';
        
        if (posts.length === 0) {
            this.elements.recentPosts.innerHTML = '<p style="text-align: center; color: #7c7c83;">No recent posts found</p>';
            return;
        }
        
        posts.forEach(post => {
            const postElement = this.createPostElement(post);
            this.elements.recentPosts.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'recent-item';
        
        const title = post.title || 'Untitled';
        const subreddit = post.subreddit || 'unknown';
        const timeAgo = this.getTimeAgo(new Date(post.created_utc * 1000));
        
        // Create clickable title that opens Reddit post
        const redditUrl = `https://reddit.com${post.permalink}`;
        
        postDiv.innerHTML = `
            <div class="recent-title">
                <a href="${redditUrl}" target="_blank" style="color: inherit; text-decoration: none;">
                    ${this.escapeHtml(title)}
                </a>
            </div>
            <div class="recent-meta">
                <span class="subreddit">r/${subreddit}</span>
                <span>${timeAgo}</span>
            </div>
        `;
        
        // Add hover effect
        postDiv.addEventListener('mouseenter', () => {
            postDiv.style.cursor = 'pointer';
        });
        
        // Make entire item clickable
        postDiv.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                window.open(redditUrl, '_blank');
            }
        });
        
        return postDiv;
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays}d ago`;
        } else if (diffHours > 0) {
            return `${diffHours}h ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes}m ago`;
        } else {
            return 'Just now';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateDebugInfo(postsCount, lastSync) {
        if (!this.isDebugMode || !this.elements.debugContent) return;
        
        const debugData = {
            postsCount: postsCount,
            lastSync: lastSync ? new Date(lastSync).toLocaleString() : 'Never',
            timestamp: new Date().toLocaleString()
        };
        
        this.elements.debugContent.textContent = JSON.stringify(debugData, null, 2);
        this.elements.debugInfo.style.display = 'block';
    }

    showState(state) {
        console.log('Showing state:', state);
        this.currentState = state;
        
        // Hide all states first
        if (this.elements.loadingState) this.elements.loadingState.style.display = 'none';
        if (this.elements.authSection) this.elements.authSection.style.display = 'none';
        if (this.elements.mainContent) this.elements.mainContent.style.display = 'none';
        if (this.elements.emptyState) this.elements.emptyState.style.display = 'none';
        if (this.elements.errorMessage) this.elements.errorMessage.style.display = 'none';
        
        // Hide extension status unless it's being shown specifically
        const statusElement = document.getElementById('extensionStatus');
        if (statusElement && state !== 'error') {
            statusElement.style.display = 'none';
        }
        
        // Show the appropriate state
        switch (state) {
            case 'loading':
                if (this.elements.loadingState) {
                    this.elements.loadingState.style.display = 'block';
                }
                break;
                
            case 'auth':
                if (this.elements.authSection) {
                    this.elements.authSection.style.display = 'block';
                }
                break;
                
            case 'main':
                if (this.elements.mainContent) {
                    this.elements.mainContent.style.display = 'block';
                }
                break;
                
            case 'empty':
                if (this.elements.emptyState) {
                    this.elements.emptyState.style.display = 'block';
                }
                break;
        }
    }

    showError(message) {
        console.error('Showing error:', message);
        if (this.elements.errorMessage) {
            this.elements.errorMessage.textContent = message;
            this.elements.errorMessage.style.display = 'block';
            
            // Hide error after 10 seconds
            setTimeout(() => {
                if (this.elements.errorMessage) {
                    this.elements.errorMessage.style.display = 'none';
                }
            }, 10000);
        }
    }

    openDetailedView() {
        try {
            chrome.tabs.create({ url: chrome.runtime.getURL('detailed-view.html') });
            window.close();
        } catch (error) {
            console.error('Error opening detailed view:', error);
            this.showError('Failed to open detailed view');
        }
    }

    // Force sync posts - useful for testing
    async forceSyncPosts() {
        try {
            console.log('Force syncing posts...');
            
            // Update sync button to show loading state
            if (this.elements.syncButton) {
                this.elements.syncButton.disabled = true;
                this.elements.syncButton.textContent = '🔄 Syncing...';
                this.elements.syncButton.style.opacity = '0.6';
            }
            
            const response = await this.sendMessageToBackground({ type: 'SYNC_SAVED_POSTS' });
            
            if (response && response.success) {
                console.log('Force sync successful');
                this.showMessage('Posts synced successfully!', 'success');
                // Reload the data after a short delay
                setTimeout(async () => {
                    await this.loadData();
                }, 1000);
            } else {
                throw new Error(response?.error || 'Sync failed');
            }
        } catch (error) {
            console.error('Force sync error:', error);
            this.showError('Failed to sync posts: ' + error.message);
        } finally {
            // Reset sync button
            if (this.elements.syncButton) {
                this.elements.syncButton.disabled = false;
                this.elements.syncButton.textContent = '🔄 Sync Posts Now';
                this.elements.syncButton.style.opacity = '1';
            }
        }
    }

    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `popup-message popup-message-${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            right: 10px;
            z-index: 1000;
            padding: 10px;
            border-radius: 6px;
            font-size: 12px;
            text-align: center;
            ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : ''}
            ${type === 'error' ? 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;' : ''}
            ${type === 'info' ? 'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;' : ''}
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Popup DOM loaded, initializing...');
    const popup = new PopupManager();
    popup.init().catch(error => {
        console.error('Popup initialization error:', error);
        
        // Show a fallback error state
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Extension initialization failed: ' + error.message;
        errorDiv.style.display = 'block';
        
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(errorDiv, container.firstChild);
        }
    });
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global popup error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection in popup:', event.reason);
});

console.log('Popup script loaded');