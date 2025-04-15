// event-demo.js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('download', (file) => {
  console.log(`📥 开始下载：${file}`);
  setTimeout(() => {
    myEmitter.emit('finish', file);
  }, 2000);
});

myEmitter.on('finish', (file) => {
  console.log(`✅ 下载完成：${file}`);
});

myEmitter.emit('download', '资料.zip');
