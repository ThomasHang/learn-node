const express = require("express");
const app = express();
const PORT = 3000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());

// 🔖 模拟的任务数据
let tasks = [
  { id: 1, title: "学习 Node.js", completed: false },
  { id: 2, title: "写任务管理接口", completed: false },
];

let users = [
  // { id: 1, username: 'tianhang', password: '123456' }
];
const SECRET_KEY = 'tianhang-secret-key'; // 建议放环境变量中
// ✅ 获取所有任务
// 所有 /api/tasks 接口都加上 authMiddleware
app.get('/api/tasks', authMiddleware, (req, res) => {
  res.json(tasks);
});

// ✅ 新建一个任务
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "任务标题不能为空" });
  }

  const newTask = {
    id: Date.now(), // 用时间戳做 id
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ 获取单个任务
app.get("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "任务不存在" });
  }

  res.json(task);
});

// ✅ 更新任务
app.put("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "任务不存在" });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// ✅ 删除任务
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: '任务不存在' });
  }

  const deleted = tasks.splice(index, 1)[0];
  res.json({ message: '任务已删除', deleted });
});


app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '用户名和密码不能为空' });

  const exists = users.some(u => u.username === username);
  if (exists) return res.status(409).json({ error: '用户名已存在' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  res.status(201).json({ message: '注册成功', user: { id: newUser.id, username } });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: '用户名或密码错误' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: '用户名或密码错误' });

  // ✅ 签发 token
  const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ message: '登录成功', token });
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未提供 Token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // 把用户信息挂到请求对象上
    next();
  } catch (err) {
    res.status(401).json({ error: '无效的 Token' });
  }
}

// 启动服务
app.listen(PORT, () => {
  console.log(`🚀 服务器启动：http://localhost:${PORT}`);
});
