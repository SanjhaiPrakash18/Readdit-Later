// Detailed View functionality for Readdit Later
class DetailedViewController {
    constructor() {
        this.allPosts = [];
        this.filteredPosts = [];
        this.currentPage = 1;
        this.postsPerPage = 20;
        this.currentView = 'list';
        this.filters = {
            search: '',
            subreddit: '',
            type: '',
            time: ''
        };
        this.sortBy = 'date_desc';

        this.initializeElements();
        this.bindEvents();
        this.loadData();
        this.loadTheme();
    }

    initializeElements() {
        this.elements = {
            // Stats
            totalPostsStat: document.getElementById('totalPostsStat'),
            weeklyPostsStat: document.getElementById('weeklyPostsStat'),
            subredditsStat: document.getElementById('subredditsStat'),
            lastSyncStat: document.getElementById('lastSyncStat'),

            // Filters
            searchInput: document.getElementById('searchInput'),
            subredditFilter: document.getElementById('subredditFilter'),
            typeFilter: document.getElementById('typeFilter'),
            timeFilter: document.getElementById('timeFilter'),
            clearFilters: document.getElementById('clearFilters'),

            // View controls
            contentTitle: document.getElementById('contentTitle'),
            listViewBtn: document.getElementById('listViewBtn'),
            gridViewBtn: document.getElementById('gridViewBtn'),
            sortSelect: document.getElementById('sortSelect'),

            // Content
            loadingContainer: document.getElementById('loadingContainer'),
            postsContainer: document.getElementById('postsContainer'),
            emptyState: document.getElementById('emptyState'),

            // Pagination
            pagination: document.getElementById('pagination'),
            prevPageBtn: document.getElementById('prevPageBtn'),
            nextPageBtn: document.getElementById('nextPageBtn'),
            pageInfo: document.getElementById('pageInfo'),

            // Header actions
            themeToggle: document.getElementById('themeToggle'),
            exportBtn: document.getElementById('exportBtn')
        };
    }

