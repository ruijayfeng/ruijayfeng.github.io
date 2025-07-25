// ===== 主要JavaScript功能 =====

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileNavigation();
    initCodeCopyButtons();
    initSmoothScrolling();
    initScrollEffects();
    
    console.log('🚀 CodeBuddy 博客已加载完成');
});

// ===== 移动端导航功能 =====
function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuToggle || !mobileNavOverlay) return;
    
    // 打开移动端菜单
    mobileMenuToggle.addEventListener('click', function() {
        mobileNavOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // 添加动画效果
        setTimeout(() => {
            mobileNavOverlay.style.opacity = '1';
        }, 10);
    });
    
    // 关闭移动端菜单
    function closeMobileNav() {
        mobileNavOverlay.style.opacity = '0';
        document.body.style.overflow = '';
        
        setTimeout(() => {
            mobileNavOverlay.style.display = 'none';
        }, 300);
    }
    
    // 点击关闭按钮
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }
    
    // 点击背景关闭
    mobileNavOverlay.addEventListener('click', function(e) {
        if (e.target === mobileNavOverlay) {
            closeMobileNav();
        }
    });
    
    // 点击导航链接后关闭菜单
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // ESC键关闭菜单
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavOverlay.style.display === 'flex') {
            closeMobileNav();
        }
    });
}

// ===== 代码复制功能 =====
function initCodeCopyButtons() {
    // 为所有代码块添加复制按钮
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        
        // 创建代码块头部
        const codeHeader = document.createElement('div');
        codeHeader.className = 'code-header';
        
        // 检测代码语言
        const languageClass = codeBlock.className.match(/language-(\w+)/);
        const language = languageClass ? languageClass[1] : 'text';
        
        // 语言标签
        const languageLabel = document.createElement('span');
        languageLabel.className = 'code-language';
        languageLabel.textContent = language;
        
        // 复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-btn';
        copyButton.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>复制</span>
        `;
        
        // 复制功能
        copyButton.addEventListener('click', async function() {
            try {
                const codeText = codeBlock.textContent;
                await navigator.clipboard.writeText(codeText);
                
                // 更新按钮状态
                copyButton.classList.add('copied');
                copyButton.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    <span>已复制</span>
                `;
                
                // 2秒后恢复原状
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>复制</span>
                    `;
                }, 2000);
                
            } catch (err) {
                console.error('复制失败:', err);
                
                // 降级方案：选中文本
                const range = document.createRange();
                range.selectNode(codeBlock);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        });
        
        // 组装头部
        codeHeader.appendChild(languageLabel);
        codeHeader.appendChild(copyButton);
        
        // 插入到代码块前面
        pre.insertBefore(codeHeader, codeBlock);
    });
}

// ===== 平滑滚动 =====
function initSmoothScrolling() {
    // 处理锚点链接的平滑滚动
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 滚动效果 =====
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.site-header');
        
        // 页头背景透明度
        if (header) {
            const opacity = Math.min(scrollY / 100, 0.95);
            header.style.background = `rgba(10, 10, 15, ${opacity})`;
        }
        
        // 视差效果（可选）
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrollY < window.innerHeight) {
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
    
    // 初始调用
    updateScrollEffects();
}

// ===== 工具函数 =====

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

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 检测设备类型
function isMobile() {
    return window.innerWidth <= 768;
}

// 检测是否支持触摸
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ===== 性能优化 =====

// 图片懒加载（如果需要）
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// 预加载关键资源
function preloadCriticalResources() {
    const criticalImages = [
        // 在这里添加需要预加载的图片路径
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// ===== 错误处理 =====
window.addEventListener('error', function(e) {
    console.error('JavaScript错误:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
});

// ===== 开发模式调试 =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 开发模式已启用');
    
    // 添加调试信息
    window.debugInfo = {
        isMobile: isMobile(),
        isTouchDevice: isTouchDevice(),
        userAgent: navigator.userAgent,
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
    
    console.log('📱 设备信息:', window.debugInfo);
}