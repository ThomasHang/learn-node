#!/usr/bin/env node

const minimist = require('minimist');
const createServer = require('./server');

const args = minimist(process.argv.slice(2));

// ✅ --help 参数：输出说明并退出
if (args.help) {
  console.log(`
📦 静态服务器使用说明：

Usage:
  serve-static [--port=端口号] [--dir=目录路径]

Options:
  --port    指定服务器监听的端口号（默认 3000）
  --dir     指定要作为根目录的文件夹（默认当前路径）
  --help    查看帮助信息

Examples:
  serve-static
  serve-static --port=8080 --dir=./public
`);
  process.exit(0);
}

// ✅ 解析参数并启动服务器
const port = args.port || 3000;
const dir = args.dir || process.cwd();

createServer({ port, dir });
