## 任务目标

🧭 今日任务拆解：

步骤 | 内容 | 技术点
1️⃣ | 支持命令行参数 | process.argv / minimist
2️⃣ | 配置端口号 | 默认 3000，可自定义
3️⃣ | 配置静态目录 | 默认 \_\_dirname，可传入目录路径
4️⃣ | 把代码封装成模块 | 更清晰易维护
5️⃣ | 撰写 package.json 配置 | 为发布 npm 做准备


✅ 示例效果：

node server-advance.js --port=8080 --dir=./public
# 启动一个服务器，监听 8080 端口，根目录为 ./public




📦 第一步：安装参数解析工具（推荐 minimist）
在项目根目录执行：

npm init -y
npm install minimist
