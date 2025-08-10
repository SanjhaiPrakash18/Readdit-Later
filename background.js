// Fixed background.js with improved Reddit API implementation
console.log('Background script starting...');

class BackgroundService {
    constructor() {
        this.CLIENT_ID = null;
        this.REDIRECT_URI = 'https://jpfhhhilbgphfpboemobmnjejaojgmcg.chromiumapp.org';
        
        // CRITICAL: Proper User-Agent format for Reddit API
        this.USER_AGENT = 'chrome-extension:readdit-later:v1.0.3 (by /u/Appropriate-Look-875)';
        
        // Rate limiting
        this.lastApiCall = 0;
        this.minApiInterval = 1000; // 1 second between API calls
        
        console.log('BackgroundService constructor called');
        console.log('Redirect URI:', this.REDIRECT_URI);
        this.initializeListeners();
        this.loadClientId();
    }

    async loadClientId() {
        try {
            const response = await fetch('http://localhost:3000/config');
            const config = await response.json();
            this.CLIENT_ID = config.clientId;
            console.log('Successfully loaded client ID from server.');
        } catch (error) {
            console.error('Error loading client ID from server:', error);
        }
    }

    initializeListeners() {
        console.log('Initializing background listeners...');
        
        try {
            // Extension installation/update handler
            if (chrome.runtime && chrome.runtime.onInstalled) {
                chrome.runtime.onInstalled.addListener((details) => {
                    console.log('Extension installed/updated:', details.reason);
                    this.handleInstall(details);
                });
            }

            // Message handling from popup and content scripts
            if (chrome.runtime && chrome.runtime.onMessage) {
                chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                    console.log('Background received message:', message.type, 'from:', sender.tab ? 'content script' : 'popup');
                    this.handleMessage(message, sender, sendResponse);
                    return true; // Indicates we will send a response asynchronously
                });
            }

            // Alarm handling for periodic sync
            if (chrome.alarms && chrome.alarms.onAlarm) {
                chrome.alarms.onAlarm.addListener((alarm) => {
                    console.log('Alarm triggered:', alarm.name);
                    this.handleAlarm(alarm);
                });
            }

            // Storage change listener
            if (chrome.storage && chrome.storage.onChanged) {
                chrome.storage.onChanged.addListener((changes, namespace) => {
                    this.handleStorageChange(changes, namespace);
                });
            }

