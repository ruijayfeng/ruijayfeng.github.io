---
layout: default
title: "所有文章"
permalink: /posts/
---

<div class="posts-page">
    <div class="posts-header glass-container">
        <h1 class="posts-title">所有文章</h1>
        <p class="posts-description">探索技术的深度，分享代码的美学</p>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="posts-controls">
        <div class="search-container glass-container">
            <input type="text" class="search-input" placeholder="搜索文章..." id="searchInput">
            <button class="search-btn" id="searchBtn" aria-label="搜索">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
            </button>
        </div>
        
        <div class="posts-filter glass-container">
            <button class="filter-btn active" data-filter="all">全部</button>
            {% assign categories = site.categories | sort %}
            {% for category in categories limit: 5 %}
            <button class="filter-btn" data-filter="{{ category[0] | slugify }}">{{ category[0] }}</button>
            {% endfor %}
        </div>
    </div>
    
    <!-- 文章列表 -->
    <div class="posts-content">
        {% if site.posts.size > 0 %}
        <div class="posts-grid" id="postsGrid">
            {% for post in site.posts %}
            <article class="post-card glass-container" 
                     data-title="{{ post.title | downcase }}"
                     data-content="{{ post.content | strip_html | downcase | truncatewords: 50 }}"
                     data-tags="{{ post.tags | join: ' ' | downcase }}"
                     data-categories="{{ post.categories | join: ' ' | slugify }}">
                <div class="post-card-content">
                    <div class="post-meta">
                        <time class="post-date" datetime="{{ post.date | date_to_xmlschema }}">
                            {{ post.date | date: "%Y年%m月%d日" }}
                        </time>
                        {% if post.categories.size > 0 %}
                        <div class="post-categories">
                            {% for category in post.categories limit: 1 %}
                            <span class="post-category">{{ category }}</span>
                            {% endfor %}
                        </div>
                        {% endif %}
                    </div>
                    
                    <h3 class="post-title">
                        <a href="{{ post.url | relative_url }}" class="post-link">
                            {{ post.title }}
                        </a>
                    </h3>
                    
                    {% if post.description %}
                    <p class="post-excerpt">{{ post.description }}</p>
                    {% elsif post.excerpt %}
                    <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
                    {% endif %}
                    
                    {% if post.tags.size > 0 %}
                    <div class="post-tags">
                        {% for tag in post.tags limit: 3 %}
                        <span class="post-tag">{{ tag }}</span>
                        {% endfor %}
                        {% if post.tags.size > 3 %}
                        <span class="post-tag-more">+{{ post.tags.size | minus: 3 }}</span>
                        {% endif %}
                    </div>
                    {% endif %}
                    
                    <div class="post-footer">
                        <a href="{{ post.url | relative_url }}" class="read-more-link">
                            阅读全文
                            <svg class="read-more-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                        {% if post.author %}
                        <span class="post-author">{{ post.author }}</span>
                        {% endif %}
                    </div>
                </div>
            </article>
            {% endfor %}
        </div>
        
        <!-- 加载更多按钮 -->
        <div class="load-more-container" id="loadMoreContainer" style="display: none;">
            <button class="load-more-btn glass-container" id="loadMoreBtn">
                <span class="load-more-text">加载更多文章</span>
                <div class="loading-spinner" style="display: none;"></div>
            </button>
        </div>
        
        <!-- 无搜索结果 -->
        <div class="no-results glass-container" id="noResults" style="display: none;">
            <div class="no-results-icon">🔍</div>
            <h3 class="no-results-title">没有找到相关文章</h3>
            <p class="no-results-description">尝试使用不同的关键词或筛选条件</p>
            <button class="clear-search-btn" id="clearSearchBtn">清除搜索</button>
        </div>
        
        {% else %}
        <div class="empty-state glass-container">
            <div class="empty-icon">📝</div>
            <h3 class="empty-title">还没有文章</h3>
            <p class="empty-description">开始写作，分享你的想法和见解吧！</p>
        </div>
        {% endif %}
    </div>
</div>

<style>
.posts-controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
}

.search-container {
    padding: var(--spacing-md);
}

.posts-filter {
    padding: var(--spacing-md);
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    justify-content: center;
}

.post-categories {
    display: flex;
    gap: var(--spacing-xs);
}

.post-category {
    background: rgba(139, 92, 246, 0.2);
    color: var(--accent-purple);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid rgba(139, 92, 246, 0.3);
}

.post-tag-more {
    background: rgba(255, 255, 255, 0.1);
    color: var(--secondary-text-color);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.post-author {
    color: var(--secondary-text-color);
    font-size: 0.875rem;
}

.load-more-container {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-2xl);
}

.load-more-btn {
    padding: var(--spacing-md) var(--spacing-xl);
    background: none;
    border: none;
    color: var(--accent-glow-color);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.load-more-btn:hover {
    background: rgba(0, 212, 255, 0.1);
    transform: translateY(-2px);
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.no-results {
    text-align: center;
    padding: var(--spacing-2xl);
    margin-top: var(--spacing-xl);
}

.no-results-icon {
    font-size: 3rem;
    margin-bottom: var(--spacing-md);
    opacity: 0.5;
}

.no-results-title {
    color: var(--primary-text-color);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
}

.no-results-description {
    color: var(--secondary-text-color);
    margin-bottom: var(--spacing-lg);
}

.clear-search-btn {
    background: rgba(0, 212, 255, 0.1);
    color: var(--accent-glow-color);
    border: 1px solid rgba(0, 212, 255, 0.3);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.clear-search-btn:hover {
    background: rgba(0, 212, 255, 0.2);
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .posts-controls {
        gap: var(--spacing-md);
    }
    
    .posts-filter {
        gap: var(--spacing-xs);
    }
    
    .filter-btn {
        font-size: 0.875rem;
        padding: 0.5rem 0.75rem;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const postsGrid = document.getElementById('postsGrid');
    const noResults = document.getElementById('noResults');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const postCards = document.querySelectorAll('.post-card');
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    // 搜索功能
    function performSearch() {
        currentSearch = searchInput.value.toLowerCase().trim();
        filterPosts();
    }
    
    // 筛选功能
    function filterPosts() {
        let visibleCount = 0;
        
        postCards.forEach(card => {
            const title = card.dataset.title || '';
            const content = card.dataset.content || '';
            const tags = card.dataset.tags || '';
            const categories = card.dataset.categories || '';
            
            // 搜索匹配
            const searchMatch = !currentSearch || 
                title.includes(currentSearch) || 
                content.includes(currentSearch) || 
                tags.includes(currentSearch);
            
            // 分类筛选
            const categoryMatch = currentFilter === 'all' || 
                categories.includes(currentFilter);
            
            if (searchMatch && categoryMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // 显示/隐藏无结果提示
        if (visibleCount === 0 && (currentSearch || currentFilter !== 'all')) {
            noResults.style.display = 'block';
            postsGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            postsGrid.style.display = 'grid';
        }
    }
    
    // 搜索事件
    searchInput.addEventListener('input', debounce(performSearch, 300));
    searchBtn.addEventListener('click', performSearch);
    
    // 回车搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 筛选按钮事件
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活跃状态
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 更新筛选条件
            currentFilter = this.dataset.filter;
            filterPosts();
        });
    });
    
    // 清除搜索
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        currentSearch = '';
        currentFilter = 'all';
        
        // 重置筛选按钮
        filterBtns.forEach(btn => btn.classList.remove('active'));
        filterBtns[0].classList.add('active');
        
        filterPosts();
    });
    
    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 初始化
    filterPosts();
});
</script>