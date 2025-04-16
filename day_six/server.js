// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".txt": "text/plain",
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || "text/plain";
}

function createServer({ port = 3000, dir = __dirname }) {
  const rootDir = path.resolve(dir);

  const server = http.createServer((req, res) => {
    const reqPath = req.url === "/" ? "/index.html" : req.url;
    const filePath = path.join(rootDir, reqPath);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // 新增：尝试返回 404.html 页面
        const notFoundPage = path.join(rootDir, "404.html");
        return fs.access(notFoundPage, fs.constants.F_OK, (err404) => {
          if (err404) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end("404 Not Found");
          } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            fs.createReadStream(notFoundPage).pipe(res);
          }
        });
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", getMimeType(filePath));
      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.listen(port, () => {
    console.log(`✅ 服务器启动：http://localhost:${port}`);
    console.log(`📂 根目录：${rootDir}`);
  });
}

module.exports = createServer;