            console.log('Background listeners initialized successfully');
        } catch (error) {
            console.error('Error initializing background listeners:', error);
        }
    }

    // Rate limiting helper
    async waitForRateLimit() {
        const now = Date.now();
        const timeSinceLastCall = now - this.lastApiCall;
        if (timeSinceLastCall < this.minApiInterval) {
            const waitTime = this.minApiInterval - timeSinceLastCall;
            console.log(`Rate limiting: waiting ${waitTime}ms`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        this.lastApiCall = Date.now();
    }

    async handleInstall(details) {
        console.log('Handling install:', details.reason);
        
        if (details.reason === 'install') {
            try {
                // Set up default settings
                if (chrome.storage && chrome.storage.local) {
                    await this.setStorageData({
                        settings: {
                            autoSync: true,
                            syncInterval: 60, // minutes
                            theme: 'light',
                            notifications: true
                        },
                        installation_date: Date.now()
                    });
                    console.log('Default settings saved');
                }

                // Create periodic sync alarm
                if (chrome.alarms) {
                    await chrome.alarms.create('syncSavedPosts', {
                        delayInMinutes: 1,
                        periodInMinutes: 60
                    });
                    console.log('Sync alarm created');
                }
            } catch (error) {
                console.error('Error during installation setup:', error);
            }
        }

        // Set side panel to open on action click. This will run on install and update.
        if (chrome.sidePanel) {
            chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
                .catch(error => console.error('Error setting side panel behavior:', error));
        } else {
            console.warn('chrome.sidePanel API not available.');
        }
    }

    async handleMessage(message, sender, sendResponse) {
        try {
            console.log('Processing message:', message.type);
            
            switch (message.type) {
                case 'AUTHENTICATE':
                    console.log('Starting authentication...');
                    const authResult = await this.startAuthenticationWithWebAuth();
                    sendResponse({ success: true, data: authResult });
                    break;

                case 'EXCHANGE_AUTH_CODE':
                    console.log('Exchanging auth code...');
                    const authData = await this.exchangeCodeForToken(message.code);
                    sendResponse({ success: true, data: authData });
                    break;

                case 'SYNC_SAVED_POSTS':
                    console.log('Syncing saved posts...');
                    const result = await this.syncSavedPosts();
                    sendResponse({ success: true, data: result });
                    break;

                case 'GET_SAVED_POSTS':
                    console.log('Getting saved posts...');
                    const posts = await this.getSavedPosts();
                    sendResponse({ success: true, data: posts });
                    break;

                case 'GET_AUTH_STATUS':
                    console.log('Getting auth status...');
                    const authStatus = await this.getAuthStatus();
                    console.log('Auth status result:', authStatus);
                    sendResponse({ success: true, data: authStatus });
                    break;

                case 'REFRESH_TOKEN':
                    console.log('Refreshing token...');
                    const refreshResult = await this.refreshAccessToken();
                    sendResponse({ success: true, data: refreshResult });
                    break;

                case 'GET_SETTINGS':
                    console.log('Getting settings...');
                    const settings = await this.getSettings();
                    sendResponse({ success: true, data: settings });
                    break;

                case 'UPDATE_SETTINGS':
                    console.log('Updating settings...');
                    await this.updateSettings(message.settings);
                    sendResponse({ success: true });
                    break;

                case 'CLEAR_AUTH':
                    console.log('Clearing auth...');
                    await this.clearAuthentication();
                    sendResponse({ success: true });
                    break;

                case 'LOGOUT':
                    console.log('Logging out...');
                    await this.clearAuthentication();
                    sendResponse({ success: true });
                    break;

                case 'UNSAVE_POST':
                    console.log('Unsaving post:', message.postId);
                    await this.unsavePost(message.postId);
                    sendResponse({ success: true });
                    break;

                case 'UNSAVE_MULTIPLE_POSTS':
                    console.log('Unsaving multiple posts:', message.postNames);
                    await this.unsaveMultiplePosts(message.postNames);
                    sendResponse({ success: true });
                    break;

                case 'OPEN_DETAILED_VIEW':
                    console.log('Opening detailed view...');
                    if (chrome.tabs) {
                        chrome.tabs.create({ 
                            url: chrome.runtime.getURL('detailed-view.html') 
                        });
                    }
                    sendResponse({ success: true });
                    break;

                case 'PING':
                    console.log('Ping received');
                    sendResponse({ success: true, data: 'pong' });
                    break;

                case 'TEST_API_ACCESS':
                    try {
                        // Make a simple API call to test access
                        await this.makeRedditAPICall('/api/v1/me');
                        sendResponse({ success: true });
                    } catch (error) {
                        console.error('API access test failed:', error);
                        sendResponse({ success: false, error: error.message });
                    }
                    break;

                case 'SAVE_POST_DATA':
                    console.log('Saving post data for post:', message.postId);
                    this.savePostData(message.postData)
                        .then(() => sendResponse({ success: true }))
                        .catch(error => {
                            console.error('Failed to save post data:', error);
                            sendResponse({ success: false, error: error.message });
                        });
                    break;

                default:
                    console.error('Unknown message type:', message.type);
                    sendResponse({ success: false, error: 'Unknown message type' });
            }
        } catch (error) {
            console.error('Error handling message:', error.message, error.stack);
            const errorMessage = error.message || (typeof error === 'object' ? JSON.stringify(error) : error.toString());
            sendResponse({ success: false, error: errorMessage });
        }
    }

    // Helper to generate a random string for the code verifier
    generateCodeVerifier() {
        const randomBytes = new Uint8Array(32);
        crypto.getRandomValues(randomBytes);
        return this.base64urlencode(randomBytes);
    }

    // Helper to create a code challenge from a code verifier
    async generateCodeChallenge(verifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return this.base64urlencode(new Uint8Array(hash));
    }

    // Helper to base64url encode data
    base64urlencode(buffer) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    async startAuthenticationWithWebAuth() {
        return new Promise(async (resolve, reject) => {
            const state = Math.random().toString(36).substring(7);
            const codeVerifier = this.generateCodeVerifier();
            const codeChallenge = await this.generateCodeChallenge(codeVerifier);

            // Store state and code_verifier for verification
            chrome.storage.local.set({ auth_state: state, code_verifier: codeVerifier });
            
            const authUrl = await this.buildAuthUrl(state, codeChallenge);
            console.log('Auth URL:', authUrl);
            
            // Use chrome.identity.launchWebAuthFlow for better OAuth handling
            if (chrome.identity && chrome.identity.launchWebAuthFlow) {
                chrome.identity.launchWebAuthFlow(
                    {
                        url: authUrl,
                        interactive: true
                    },
                    (responseUrl) => {
                        if (chrome.runtime.lastError) {
                            console.error('WebAuth error:', chrome.runtime.lastError);
                            reject(new Error(chrome.runtime.lastError.message));
                            return;
                        }
                        
                        if (!responseUrl) {
                            reject(new Error('Authentication was cancelled or failed'));
                            return;
                        }
                        
                        console.log('WebAuth response URL:', responseUrl);
                        
                        try {
                            this.handleAuthCallback(responseUrl)
                                .then(result => resolve(result))
                                .catch(error => reject(error));
                        } catch (error) {
                            reject(error);
                        }
                    }
                );
            } else {
                // Fallback to tab-based authentication if webAuthFlow is not available
                this.startTabBasedAuthentication()
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            }
        });
    }

    async startTabBasedAuthentication() {
        try {
            console.log('Starting tab-based Reddit authentication...');
            const state = Math.random().toString(36).substring(7);
            const codeVerifier = this.generateCodeVerifier();
            const codeChallenge = await this.generateCodeChallenge(codeVerifier);

            const authUrl = await this.buildAuthUrl(state, codeChallenge);
            
            // Store state for verification
            await this.setStorageData({ auth_state: state, code_verifier: codeVerifier });
            
            console.log('Auth URL:', authUrl);
            
            // Create a new tab for authentication
            const tab = await new Promise((resolve) => {
                chrome.tabs.create({ 
                    url: authUrl, 
                    active: true 
                }, resolve);
            });
            
            console.log('Created auth tab:', tab.id);
            
            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    chrome.tabs.onUpdated.removeListener(updateListener);
                    chrome.tabs.onRemoved.removeListener(removeListener);
                    reject(new Error('Authentication timeout - no response within 5 minutes'));
                }, 300000); // 5 minute timeout

                // Listen for tab updates
                const updateListener = (tabId, changeInfo, updatedTab) => {
                    if (tabId === tab.id && changeInfo.url) {
                        const url = changeInfo.url;
                        console.log('Auth tab URL changed:', url);
                        
                        // Check if this is our redirect URL or contains our redirect URI
                        if (url.includes(chrome.runtime.id + '.chromiumapp.com') || 
                            url.includes('code=') || 
                            url.includes('error=')) {
                            
                            console.log('Detected redirect or callback URL');
                            
                            // Remove listeners and clear timeout
                            clearTimeout(timeout);
                            chrome.tabs.onUpdated.removeListener(updateListener);
                            chrome.tabs.onRemoved.removeListener(removeListener);
                            
                            // Close the auth tab
                            chrome.tabs.remove(tabId).catch(console.error);
                            
                            try {
                                this.handleAuthCallback(url)
                                    .then(() => resolve({ success: true }))
                                    .catch(error => reject(error));
                            } catch (error) {
                                reject(error);
                            }
                        }
                    }
                };
                
                // Listen for tab removal (user closed auth tab)
                const removeListener = (removedTabId) => {
                    if (removedTabId === tab.id) {
                        console.log('Auth tab was closed by user');
                        clearTimeout(timeout);
                        chrome.tabs.onUpdated.removeListener(updateListener);
                        chrome.tabs.onRemoved.removeListener(removeListener);
                        reject(new Error('Authentication was cancelled - tab closed by user'));
                    }
                };
                
                chrome.tabs.onUpdated.addListener(updateListener);
                chrome.tabs.onRemoved.addListener(removeListener);
            });
            
        } catch (error) {
            console.error('Tab-based authentication error:', error);
            throw error;
        }
    }

    async buildAuthUrl(state, codeChallenge) {
        if (!this.CLIENT_ID) await this.loadClientId();
        const params = new URLSearchParams({
            client_id: this.CLIENT_ID,
            response_type: 'code',
            state: state,
            redirect_uri: this.REDIRECT_URI,
            duration: 'permanent',
            scope: 'identity read history save',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256'
        });
        
        return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
    }

    async handleAuthCallback(responseUrl) {
        try {
            console.log('Processing auth callback:', responseUrl);
            
            const url = new URL(responseUrl);
            const code = url.searchParams.get('code');
            const state = url.searchParams.get('state');
            const error = url.searchParams.get('error');

            console.log('Auth callback params:', { 
                hasCode: !!code, 
                hasState: !!state, 
                error: error,
                codePreview: code ? code.substring(0, 10) + '...' : 'none'
            });

            if (error) {
                throw new Error(`Reddit OAuth error: ${error}`);
            }

            if (!code) {
                console.error('No authorization code in callback URL:', responseUrl);
                throw new Error('No authorization code received from Reddit');
            }

            // Verify state parameter
            const result = await this.getStorageData(['auth_state']);
            if (state !== result.auth_state) {
                console.error('State mismatch:', { received: state, expected: result.auth_state });
                throw new Error('Invalid state parameter - possible CSRF attack');
            }

            console.log('State verification passed');

            // Exchange code for token
            const tokenData = await this.exchangeCodeForToken(code);
            
            console.log('Authentication completed successfully');
            return tokenData;
            
        } catch (error) {
            console.error('Auth callback processing error:', error);
            throw error;
        }
    }

    async exchangeCodeForToken(code) {
        if (!this.CLIENT_ID) await this.loadClientId();
        try {
            console.log('Exchanging authorization code for access token...');

            const { code_verifier } = await this.getStorageData(['code_verifier']);
            if (!code_verifier) {
                throw new Error('Code verifier not found. Authentication flow might be broken.');
            }

            await this.waitForRateLimit();

            console.log('Using client ID for token exchange:', this.CLIENT_ID);

            // Send the code to your local server for token exchange
            const response = await fetch('http://localhost:3000/exchange-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': this.USER_AGENT // Still send User-Agent for logging/identification
                },
                body: JSON.stringify({
                    code: code,
                    code_verifier: code_verifier
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
            console.log('Granted scopes:', tokenData.scope || 'No scope field in response');
            
            // Store tokens securely
            await this.setStorageData({
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                token_expires: Date.now() + (tokenData.expires_in * 1000),
                authenticated: true,
                token_type: tokenData.token_type || 'bearer'
            });

            // Test the token immediately after receiving it
            const tokenValid = await this.testToken(tokenData.access_token);
            if (!tokenValid) {
                throw new Error('Received token is not valid - authentication may have failed');
            }

            // Sync saved posts immediately after authentication
            setTimeout(() => {
                this.syncSavedPosts().catch(error => {
                    console.error('Initial sync failed:', error);
                });
            }, 1000);

            // Create sync alarm now that user is authenticated
            if (chrome.alarms) {
                await chrome.alarms.create('syncSavedPosts', {
                    delayInMinutes: 1,
                    periodInMinutes: 60
                });
                console.log('Sync alarm created after authentication');
            }

            console.log('Tokens stored successfully');
            return tokenData;

        } catch (error) {
            console.error('Token exchange error:', error);
            throw error;
        }
    }

    // New method to test token validity
    async testToken(accessToken) {
        try {
            console.log('Testing token validity...');
            await this.waitForRateLimit();

            const response = await fetch('https://oauth.reddit.com/api/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'User-Agent': this.USER_AGENT
                }
            });

            console.log('Token test response status:', response.status);
            
            if (response.ok) {
                const userData = await response.json();
                console.log('Token test successful, user:', userData.name);
                return true;
            } else {
                console.error('Token test failed:', response.status);
                return false;
            }
        } catch (error) {
            console.error('Token test error:', error);
            return false;
        }
    }

    async syncSavedPosts() {
        try {
            console.log('Syncing saved Reddit posts...');
            const result = await this.getStorageData(['access_token']);
            const accessToken = result.access_token;
            
            if (!accessToken) {
                throw new Error('No access token found. User may not be authenticated.');
            }

            // Step 1: Get username first
            await this.waitForRateLimit();
            const userResponse = await fetch('https://oauth.reddit.com/api/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'User-Agent': this.USER_AGENT
                }
            });

            if (!userResponse.ok) {
                const errorText = await userResponse.text();
                throw new Error(`Failed to fetch user info: ${userResponse.status} - ${errorText}`);
            }

            const userData = await userResponse.json();
            const username = userData.name;
            console.log('Authenticated Reddit username:', username);

            // Step 2: Try the proper saved posts endpoint
            let posts = [];
            let after = null;
            let fetchCount = 0;
            const maxPosts = 1000; // Limit to prevent infinite loops

            // FIXED: Use the correct endpoint with proper pagination
            while (fetchCount < maxPosts) {
                await this.waitForRateLimit();

                // Use the correct /user/{username}/saved endpoint
                const url = new URL(`https://oauth.reddit.com/user/${username}/saved`);
                url.searchParams.set('limit', '100');
                url.searchParams.set('raw_json', '1'); // Helps with some parsing issues
                if (after) {
                    url.searchParams.set('after', after);
                }

                console.log('Fetching saved posts from:', url.toString());

                const response = await fetch(url.toString(), {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'User-Agent': this.USER_AGENT
                    }
                });

                console.log('Saved posts response status:', response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Failed to fetch saved posts:', response.status, errorText);
                    
                    // If we get 403, it might be a scope issue
                    if (response.status === 403) {
                        throw new Error('Access forbidden. Your Reddit app may not have the correct scopes. Please check that your app has "read" and "history" scopes enabled.');
                    }
                    
                    // If we get 400, it might be a malformed request
                    if (response.status === 400) {
                        throw new Error('Bad request to Reddit API. This might be a temporary Reddit issue or the app needs re-authentication.');
                    }
                    
                    throw new Error(`Failed to fetch saved posts: ${response.status} - ${errorText}`);
                }

                let data;
                try {
                    data = await response.json();
                } catch (parseError) {
                    console.error('Failed to parse Reddit API response:', parseError);
                    throw new Error('Invalid response from Reddit API');
                }

                if (!data || !data.data || !Array.isArray(data.data.children)) {
                    console.error('Unexpected response format:', data);
                    throw new Error('Unexpected response format from Reddit API');
                }

                const newPosts = data.data.children;
                console.log(`Fetched ${newPosts.length} posts in this batch`);

                if (newPosts.length === 0) {
                    console.log('No more posts to fetch');
                    break;
                }

                posts = posts.concat(newPosts);
                fetchCount += newPosts.length;
                after = data.data.after;

                console.log(`Total posts so far: ${posts.length}, after: ${after}`);

                if (!after) {
                    console.log('Reached end of saved posts');
                    break;
                }

                // Add a small delay between requests to be nice to Reddit's servers
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // Store posts in chrome.storage.local
            await this.setStorageData({
                saved_posts: posts,
                last_sync: Date.now(),
                sync_error: null // Clear any previous error
            });

            console.log(`Successfully synced ${posts.length} saved posts.`);
            return { posts: posts, count: posts.length };

        } catch (error) {
            console.error('Error syncing saved posts:', error);
            
            // Store the error so UI can display it
            await this.setStorageData({ 
                sync_error: error.message || String(error),
                last_sync_error: Date.now()
            });
            
            throw error;
        }
    }

    async getSavedPosts() {
        try {
            const data = await this.getStorageData(['saved_posts', 'last_sync', 'sync_error']);
            const posts = data.saved_posts || [];
            
            // Extract the actual post data from Reddit's response format
            const extractedPosts = posts.map(item => {
                const postData = item.data || item; // Use item.data if available, otherwise use item itself
                return {
                    ...postData,
                    score: postData.score ?? 0, // Default to 0 if score is null/undefined
                    num_comments: postData.num_comments ?? 0, // Default to 0 if num_comments is null/undefined
                    created_utc: postData.created_utc ?? 0 // Default to 0 if created_utc is null/undefined
                };
            });

            return {
                posts: extractedPosts,
                last_sync: data.last_sync,
                count: extractedPosts.length,
                sync_error: data.sync_error
            };
        } catch (error) {
            console.error('Error getting saved posts:', error);
            return { posts: [], last_sync: null, count: 0, sync_error: error.message };
        }
    }

    async getAuthStatus() {
        try {
            console.log('Checking auth status...');
            const data = await this.getStorageData(['access_token', 'token_expires', 'authenticated']);
            console.log('Auth data:', { 
                hasToken: !!data.access_token, 
                authenticated: data.authenticated,
                expired: data.token_expires ? Date.now() > data.token_expires : 'no expiry'
            });
            
            if (!data.access_token || !data.authenticated) {
                console.log('No token or not authenticated');
                return { authenticated: false };
            }
            
            // Check if token is expired
            if (data.token_expires && Date.now() > data.token_expires) {
                console.log('Token expired, attempting refresh...');
                try {
                    await this.refreshAccessToken();
                    return { authenticated: true };
                } catch (refreshError) {
                    console.log('Token refresh failed:', refreshError.message);
                    return { authenticated: false };
                }
            }

            // Test the token to make sure it's actually valid
            const tokenValid = await this.testToken(data.access_token);
            if (!tokenValid) {
                console.log('Token test failed, attempting refresh...');
                try {
                    await this.refreshAccessToken();
                    return { authenticated: true };
                } catch (refreshError) {
                    console.log('Token refresh failed:', refreshError.message);
                    return { authenticated: false };
                }
            }
            
            console.log('User is authenticated');
            return { authenticated: true };
        } catch (error) {
            console.error('Auth status check error:', error);
            return { authenticated: false };
        }
    }

    async refreshAccessToken() {
        if (!this.CLIENT_ID) await this.loadClientId();
        try {
            const authData = await this.getStorageData(['refresh_token']);
            if (!authData.refresh_token) {
                throw new Error('No refresh token available');
            }

            console.log('Refreshing access token...');

            await this.waitForRateLimit();

            const response = await fetch('https://www.reddit.com/api/v1/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': this.USER_AGENT
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: authData.refresh_token,
                    client_id: this.CLIENT_ID
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
                access_token: tokenData.access_token,
                token_expires: Date.now() + (tokenData.expires_in * 1000),
                authenticated: true
            };

            // Keep the refresh token if a new one wasn't provided
            if (tokenData.refresh_token) {
                updatedAuth.refresh_token = tokenData.refresh_token;
            } else {
                updatedAuth.refresh_token = authData.refresh_token;
            }

            await this.setStorageData(updatedAuth);
            console.log('Token refreshed successfully');
            
            return updatedAuth;

        } catch (error) {
            console.error('Token refresh error:', error);
            // Clear invalid auth data
            await this.clearAuthentication();
            throw error;
        }
    }

    async getSettings() {
        try {
            const result = await this.getStorageData(['settings']);
            return result.settings || {
                autoSync: true,
                syncInterval: 60,
                theme: 'light',
                notifications: true
            };
        } catch (error) {
            console.error('Error getting settings:', error);
            return {
                autoSync: true,
                syncInterval: 60,
                theme: 'light',
                notifications: true
            };
        }
    }

    async updateSettings(newSettings) {
        try {
            const currentSettings = await this.getSettings();
            const updatedSettings = { ...currentSettings, ...newSettings };
            await this.setStorageData({ settings: updatedSettings });
        } catch (error) {
            console.error('Error updating settings:', error);
            throw error;
        }
    }

    async clearAuthentication() {
        try {
            // Clear sync alarm when clearing authentication
            if (chrome.alarms) {
                await chrome.alarms.clear('syncSavedPosts');
                console.log('Sync alarm cleared');
            }
            
            await this.removeStorageData([
                'access_token', 
                'refresh_token', 
                'token_expires', 
                'authenticated', 
                'auth_state',
                'sync_error',
                'last_sync_error',
                'code_verifier'
            ]);
            console.log('Authentication cleared');
        } catch (error) {
            console.error('Error clearing authentication:', error);
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

    async syncSavedPostsBackground() {
        try {
            // Check authentication before attempting background sync
            const authStatus = await this.getAuthStatus();
            if (!authStatus.authenticated) {
                console.log('Background sync skipped - user not authenticated');
                return;
            }
            
            await this.syncSavedPosts();
            console.log('Background sync completed successfully');
        } catch (error) {
            console.error('Background sync failed:', error);
            // Don't throw error in background context
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

    async savePostData(postData) {
        try {
            if (!postData || !postData.id) {
                throw new Error('Invalid post data provided');
            }

            const result = await this.getStorageData(['saved_posts']);
            const savedPosts = result.saved_posts || [];

            // Check if post is already saved
            const postIndex = savedPosts.findIndex(p => p.data.id === postData.id);

            if (postIndex === -1) {
                // Add the new post to the beginning of the array
                savedPosts.unshift({ data: postData });
                await this.setStorageData({ saved_posts: savedPosts });
                console.log(`Post ${postData.id} saved locally.`);
            } else {
                console.log(`Post ${postData.id} is already saved locally.`);
            }
        } catch (error) {
            console.error('Error in savePostData:', error);
            throw error;
        }
    }

    async unsavePost(postFullname) {
        try {
            console.log(`Attempting to unsave post with fullname: ${postFullname}`);
            const accessToken = (await this.getStorageData(['access_token'])).access_token;
            if (!accessToken) {
                throw new Error('Not authenticated. Cannot unsave post.');
            }

            await this.waitForRateLimit();

            const response = await fetch('https://oauth.reddit.com/api/unsave', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'User-Agent': this.USER_AGENT,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    id: postFullname
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to unsave post on Reddit:', response.status, errorText);
                throw new Error(`Reddit API error: ${response.status} - ${errorText}`);
            }

            console.log(`Post ${postFullname} unsaved successfully on Reddit.`);
        } catch (error) {
            console.error('Error in unsavePost:', error);
            throw error;
        }
    }

    async unsaveMultiplePosts(postFullnames) {
        try {
            console.log(`Attempting to unsave ${postFullnames.length} posts`);
            for (const postFullname of postFullnames) {
                await this.unsavePost(postFullname);
                // Add a small delay between each request to be nice to Reddit's servers
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            // After un-saving, trigger a sync to update the local cache
            await this.syncSavedPosts();
            console.log('Finished un-saving multiple posts and re-synced.');
        } catch (error) {
            console.error('Error in unsaveMultiplePosts:', error);
            throw error;
        }
    }

    // Helper methods for storage operations
    async getStorageData(keys) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(keys, (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async setStorageData(data) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set(data, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    async removeStorageData(keys) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.remove(keys, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    }

    async makeRedditAPICall(endpoint) {
        const accessToken = (await this.getStorageData(['access_token'])).access_token;
        if (!accessToken) {
            throw new Error('No access token available');
        }

        await this.waitForRateLimit();

        const response = await fetch(`https://oauth.reddit.com${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': this.USER_AGENT
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API call failed: ${response.status} - ${errorText}`);
        }

        return response.json();
    }
}

// Initialize the background service
console.log('Creating BackgroundService instance...');
const backgroundService = new BackgroundService();
console.log('Background script loaded successfully');