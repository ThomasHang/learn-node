const http = require('http');
const fs = require('fs');
const path = require('path');



// MIME 类型映射表 
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.txt': 'text/plain',
  // 可扩展更多类型
};  

// 获取 MIME 类型函数
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'text/plain'; // 没找到就默认 text/plain
}

// 创建服务器
const server = http.createServer((req, res) => {
  // 请求路径处理
  let reqPath = req.url;

  // 默认访问根目录返回 index.html
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  // 构造文件真实路径
  const filePath = path.join(__dirname, reqPath);

  // 检查文件是否存在
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // 文件不存在，返回 404
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('404 Not Found：文件不存在');
      return;
    }

    // 文件存在，设置类型并返回
    res.statusCode = 200;
    res.setHeader('Content-Type', getMimeType(filePath));
    fs.createReadStream(filePath).pipe(res);
  });
});

// 启动服务
server.listen(3000, () => {
  console.log('🚀 静态服务器启动成功：http://localhost:3000');
});
