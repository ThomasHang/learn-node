const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url);
  if (req.url === "/") {
    fs.access(htmlPath, fs.constants.F_OK, (err) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("404 Not Found: HTML 文件不存在");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      fs.createReadStream(filePath).pipe(res);
    });
  } else if (req.url === "/text") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(
      "在 Node.js 中构建一个简单应用通常包括以下几个步骤：安装 Node.js 设置项目目录 初始化项目 创建服务器 并处理请求和响应"
    );
  } else if (req.url === "/img") {
    // 处理图片请求
    res.setHeader("Content-Type", "image/jpg");
    fs.createReadStream("./R.jpg").pipe(res);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("404 Not Found: 请求的页面不存在");
  }
});

server.listen(3000, () => {
  console.log("服务器已启动：http://localhost:3000");
});
