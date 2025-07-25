# 🚀 CodeBuddy 科技博客模板

一个采用未来主义科技美学设计的Jekyll博客模板，具备动态极光背景、玻璃拟态效果和完全响应式布局。

![Jekyll](https://img.shields.io/badge/Jekyll-4.3+-red.svg)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Compatible-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## ✨ 特色功能

- 🌌 **动态极光背景** - 沉浸式的视觉体验
- 🔮 **玻璃拟态设计** - 现代化的界面元素
- 📱 **完全响应式** - 适配所有设备尺寸
- 🎨 **精美代码高亮** - 支持多种编程语言
- ⚡ **极速加载** - 优化的性能表现
- 🔍 **SEO友好** - 内置SEO优化
- 📝 **Markdown支持** - 简单的内容创作

## 🎨 设计风格

- **主色调**: 深邃星空蓝 (`#0a0a0f`)
- **强调色**: 霓虹蓝 (`#00d4ff`) 和 紫色 (`#8b5cf6`)
- **设计语言**: 玻璃拟态 + 未来主义科技美学
- **字体**: Inter (正文) + JetBrains Mono (代码)

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/yourusername/codebuddy-blog.git
cd codebuddy-blog
```

### 2. 安装依赖

```bash
# 安装 Ruby 依赖
bundle install

# 或者使用 gem 安装
gem install jekyll bundler
```

### 3. 本地运行

```bash
# 启动开发服务器
bundle exec jekyll serve

# 或者
jekyll serve
```

访问 `http://localhost:4000` 查看博客。

### 4. 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 等待自动构建完成

## ⚙️ 配置说明

### 基础配置

编辑 `_config.yml` 文件：

```yaml
title: "你的博客标题"
description: "你的博客描述"
author: "你的名字"
email: "your.email@example.com"
url: "https://yourusername.github.io"

# 社交媒体链接
social:
  github: "yourusername"
  twitter: "yourusername"
  linkedin: "yourusername"
```

### 自定义样式

主要样式文件位于 `assets/css/` 目录：

- `main.css` - 主样式文件（导入所有模块）
- `style.css` - 基础样式和变量
- `pages.css` - 页面特定样式
- `code.css` - 代码高亮样式
- `components.css` - 组件样式

### 颜色自定义

在 `assets/css/style.css` 中修改 CSS 变量：

```css
:root {
  --background-color: #0a0a0f;
  --accent-glow-color: #00d4ff;
  --accent-purple: #8b5cf6;
  /* 更多变量... */
}
```

## 📝 内容创作

### 创建文章

在 `_posts/` 目录下创建新文件：

```markdown
---
layout: post
title: "文章标题"
date: 2024-01-01 12:00:00 +0800
categories: [分类1, 分类2]
tags: [标签1, 标签2, 标签3]
author: "作者名"
description: "文章描述"
---

# 文章内容

这里是文章的正文内容...
```

### 创建页面

在根目录创建 `.md` 文件：

```markdown
---
layout: default
title: "页面标题"
permalink: /page-url/
---

# 页面内容

这里是页面内容...
```

### 代码高亮

支持多种编程语言的语法高亮：

````markdown
```javascript
function hello() {
  console.log('Hello, World!');
}
```

```python
def hello():
    print("Hello, World!")
```

```css
.example {
  color: #00d4ff;
  background: rgba(17, 24, 39, 0.4);
}
```
````

## 🎯 功能特性

### 响应式导航

- 桌面端：水平导航栏
- 移动端：汉堡菜单 + 全屏覆盖层
- 支持键盘导航和无障碍访问

### 文章功能

- 文章列表页面 (`/posts/`)
- 标签云页面 (`/tags/`)
- 文章搜索和筛选
- 代码复制功能
- 文章导航（上一篇/下一篇）

### 性能优化

- CSS 和 JavaScript 压缩
- 图片懒加载支持
- 关键资源预加载
- 移动端性能优化

## 📱 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE 不支持（使用了现代CSS特性）

## 🛠️ 开发指南

### 项目结构

```
├── _config.yml          # Jekyll 配置
├── _includes/           # 包含文件
│   ├── header.html      # 页头
│   └── footer.html      # 页脚
├── _layouts/            # 布局模板
│   ├── default.html     # 默认布局
│   ├── home.html        # 首页布局
│   └── post.html        # 文章布局
├── _posts/              # 文章目录
├── assets/              # 静态资源
│   ├── css/             # 样式文件
│   └── js/              # JavaScript文件
├── index.md             # 首页
├── about.md             # 关于页面
├── posts.md             # 文章列表
└── tags.md              # 标签页面
```

### 自定义开发

1. **修改样式**: 编辑 `assets/css/` 下的文件
2. **添加功能**: 修改 `assets/js/main.js`
3. **自定义布局**: 编辑 `_layouts/` 下的模板
4. **添加组件**: 在 `_includes/` 中创建新文件

### 调试技巧

```bash
# 启用详细输出
bundle exec jekyll serve --verbose

# 启用增量构建
bundle exec jekyll serve --incremental

# 查看草稿
bundle exec jekyll serve --drafts
```

## 🔧 故障排除

### 常见问题

**Q: 样式没有加载？**
A: 检查 `_config.yml` 中的 `baseurl` 设置，确保路径正确。

**Q: 代码高亮不工作？**
A: 确保安装了 `rouge` gem，并在 `_config.yml` 中正确配置。

**Q: 移动端菜单无法打开？**
A: 检查 JavaScript 是否正确加载，查看浏览器控制台错误。

**Q: GitHub Pages 构建失败？**
A: 检查是否使用了不支持的插件，查看构建日志。

### 性能优化建议

1. **图片优化**: 使用 WebP 格式，启用懒加载
2. **CSS优化**: 移除未使用的样式，启用压缩
3. **JavaScript优化**: 按需加载，避免阻塞渲染
4. **缓存策略**: 设置适当的缓存头

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 支持

如果你喜欢这个项目，请给它一个 ⭐！

- 📧 邮箱: your.email@example.com
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 🐦 Twitter: [@yourusername](https://twitter.com/yourusername)

---

**用 ❤️ 和 ☕ 制作**