const fs = require("fs").promises;

const readFile = async (path) => {
  try {
    const [a, b] = await Promise.all([
      fs.readFile("./hello.txt", "utf-8"),
      fs.readFile("./new.txt", "utf-8"),
    ]);
    console.log('合并结果：', a + b);
    // return data;
  } catch (error) {
    console.log(error);
  }
};
readFile();
