const fs = require("fs");
const path = require("path");

console.log(__dirname);  // /Users/yourname/project
// console.log(__filename); // /Users/yourname/project/index.js

// const filePath = path.join(__dirname, "test.txt");

// // 写入文件（异步）
// fs.writeFile(filePath, "Hello Node!", (err) => {
//   if (err) return console.error(err);
//   console.log("写入成功");
// });

// // 读取文件（异步）
// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) return console.error(err);
//   console.log("文件内容：", data);
// });
const currentDir = __dirname;
console.log(fs,"fs模块：")
fs.readdir(currentDir, (err, files) => {
    console.log(files,"当前目录包含文件：")
  if (err) {
    console.error("读取目录失败：", err);
    return;
  }
//   console.log("当前目录包含文件：");
//   files.forEach((file) => {
//     console.log(" -", file);
//   });
});
