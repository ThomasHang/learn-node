const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('greet', (name) => {
  console.log(`👋 Hello, ${name}`);
});

myEmitter.emit('greet', '储天航'); // 输出：Hello, 储天航
