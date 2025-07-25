---
layout: default
title: "标签"
permalink: /tags/
---

<div class="tags-page">
    <div class="tags-header glass-container">
        <h1 class="tags-title">标签云</h1>
        <p class="tags-description">通过标签快速找到感兴趣的文章内容</p>
    </div>
    
    <div class="tags-content">
        {% assign tags = site.tags | sort %}
        {% if tags.size > 0 %}
        <div class="tags-cloud glass-container">
            {% for tag in tags %}
            {% assign tag_name = tag[0] %}
            {% assign tag_posts = tag[1] %}
            {% assign tag_size = tag_posts.size %}
            
            {% comment %} 根据文章数量设置标签大小 {% endcomment %}
            {% if tag_size >= 10 %}
                {% assign size_class = "tag-size-5" %}
            {% elsif tag_size >= 7 %}
                {% assign size_class = "tag-size-4" %}
            {% elsif tag_size >= 5 %}
                {% assign size_class = "tag-size-3" %}
            {% elsif tag_size >= 3 %}
                {% assign size_class = "tag-size-2" %}
            {% else %}
                {% assign size_class = "tag-size-1" %}
            {% endif %}
            
            <a href="#tag-{{ tag_name | slugify }}" class="tag-item {{ size_class }}" data-tag="{{ tag_name }}">
                {{ tag_name }}
                <span class="tag-count">({{ tag_size }})</span>
            </a>
            {% endfor %}
        </div>
        
        <!-- 标签对应的文章列表 -->
        <div class="tags-posts">
            {% for tag in tags %}
            {% assign tag_name = tag[0] %}
            {% assign tag_posts = tag[1] %}
            
            <div id="tag-{{ tag_name | slugify }}" class="tag-section glass-container" style="display: none;">
                <h2 class="tag-section-title">
                    <span class="tag-icon">#</span>
                    {{ tag_name }}
                    <span class="tag-section-count">({{ tag_posts.size }} 篇文章)</span>
                </h2>
                
                <div class="tag-posts-list">
                    {% for post in tag_posts %}
                    <article class="tag-post-item">
                        <div class="tag-post-meta">
                            <time class="tag-post-date" datetime="{{ post.date | date_to_xmlschema }}">
                                {{ post.date | date: "%Y-%m-%d" }}
                            </time>
                        </div>
                        <h3 class="tag-post-title">
                            <a href="{{ post.url | relative_url }}" class="tag-post-link">
                                {{ post.title }}
                            </a>
                        </h3>
                        {% if post.excerpt %}
                        <p class="tag-post-excerpt">
                            {{ post.excerpt | strip_html | truncatewords: 20 }}
                        </p>
                        {% endif %}
                    </article>
                    {% endfor %}
                </div>
            </div>
            {% endfor %}
        </div>
        
        {% else %}
        <div class="empty-state glass-container">
            <div class="empty-icon">🏷️</div>
            <h3 class="empty-title">还没有标签</h3>
            <p class="empty-description">开始写文章并添加标签吧！</p>
        </div>
        {% endif %}
    </div>
</div>

<style>
.tags-header {
    text-align: center;
    padding: var(--spacing-2xl);
    margin-bottom: var(--spacing-xl);
}

.tags-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.tags-cloud {
    padding: var(--spacing-xl);
}

.tag-section {
    padding: var(--spacing-xl);
}

.tag-section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--primary-text-color);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
}

.tag-icon {
    color: var(--accent-glow-color);
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.tag-section-count {
    font-size: 0.875rem;
    color: var(--secondary-text-color);
    font-weight: 400;
}

.tag-posts-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.tag-post-item {
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
}

.tag-post-item:hover {
    background: rgba(0, 212, 255, 0.05);
    border-color: rgba(0, 212, 255, 0.2);
    transform: translateY(-2px);
}

.tag-post-meta {
    margin-bottom: var(--spacing-xs);
}

.tag-post-date {
    color: var(--secondary-text-color);
    font-size: 0.875rem;
}

.tag-post-title {
    margin-bottom: var(--spacing-sm);
}

.tag-post-link {
    color: var(--primary-text-color);
    text-decoration: none;
    font-size: 1.125rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.tag-post-link:hover {
    color: var(--accent-glow-color);
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.tag-post-excerpt {
    color: var(--secondary-text-color);
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 768px) {
    .tags-header {
        padding: var(--spacing-lg);
    }
    
    .tags-cloud,
    .tag-section {
        padding: var(--spacing-lg);
    }
    
    .tag-section-title {
        font-size: 1.25rem;
        flex-wrap: wrap;
    }
    
    .tag-post-item {
        padding: var(--spacing-sm);
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const tagItems = document.querySelectorAll('.tag-item');
    const tagSections = document.querySelectorAll('.tag-section');
    
    // 点击标签显示对应文章
    tagItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // 隐藏所有标签区域
            tagSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // 移除所有活跃状态
            tagItems.forEach(tag => {
                tag.classList.remove('active');
            });
            
            // 显示目标区域并添加活跃状态
            if (targetSection) {
                targetSection.style.display = 'block';
                this.classList.add('active');
                
                // 平滑滚动到目标位置
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
</script>