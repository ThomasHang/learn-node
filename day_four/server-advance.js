const http = require("http");
const fs = require("fs");
const path = require("path");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".json": "application/json",
};

function getMimeType(filePath) {
  console.log(filePath, "请求的文件路径：");
  const extname = path.extname(filePath);
  console.log(extname, "请求的文件后缀名：");
  // return mimeTypes[extname];
}
const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "/index.html" : req.url
  );
  console.log(filePath, "请求的文件路径：");
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", getMimeType(filePath));
    fs.createReadStream("./index.html").pipe(res);
  } else if (req.url === "/jpg") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    fs.createReadStream("./viewFlowers.jpg").pipe(res);
    getMimeType(filePath)
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("404 Not Found: 请求的页面不存在");
  }
});

server.listen(3000, () => {
  console.log("服务器已启动：http://localhost:3000");
});
