// Content script for Readdit Later - enhances Reddit experience
class RedditEnhancer {
    constructor() {
        this.isReddit = window.location.hostname === 'www.reddit.com';
        this.savedPosts = new Set();
        
        if (this.isReddit) {
            this.init();
        }
    }

    async init() {
        console.log('Readdit Later content script loaded');
        
        // Load existing saved posts
        await this.loadSavedPosts();
        
        // Set up observers for dynamic content
        this.setupObservers();
        
        // Add custom styles
        this.addCustomStyles();
        
        // Initial enhancement of existing posts
        this.enhanceExistingPosts();
    }

    async loadSavedPosts() {
        try {
            const result = await chrome.storage.local.get(['saved_posts']);
            if (result.saved_posts) {
                this.savedPosts = new Set(
                    result.saved_posts.map(post => post.data.id)
                );
            }
        } catch (error) {
            console.error('Error loading saved posts:', error);
        }
    }

    setupObservers() {
        // Observer for dynamically loaded content (infinite scroll)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.enhanceNewContent(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Listen for save/unsave events
        document.addEventListener('click', (e) => {
            this.handleSaveClick(e);
        });
    }

    enhanceExistingPosts() {
        // Find all existing post elements and enhance them
        const posts = this.findPostElements();
        posts.forEach(post => this.enhancePost(post));
    }

    enhanceNewContent(node) {
        // Enhance newly added posts
        const posts = this.findPostElements(node);
        posts.forEach(post => this.enhancePost(post));
    }

    findPostElements(container = document) {
        // Multiple selectors to handle different Reddit layouts
        const selectors = [
            '[data-testid="post-container"]', // New Reddit
            '.Post', // New Reddit alternative
            '.thing[data-type="link"]', // Old Reddit
            'article[data-testid="post-container"]' // Another new Reddit variant
        ];

        let posts = [];
        selectors.forEach(selector => {
            const found = container.querySelectorAll(selector);
            posts.push(...Array.from(found));
        });

        return posts;
    }

    enhancePost(postElement) {
        try {
            const postId = this.extractPostId(postElement);
            if (!postId || postElement.hasAttribute('data-readdit-enhanced')) {
                return;
            }

            // Mark as enhanced to avoid duplicate processing
            postElement.setAttribute('data-readdit-enhanced', 'true');

            // Add Readdit Later indicator if post is saved
            if (this.savedPosts.has(postId)) {
                this.addSavedIndicator(postElement);
            }

            // Add quick action button
            this.addQuickActionButton(postElement, postId);

        } catch (error) {
            console.error('Error enhancing post:', error);
        }
    }

    extractPostId(postElement) {
        // Try various methods to extract post ID
        let postId = postElement.getAttribute('data-fullname');
        if (postId && postId.startsWith('t3_')) {
            return postId.substring(3);
        }

        // Try data-testid or other attributes
        const testId = postElement.getAttribute('data-testid');
        if (testId && testId.includes('post-container')) {
            // Look for ID in URL or other attributes
            const linkElement = postElement.querySelector('a[href*="/r/"]');
            if (linkElement) {
                const match = linkElement.href.match(/\/comments\/([a-zA-Z0-9]+)/);
                if (match) {
                    return match[1];
                }
            }
        }

        // Try to extract from permalink
        const permalinkElement = postElement.querySelector('a[data-click-id="comments"]');
        if (permalinkElement) {
            const match = permalinkElement.href.match(/\/comments\/([a-zA-Z0-9]+)/);
            if (match) {
                return match[1];
            }
        }

        return null;
    }

    addSavedIndicator(postElement) {
        // Add a visual indicator that this post is saved in Readdit Later
        const indicator = document.createElement('div');
        indicator.className = 'readdit-later-indicator';
        indicator.innerHTML = 'Saved in Readdit Later';
        indicator.title = 'This post is saved in your Readdit Later collection';

        // Try to find a good place to insert the indicator
        const titleElement = postElement.querySelector('h3, [data-testid="post-content"] h3, .title');
        if (titleElement) {
            titleElement.appendChild(indicator);
        }
    }