    bindEvents() {
        // Filter events
        this.elements.searchInput.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });

        this.elements.subredditFilter.addEventListener('change', (e) => {
            this.filters.subreddit = e.target.value;
            this.applyFilters();
        });

        this.elements.typeFilter.addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.applyFilters();
        });

        this.elements.timeFilter.addEventListener('change', (e) => {
            this.filters.time = e.target.value;
            this.applyFilters();
        });

        this.elements.clearFilters.addEventListener('click', () => {
            this.clearAllFilters();
        });

        // View controls
        this.elements.listViewBtn.addEventListener('click', () => {
            this.setView('list');
        });

        this.elements.gridViewBtn.addEventListener('click', () => {
            this.setView('grid');
        });

        this.elements.sortSelect.addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applyFilters();
        });

        // Pagination
        this.elements.prevPageBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPosts();
                this.updatePagination();
            }
        });

        this.elements.nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderPosts();
                this.updatePagination();
            }
        });

        // Header actions
        this.elements.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        this.elements.exportBtn.addEventListener('click', () => {
            this.exportPosts();
        });

        // Search debouncing
        let searchTimeout;
        this.elements.searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.applyFilters();
            }, 300);
        });
    }

    async loadData() {
        try {
            this.showLoading(true);

            // Get stored posts
            const storedData = await this.getStoredData();
            
            if (!storedData.saved_posts || storedData.saved_posts.length === 0) {
                this.showEmptyState();
                return;
            }

            this.allPosts = storedData.saved_posts.map(child => child.data);
            this.filteredPosts = [...this.allPosts];

            // Update stats
            this.updateStats(storedData);

            // Populate subreddit filter
            this.populateSubredditFilter();

            // Apply default sorting and render
            this.applyFilters();
            this.showLoading(false);

        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load saved posts. Please refresh the page.');
        }
    }

    async getStoredData() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['saved_posts', 'last_sync'], (result) => {
                resolve(result);
            });
        });
    }

    updateContentTitle() {
        const totalFiltered = this.filteredPosts.length;
        const totalAll = this.allPosts.length;
        
        if (totalFiltered === totalAll) {
            this.elements.contentTitle.textContent = `Your Saved Posts (${totalAll})`;
        } else {
            this.elements.contentTitle.textContent = `Filtered Posts (${totalFiltered} of ${totalAll})`;
        }
    }

    clearAllFilters() {
        this.filters = {
            search: '',
            subreddit: '',
            type: '',
            time: ''
        };

        this.elements.searchInput.value = '';
        this.elements.subredditFilter.value = '';
        this.elements.typeFilter.value = '';
        this.elements.timeFilter.value = '';

        this.applyFilters();
    }

    showLoading(show) {
        this.elements.loadingContainer.style.display = show ? 'block' : 'none';
        this.elements.postsContainer.style.display = show ? 'none' : 'block';
    }

    showEmptyState() {
        this.elements.loadingContainer.style.display = 'none';
        this.elements.postsContainer.style.display = 'none';
        this.elements.emptyState.style.display = 'block';
        this.elements.pagination.style.display = 'none';
    }

    showError(message) {
        this.elements.postsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #dc3545;">
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
        this.showLoading(false);
    }

    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.toggle('dark');
        
        this.elements.themeToggle.textContent = isDark ? 'Light' : 'Dark';
        
        // Store theme preference
        chrome.storage.local.set({ theme: isDark ? 'dark' : 'light' });
    }

    async loadTheme() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['theme'], (result) => {
                if (result.theme === 'dark') {
                    document.body.classList.add('dark');
                    this.elements.themeToggle.textContent = 'Light';
                }
                resolve();
            });
        });
    }

    exportPosts() {
        const exportData = {
            exported_at: new Date().toISOString(),
            total_posts: this.filteredPosts.length,
            posts: this.filteredPosts.map(post => ({
                title: post.title,
                url: `https://reddit.com${post.permalink}`,
                subreddit: post.subreddit,
                author: post.author,
                created: new Date(post.created_utc * 1000).toISOString(),
                score: post.score,
                num_comments: post.num_comments,
                post_type: this.getPostType(post),
                external_url: post.url
            }))
        };

        // Create and download JSON file
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
            type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `readdit-later-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Also offer CSV export
        setTimeout(() => {
            if (confirm('Would you also like to export as CSV for spreadsheet use?')) {
                this.exportPostsCSV();
            }
        }, 500);
    }

    exportPostsCSV() {
        const csvHeaders = [
            'Title',
            'Reddit URL',
            'External URL',
            'Subreddit',
            'Author',
            'Created Date',
            'Score',
            'Comments',
            'Post Type'
        ];

        const csvRows = this.filteredPosts.map(post => [
            `"${post.title.replace(/"/g, '""')}"`,
            `https://reddit.com${post.permalink}`,
            post.url || '',
            post.subreddit,
            post.author,
            new Date(post.created_utc * 1000).toISOString(),
            post.score || 0,
            post.num_comments || 0,
            this.getPostType(post)
        ]);

        const csvContent = [csvHeaders.join(','), ...csvRows.map(row => row.join(','))].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `readdit-later-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);

        if (diffYears > 0) {
            return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
        } else if (diffMonths > 0) {
            return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
        } else if (diffWeeks > 0) {
            return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
        } else if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateStats(data) {
        const posts = this.allPosts;
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Calculate weekly posts
        const weeklyPosts = posts.filter(post => {
            const postDate = new Date(post.created_utc * 1000);
            return postDate >= weekAgo;
        }).length;

        // Get unique subreddits
        const uniqueSubreddits = new Set(posts.map(post => post.subreddit));

        // Update UI
        this.elements.totalPostsStat.textContent = posts.length;
        this.elements.weeklyPostsStat.textContent = weeklyPosts;
        this.elements.subredditsStat.textContent = uniqueSubreddits.size;
        
        if (data.last_sync) {
            const lastSync = new Date(data.last_sync);
            this.elements.lastSyncStat.textContent = this.getTimeAgo(lastSync);
        }
    }

    populateSubredditFilter() {
        const subreddits = [...new Set(this.allPosts.map(post => post.subreddit))].sort();
        
        this.elements.subredditFilter.innerHTML = '<option value="">All Subreddits</option>';
        
        subreddits.forEach(subreddit => {
            const option = document.createElement('option');
            option.value = subreddit;
            option.textContent = `r/${subreddit}`;
            this.elements.subredditFilter.appendChild(option);
        });
    }

    applyFilters() {
        let filtered = [...this.allPosts];

        // Apply search filter
        if (this.filters.search) {
            const searchTerm = this.filters.search.toLowerCase();
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(searchTerm) ||
                post.subreddit.toLowerCase().includes(searchTerm) ||
                (post.author && post.author.toLowerCase().includes(searchTerm))
            );
        }

        // Apply subreddit filter
        if (this.filters.subreddit) {
            filtered = filtered.filter(post => post.subreddit === this.filters.subreddit);
        }

        // Apply type filter
        if (this.filters.type) {
            filtered = filtered.filter(post => this.getPostType(post) === this.filters.type);
        }

        // Apply time filter
        if (this.filters.time) {
            const now = new Date();
            let timeThreshold;
            
            switch (this.filters.time) {
                case 'day':
                    timeThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                    break;
                case 'week':
                    timeThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    timeThreshold = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    break;
                case 'year':
                    timeThreshold = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                    break;
            }
            
            if (timeThreshold) {
                filtered = filtered.filter(post => {
                    const postDate = new Date(post.created_utc * 1000);
                    return postDate >= timeThreshold;
                });
            }
        }

        // Apply sorting
        this.sortPosts(filtered);

        this.filteredPosts = filtered;
        this.currentPage = 1;
        this.renderPosts();
        this.updatePagination();
        this.updateContentTitle();
    }

    sortPosts(posts) {
        posts.sort((a, b) => {
            switch (this.sortBy) {
                case 'date_desc':
                    return b.created_utc - a.created_utc;
                case 'date_asc':
                    return a.created_utc - b.created_utc;
                case 'title_asc':
                    return a.title.localeCompare(b.title);
                case 'title_desc':
                    return b.title.localeCompare(a.title);
                case 'subreddit_asc':
                    return a.subreddit.localeCompare(b.subreddit);
                case 'score_desc':
                    return (b.score || 0) - (a.score || 0);
                default:
                    return b.created_utc - a.created_utc;
            }
        });
    }

    getPostType(post) {
        if (post.is_video || post.media) return 'video';
        if (post.url && this.isImageUrl(post.url)) return 'image';
        if (post.is_self) return 'text';
        return 'link';
    }

    isImageUrl(url) {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes('i.redd.it') || url.includes('imgur.com');
    }

    renderPosts() {
        if (this.filteredPosts.length === 0) {
            this.showEmptyState();
            return;
        }

        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

        this.elements.postsContainer.innerHTML = '';
        this.elements.emptyState.style.display = 'none';

        postsToShow.forEach(post => {
            const postElement = this.createPostElement(post);
            this.elements.postsContainer.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = `post-item ${this.currentView}-view`;

        const postType = this.getPostType(post);
        const timeAgo = this.getTimeAgo(new Date(post.created_utc * 1000));
        const thumbnail = this.getThumbnail(post);

        postDiv.innerHTML = `
            <div class="post-content">
                <div class="post-header">
                    <div>
                        <a href="https://reddit.com${post.permalink}" class="post-title" target="_blank">
                            ${this.escapeHtml(post.title)}
                        </a>
                        <div class="post-meta">
                            <a href="https://reddit.com/r/${post.subreddit}" class="subreddit-link" target="_blank">
                                r/${post.subreddit}
                            </a>
                            <span>by u/${post.author}</span>
                            <span>${timeAgo}</span>
                            <span class="post-type">${postType}</span>
                        </div>
                    </div>
                    <div class="post-actions">
                        <button class="action-btn" onclick="window.openPost('${post.permalink}')">
                            Open
                        </button>
                        <button class="action-btn danger" onclick="window.removePost('${post.id}')">
                            Remove
                        </button>
                    </div>
                </div>
                <div class="post-stats">
                    <span>${post.score || 0} points</span>
                    <span>${post.num_comments || 0} comments</span>
                </div>
            </div>
            ${thumbnail ? `<img src="${thumbnail}" class="post-thumbnail" alt="Post thumbnail">` : ''}
        `;

        return postDiv;
    }

    getThumbnail(post) {
        if (post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.thumbnail.startsWith('http')) {
            return post.thumbnail;
        }
        return null;
    }

    openPost(permalink) {
        window.open(`https://reddit.com${permalink}`, '_blank');
    }

    async removePost(postId) {
        if (!confirm('Are you sure you want to remove this post from your saved list?')) {
            return;
        }

        try {
            // Remove from local data
            this.allPosts = this.allPosts.filter(post => post.id !== postId);
            
            // Update storage
            const updatedPosts = this.allPosts.map(post => ({ data: post }));
            await this.updateStoredPosts(updatedPosts);
            
            // Refresh display
            this.applyFilters();
            this.updateStats({ saved_posts: updatedPosts });
            this.populateSubredditFilter();

        } catch (error) {
            console.error('Error removing post:', error);
            alert('Failed to remove post. Please try again.');
        }
    }

    async updateStoredPosts(posts) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ saved_posts: posts }, resolve);
        });
    }

    setView(viewType) {
        this.currentView = viewType;
        
        // Update button states
        this.elements.listViewBtn.classList.toggle('active', viewType === 'list');
        this.elements.gridViewBtn.classList.toggle('active', viewType === 'grid');
        
        // Re-render posts with new view
        this.renderPosts();
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
        
        if (totalPages <= 1) {
            this.elements.pagination.style.display = 'none';
            return;
        }

        this.elements.pagination.style.display = 'flex';
        this.elements.prevPageBtn.disabled = this.currentPage === 1;
        this.elements.nextPageBtn.disabled = this.currentPage === totalPages;
        this.elements.pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
    }
}

// Global functions for onclick handlers
window.openPost = function(permalink) {
    window.open(`https://reddit.com${permalink}`, '_blank');
};

window.removePost = function(postId) {
    if (window.detailedViewController) {
        window.detailedViewController.removePost(postId);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.detailedViewController = new DetailedViewController();
});