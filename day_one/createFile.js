const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("❌ 使用方法：node createFile.js <文件名> <内容>");
  process.exit(1);
}

const filePath = path.join(__dirname, args[0]);

// 写入文件（异步）
fs.appendFile(filePath, args[1], (err) => {
  if (err) return console.error(err);
  console.log("写入成功");
});


fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) return console.error(err);
  console.log("文件内容：", data);
});