    addQuickActionButton(postElement, postId) {
        // Add a quick action button for Readdit Later
        const actionBar = this.findActionBar(postElement);
        if (!actionBar) return;

        const button = document.createElement('button');
        button.className = 'readdit-later-quick-action';
        button.innerHTML = this.savedPosts.has(postId) 
            ? 'In Readdit Later' 
            : 'Add to Readdit Later';
        
        button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleReadditLater(postId, postElement);
        };

        actionBar.appendChild(button);
    }

    findActionBar(postElement) {
        // Find the action bar where we can add our button
        const selectors = [
            '[data-testid="post-engagement-bar"]',
            '.buttonContainer',
            '.flat-list.buttons',
            '.Post__footer'
        ];

        for (const selector of selectors) {
            const actionBar = postElement.querySelector(selector);
            if (actionBar) {
                return actionBar;
            }
        }

        return null;
    }

    async toggleReadditLater(postId, postElement) {
        try {
            if (this.savedPosts.has(postId)) {
                // Remove from Readdit Later
                await this.removeFromReadditLater(postId, postElement);
            } else {
                // Add to Readdit Later (trigger save action)
                await this.addToReadditLater(postId, postElement);
            }
        } catch (error) {
            console.error('Error toggling Readdit Later status:', error);
            this.showMessage('Error updating Readdit Later status', 'error');
        }
    }

    async addToReadditLater(postId, postElement) {
        // Find and click the native save button
        const saveButton = this.findSaveButton(postElement);
        if (saveButton && !this.isPostSaved(saveButton)) {
            saveButton.click();
            
            // Wait a bit and then sync
            setTimeout(() => {
                this.syncWithBackground();
            }, 1000);
            
            this.showMessage('Added to Readdit Later!', 'success');
        } else {
            this.showMessage('Post is already saved', 'info');
        }
    }

    async removeFromReadditLater(postId, postElement) {
        // Find and click the native unsave button
        const saveButton = this.findSaveButton(postElement);
        if (saveButton && this.isPostSaved(saveButton)) {
            saveButton.click();
            
            // Update local state
            this.savedPosts.delete(postId);
            
            // Update UI
            this.updatePostUI(postElement, postId, false);
            
            setTimeout(() => {
                this.syncWithBackground();
            }, 1000);
            
            this.showMessage('Removed from Readdit Later', 'info');
        }
    }

    findSaveButton(postElement) {
        const selectors = [
            'button[aria-label="Save"]',
            'button[aria-label="Unsave"]',
            'button:contains("save")',
            '.save-button',
            '[data-testid="save-button"]'
        ];

        for (const selector of selectors) {
            const button = postElement.querySelector(selector);
            if (button) return button;
        }

        return null;
    }

    isPostSaved(saveButton) {
        return saveButton.textContent.toLowerCase().includes('unsave') ||
               saveButton.getAttribute('aria-label') === 'Unsave' ||
               saveButton.classList.contains('saved');
    }

    updatePostUI(postElement, postId, isSaved) {
        // Update quick action button
        const quickButton = postElement.querySelector('.readdit-later-quick-action');
        if (quickButton) {
            quickButton.innerHTML = isSaved 
                ? 'In Readdit Later' 
                : 'Add to Readdit Later';
        }

        // Update/remove saved indicator
        const indicator = postElement.querySelector('.readdit-later-indicator');
        if (isSaved && !indicator) {
            this.addSavedIndicator(postElement);
        } else if (!isSaved && indicator) {
            indicator.remove();
        }
    }

    handleSaveClick(event) {
        // Listen for native save button clicks to update our state
        const target = event.target;
        if (this.isSaveButton(target)) {
            setTimeout(() => {
                this.syncWithBackground();
            }, 500);
        }
    }

    isSaveButton(element) {
        const text = element.textContent.toLowerCase();
        const ariaLabel = element.getAttribute('aria-label')?.toLowerCase();
        
        return text.includes('save') || 
               text.includes('unsave') ||
               ariaLabel?.includes('save') ||
               element.classList.contains('save-button');
    }

    async syncWithBackground() {
        try {
            const response = await chrome.runtime.sendMessage({
                type: 'SYNC_SAVED_POSTS'
            });
            
            if (response.success) {
                // Reload saved posts to update UI
                await this.loadSavedPosts();
                
                // Update all enhanced posts
                const enhancedPosts = document.querySelectorAll('[data-readdit-enhanced]');
                enhancedPosts.forEach(post => {
                    const postId = this.extractPostId(post);
                    if (postId) {
                        this.updatePostUI(post, postId, this.savedPosts.has(postId));
                    }
                });
            }
        } catch (error) {
            console.error('Error syncing with background:', error);
        }
    }

    showMessage(text, type = 'info') {
        // Create and show a temporary message
        const message = document.createElement('div');
        message.className = `readdit-later-message readdit-later-message-${type}`;
        message.textContent = text;
        
        document.body.appendChild(message);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    addCustomStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .readdit-later-indicator {
                display: inline-block;
                background: linear-gradient(135deg, #ff4500, #ff6b35);
                color: white;
                font-size: 11px;
                font-weight: 600;
                padding: 2px 8px;
                border-radius: 12px;
                margin-left: 8px;
                font-family: 'Rethink Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                box-shadow: 0 2px 4px rgba(255, 69, 0, 0.2);
            }

            .readdit-later-quick-action {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                color: #495057;
                font-size: 12px;
                font-weight: 500;
                padding: 4px 8px;
                border-radius: 6px;
                cursor: pointer;
                margin-left: 8px;
                font-family: 'Rethink Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                transition: all 0.2s ease;
            }

            .readdit-later-quick-action:hover {
                background: #e9ecef;
                border-color: #ff4500;
                color: #ff4500;
            }

            .readdit-later-message {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                padding: 12px 16px;
                border-radius: 8px;
                font-family: 'Rethink Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideIn 0.3s ease-out;
            }

            .readdit-later-message-success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }

            .readdit-later-message-error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }

            .readdit-later-message-info {
                background: #d1ecf1;
                color: #0c5460;
                border: 1px solid #bee5eb;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            /* Dark theme support */
            [data-theme="dark"] .readdit-later-quick-action {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }

            [data-theme="dark"] .readdit-later-quick-action:hover {
                background: #4a5568;
                border-color: #ff4500;
                color: #ff4500;
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
                .readdit-later-message {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    right: 10px;
                    text-align: center;
                }

                .readdit-later-indicator {
                    font-size: 10px;
                    padding: 1px 6px;
                    margin-left: 4px;
                }

                .readdit-later-quick-action {
                    font-size: 11px;
                    padding: 3px 6px;
                    margin-left: 4px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Enhanced post data extraction for better compatibility
class PostDataExtractor {
    static extractPostData(postElement) {
        try {
            const data = {};
            
            // Extract title
            const titleElement = postElement.querySelector('[data-testid="post-content"] h3, h3, .title a');
            data.title = titleElement ? titleElement.textContent.trim() : '';
            
            // Extract subreddit
            const subredditElement = postElement.querySelector('[data-testid="subreddit-name"], .subreddit');
            if (subredditElement) {
                data.subreddit = subredditElement.textContent.replace('r/', '').trim();
            }
            
            // Extract author
            const authorElement = postElement.querySelector('[data-testid="post_author_link"], .author');
            if (authorElement) {
                data.author = authorElement.textContent.replace('u/', '').trim();
            }
            
            // Extract score
            const scoreElement = postElement.querySelector('[data-testid="vote-arrows"] span, .score');
            if (scoreElement) {
                const scoreText = scoreElement.textContent.trim();
                data.score = this.parseScore(scoreText);
            }
            
            // Extract comments count
            const commentsElement = postElement.querySelector('[data-testid="comments-page-link"], .comments');
            if (commentsElement) {
                const commentsText = commentsElement.textContent;
                const match = commentsText.match(/(\d+)/);
                data.num_comments = match ? parseInt(match[1]) : 0;
            }
            
            // Extract permalink
            const permalinkElement = postElement.querySelector('a[href*="/comments/"]');
            if (permalinkElement) {
                data.permalink = permalinkElement.pathname;
            }
            
            // Extract external URL
            const linkElement = postElement.querySelector('[data-testid="outbound-link"], .title a');
            if (linkElement && !linkElement.href.includes('reddit.com')) {
                data.url = linkElement.href;
            }
            
            return data;
        } catch (error) {
            console.error('Error extracting post data:', error);
            return {};
        }
    }
    
    static parseScore(scoreText) {
        if (!scoreText) return 0;
        
        scoreText = scoreText.toLowerCase().trim();
        
        if (scoreText.includes('k')) {
            return Math.round(parseFloat(scoreText) * 1000);
        } else if (scoreText.includes('m')) {
            return Math.round(parseFloat(scoreText) * 1000000);
        } else {
            const match = scoreText.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
        }
    }
}

// Keyboard shortcuts handler
class KeyboardShortcuts {
    constructor(enhancer) {
        this.enhancer = enhancer;
        this.setupShortcuts();
    }
    
    setupShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when not typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (e.key.toLowerCase()) {
                case 'r':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.openReadditLater();
                    }
                    break;
                    
                case 's':
                    if (e.altKey) {
                        e.preventDefault();
                        this.quickSaveCurrentPost();
                    }
                    break;
            }
        });
    }
    
    openReadditLater() {
        chrome.runtime.sendMessage({ type: 'OPEN_DETAILED_VIEW' });
    }
    
    quickSaveCurrentPost() {
        // Find the currently focused or hovered post
        const hoveredPost = document.querySelector('.Post:hover, [data-testid="post-container"]:hover');
        if (hoveredPost) {
            const postId = this.enhancer.extractPostId(hoveredPost);
            if (postId) {
                this.enhancer.toggleReadditLater(postId, hoveredPost);
            }
        }
    }
}

