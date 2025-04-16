# 📦 serve-static

一个简洁高效的 Node.js 静态文件服务器，可通过命令行快速预览 HTML 页面、静态资源，适合前端本地调试和构建工具集成。

---

## 🚀 功能特性

- 支持指定端口和根目录
- 支持常见静态资源类型（HTML、CSS、JS、图片等）
- 支持 `index.html` 作为默认首页
- 支持 `404.html` 自定义 404 页面
- 支持 `--help` 参数查看使用说明
- 支持流式读取，性能优秀

---

## 📦 安装方式（npm 发布后）

```bash
npm install -g serve-static
```

---

## 目前不打算发布 npm 包

拉去项目后

```bash
yarn
npm link
```

## 🛠️ 使用方式

```bash
serve-static [--port=端口号] [--dir=目录路径]
```

### 参数说明：

| 参数     | 说明             | 默认值       |
| -------- | ---------------- | ------------ |
| `--port` | 启动的端口号     | `3000`       |
| `--dir`  | 设置根目录路径   | 当前执行路径 |
| `--help` | 显示使用帮助信息 | -            |

---

## 💻 示例

### 启动默认服务器（端口 3000，当前目录）

```bash
serve-static
```

### 指定端口和根目录

```bash
serve-static --port=8080 --dir=./dist
```

### 查看帮助信息

```bash
serve-static --help
```

---

## 📂 目录结构示例

```
my-project/
├── index.html
├── style.css
├── logo.jpg
├── 404.html
```

浏览器访问路径：

- `/` → 自动返回 `index.html`
- `/style.css` → 返回对应 CSS
- `/xxx.html` 不存在时 → 返回 `404.html`

---

## 📦 未来可扩展功能

- 添加缓存控制（ETag、Last-Modified）
- 支持目录列表预览
- 支持 gzip 压缩
- 支持中间件插件机制

---

## 📜 License

MIT

---

由 储天航 构建 💪
