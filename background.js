// Fixed Background script for Readdit Later Chrome Extension
class BackgroundService {
    constructor() {
        // Your Reddit OAuth app credentials
        this.CLIENT_ID = '8CrlJzuJJQD4Til84uSkZw';
        this.CLIENT_SECRET = 'YlPkZrIrj4BCT7dwwAkpUY_c6DD-3A';
        this.REDIRECT_URI = 'https://jpfhhhilbgphfpboemobmnjejaojgmcg.chromiumapp.org/';
        
        this.initializeListeners();
    }

    initializeListeners() {
        // Check if chrome APIs are available
        if (!chrome || !chrome.runtime) {
            console.error('Chrome APIs not available');
            return;
        }

        // Extension installation/update handler
        if (chrome.runtime.onInstalled) {
            chrome.runtime.onInstalled.addListener((details) => {
                this.handleInstall(details);
            });
        }

        // Message handling from popup and content scripts
        if (chrome.runtime.onMessage) {
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                this.handleMessage(message, sender, sendResponse);
                return true; // Indicates we will send a response asynchronously
            });
        }

        // Alarm handling for periodic sync
        if (chrome.alarms && chrome.alarms.onAlarm) {
            chrome.alarms.onAlarm.addListener((alarm) => {
                this.handleAlarm(alarm);
            });
        }

        // Storage change listener
        if (chrome.storage && chrome.storage.onChanged) {
            chrome.storage.onChanged.addListener((changes, namespace) => {
                this.handleStorageChange(changes, namespace);
            });
        }
    }

    async handleInstall(details) {
        console.log('Readdit Later installed/updated:', details.reason);
        
        if (details.reason === 'install') {
            try {
                // Set up default settings
                if (chrome.storage && chrome.storage.local) {
                    await chrome.storage.local.set({
                        settings: {
                            autoSync: true,
                            syncInterval: 60, // minutes
                            theme: 'light',
                            notifications: true
                        },
                        installation_date: Date.now()
                    });
                }

                // Create periodic sync alarm
                if (chrome.alarms) {
                    await chrome.alarms.create('syncSavedPosts', {
                        delayInMinutes: 1,
                        periodInMinutes: 60
                    });
                }
            } catch (error) {
                console.error('Error during installation setup:', error);
            }
        }
    }

    async handleMessage(message, sender, sendResponse) {
        try {
            switch (message.type) {
                case 'EXCHANGE_AUTH_CODE':
                    const authData = await this.exchangeCodeForToken(message.code);
                    sendResponse({ success: true, data: authData });
                    break;

                case 'SYNC_SAVED_POSTS':
                    const result = await this.syncSavedPosts();
                    sendResponse({ success: true, data: result });
                    break;

                case 'GET_AUTH_STATUS':
                    const authStatus = await this.getAuthStatus();
                    sendResponse({ success: true, data: authStatus });
                    break;

                case 'REFRESH_TOKEN':
                    const refreshResult = await this.refreshAccessToken();
                    sendResponse({ success: true, data: refreshResult });
                    break;

                case 'GET_SETTINGS':
                    const settings = await this.getSettings();
                    sendResponse({ success: true, data: settings });
                    break;

                case 'UPDATE_SETTINGS':
                    await this.updateSettings(message.settings);
                    sendResponse({ success: true });
                    break;

                case 'CLEAR_AUTH':
                    await this.clearAuthentication();
                    sendResponse({ success: true });
                    break;

                case 'OPEN_DETAILED_VIEW':
                    if (chrome.tabs) {
                        chrome.tabs.create({ 
                            url: chrome.runtime.getURL('detailed-view.html') 
                        });
                    }
                    sendResponse({ success: true });
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown message type' });
            }
        } catch (error) {
            console.error('Error handling message:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    // NEW: Handle OAuth code exchange in background script to avoid CORS
    async exchangeCodeForToken(code) {
        try {
            console.log('Exchanging authorization code for access token...');

            const response = await fetch('https://www.reddit.com/api/v1/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`)}`,
                    'User-Agent': 'ReadditLater/1.0'
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: this.REDIRECT_URI
                })
            });

            console.log('Token exchange response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Token exchange failed:', response.status, errorText);
                throw new Error(`Token exchange failed: ${response.status} - ${errorText}`);
            }

            const tokenData = await response.json();
            console.log('Token data received:', Object.keys(tokenData));
            
            // Check for error in response
            if (tokenData.error) {
                throw new Error(`Reddit API error: ${tokenData.error} - ${tokenData.error_description || ''}`);
            }
            
            // Store tokens securely
            await chrome.storage.local.set({
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                token_expires: Date.now() + (tokenData.expires_in * 1000),
                authenticated: true
            });

            console.log('Tokens stored successfully');
            return tokenData;

        } catch (error) {
            console.error('Token exchange error:', error);
            throw error;
        }
    }

    handleAlarm(alarm) {
        switch (alarm.name) {
            case 'syncSavedPosts':
                this.syncSavedPostsBackground();
                break;
        }
    }

    async handleStorageChange(changes, namespace) {
        if (namespace === 'local' && changes.settings) {
            const newSettings = changes.settings.newValue;
            if (newSettings && newSettings.syncInterval && chrome.alarms) {
                try {
                    // Update sync alarm interval
                    await chrome.alarms.clear('syncSavedPosts');
                    await chrome.alarms.create('syncSavedPosts', {
                        delayInMinutes: 1,
                        periodInMinutes: newSettings.syncInterval
                    });
                } catch (error) {
                    console.error('Error updating sync alarm:', error);
                }
            }
        }
    }

    async syncSavedPosts() {
        try {
            const authData = await chrome.storage.local.get(['access_token']);
            
            if (!authData.access_token) {
                throw new Error('No access token available');
            }

            console.log('Starting saved posts sync...');
            
            const response = await fetch('https://oauth.reddit.com/user/saved', {
                headers: {
                    'Authorization': `Bearer ${authData.access_token}`,
                    'User-Agent': 'ReadditLater/1.0'
                }
            });

            console.log('Saved posts API response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Saved posts API error:', response.status, errorText);
                throw new Error(`Failed to fetch saved posts: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Saved posts data received:', data.data?.children?.length || 0, 'posts');
            
            // Store the saved posts
            await chrome.storage.local.set({
                saved_posts: data.data.children,
                last_sync: Date.now()
            });

            console.log('Saved posts stored successfully');
            
            return {
                posts_count: data.data.children.length,
                last_sync: Date.now()
            };

        } catch (error) {
            console.error('Sync error:', error);
            throw error;
        }
    }

    async syncSavedPostsBackground() {
        try {
            await this.syncSavedPosts();
        } catch (error) {
            console.error('Background sync failed:', error);
            // Don't throw error in background context
        }
    }

    async fetchUserInfo(accessToken) {
        const response = await this.makeRedditRequest(
            'https://oauth.reddit.com/api/v1/me',
            accessToken
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('User info fetch error:', errorText);
            throw new Error(`Failed to fetch user info: ${response.status}`);
        }

        return await response.json();
    }

    async fetchAllSavedPosts(accessToken, username, after = null, allPosts = []) {
        const limit = 100;
        let url = `https://oauth.reddit.com/user/${username}/saved?limit=${limit}`;
        
        if (after) {
            url += `&after=${after}`;
        }

        console.log('Fetching saved posts from:', url);

        const response = await this.makeRedditRequest(url, accessToken);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Saved posts fetch error:', errorText);
            throw new Error(`Failed to fetch saved posts: ${response.status}`);
        }

        const data = await response.json();
        const posts = data.data.children;
        allPosts.push(...posts);

        console.log(`Fetched ${posts.length} posts, total: ${allPosts.length}`);

        // If there are more posts, fetch them recursively
        if (data.data.after && posts.length === limit) {
            return await this.fetchAllSavedPosts(accessToken, username, data.data.after, allPosts);
        }

        return allPosts;
    }

    async refreshAccessToken() {
        try {
            const authData = await this.getStoredAuth();
            if (!authData || !authData.refresh_token) {
                throw new Error('No refresh token available');
            }

            console.log('Refreshing access token...');

            const response = await fetch('https://www.reddit.com/api/v1/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`)}`,
                    'User-Agent': 'ReadditLater/1.0'
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: authData.refresh_token
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Token refresh error:', errorText);
                throw new Error(`Failed to refresh token: ${response.status}`);
            }

            const tokenData = await response.json();
            
            if (tokenData.error) {
                throw new Error(`Token refresh error: ${tokenData.error}`);
            }
            
            // Update stored auth data
            const updatedAuth = {
                ...authData,
                access_token: tokenData.access_token,
                expires_at: Date.now() + (tokenData.expires_in * 1000),
                token_type: tokenData.token_type,
                timestamp: Date.now()
            };

            // Keep the refresh token if a new one wasn't provided
            if (tokenData.refresh_token) {
                updatedAuth.refresh_token = tokenData.refresh_token;
            }

            await this.storeAuthData(updatedAuth);
            console.log('Token refreshed successfully');
            
            return updatedAuth;

        } catch (error) {
            console.error('Token refresh error:', error);
            // Clear invalid auth data
            await this.clearAuthentication();
            throw error;
        }
    }

    isTokenExpired(authData) {
        if (!authData.expires_at) {
            // If no expiry time, assume it needs refresh after 1 hour
            return (Date.now() - authData.timestamp) > (60 * 60 * 1000);
        }
        // Refresh 5 minutes before actual expiry
        return Date.now() >= (authData.expires_at - 5 * 60 * 1000);
    }

    async getStoredAuth() {
        if (!chrome.storage || !chrome.storage.local) {
            return null;
        }
        
        return new Promise((resolve) => {
            chrome.storage.local.get(['reddit_auth'], (result) => {
                if (chrome.runtime.lastError) {
                    console.error('Storage error:', chrome.runtime.lastError);
                    resolve(null);
                } else {
                    resolve(result.reddit_auth);
                }
            });
        });
    }

    async storeAuthData(authData) {
        if (!chrome.storage || !chrome.storage.local) {
            throw new Error('Storage API not available');
        }
        
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({ reddit_auth: authData }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    async storeSavedPosts(posts, metadata) {
        if (!chrome.storage || !chrome.storage.local) {
            throw new Error('Storage API not available');
        }
        
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({
                saved_posts: posts,
                sync_metadata: metadata,
                last_sync: metadata.last_sync
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    async getAuthStatus() {
        try {
            const data = await chrome.storage.local.get(['access_token', 'token_expires', 'authenticated']);
            console.log('Checking auth status:', { 
                hasToken: !!data.access_token, 
                authenticated: data.authenticated,
                expired: data.token_expires ? Date.now() > data.token_expires : 'no expiry'
            });
            
            if (!data.access_token || !data.authenticated) {
                return { authenticated: false };
            }
            
            // Check if token is expired
            if (data.token_expires && Date.now() > data.token_expires) {
                console.log('Token expired');
                return { authenticated: false };
            }
            
            return { authenticated: true };
        } catch (error) {
            console.error('Auth status check error:', error);
            return { authenticated: false };
        }
    }

    async getSettings() {
        if (!chrome.storage || !chrome.storage.local) {
            return {
                autoSync: true,
                syncInterval: 60,
                theme: 'light',
                notifications: true
            };
        }
        
        return new Promise((resolve) => {
            chrome.storage.local.get(['settings'], (result) => {
                if (chrome.runtime.lastError) {
                    console.error('Storage error:', chrome.runtime.lastError);
                    resolve({
                        autoSync: true,
                        syncInterval: 60,
                        theme: 'light',
                        notifications: true
                    });
                } else {
                    resolve(result.settings || {
                        autoSync: true,
                        syncInterval: 60,
                        theme: 'light',
                        notifications: true
                    });
                }
            });
        });
    }

    async updateSettings(newSettings) {
        if (!chrome.storage || !chrome.storage.local) {
            throw new Error('Storage API not available');
        }
        
        const currentSettings = await this.getSettings();
        const updatedSettings = { ...currentSettings, ...newSettings };
        
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({ settings: updatedSettings }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    async clearAuthentication() {
        if (!chrome.storage || !chrome.storage.local) {
            throw new Error('Storage API not available');
        }
        
        return new Promise((resolve, reject) => {
            chrome.storage.local.remove(['reddit_auth'], () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    async makeRedditRequest(url, accessToken) {
        return fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'ReadditLater/1.0'
            }
        });
    }

    async showSyncNotification(postCount) {
        if (chrome.notifications) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/logo.png',
                title: 'Readdit Later',
                message: `Synced ${postCount} saved post${postCount !== 1 ? 's' : ''}!`
            });
        }
    }
}