// URL change detection for SPA behavior
class URLChangeDetector {
    constructor(callback) {
        this.callback = callback;
        this.currentURL = window.location.href;
        this.setupDetection();
    }
    
    setupDetection() {
        // Listen for popstate (back/forward)
        window.addEventListener('popstate', () => {
            this.checkURLChange();
        });
        
        // Override pushState and replaceState
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = (...args) => {
            originalPushState.apply(history, args);
            setTimeout(() => this.checkURLChange(), 100);
        };
        
        history.replaceState = (...args) => {
            originalReplaceState.apply(history, args);
            setTimeout(() => this.checkURLChange(), 100);
        };
        
        // Periodic check as fallback
        setInterval(() => this.checkURLChange(), 2000);
    }
    
    checkURLChange() {
        if (window.location.href !== this.currentURL) {
            this.currentURL = window.location.href;
            this.callback();
        }
    }
}

// Initialize everything
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeReadditLater);
} else {
    initializeReadditLater();
}

function initializeReadditLater() {
    try {
        const enhancer = new RedditEnhancer();
        
        // Add keyboard shortcuts
        new KeyboardShortcuts(enhancer);
        
        // Handle URL changes for SPA navigation
        new URLChangeDetector(() => {
            setTimeout(() => {
                enhancer.enhanceExistingPosts();
            }, 500);
        });
        
        console.log('Readdit Later fully initialized');
    } catch (error) {
        console.error('Error initializing Readdit Later:', error);
    }
}