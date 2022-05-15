const { EOL } = require('os');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin } = process;

const ws = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');
const rl = readline.createInterface(stdin, ws);

console.log(
  'Hello! Please type some text below (to exit, type "exit" or press Ctrl + C):'
);

rl.on('line', (input) => {
  if (input === 'exit') {
    process.emit('SIGINT');
  } else {
    ws.write(input + EOL);
  }
});

process.on('SIGINT', () => {
  console.log('Good bye!');
  process.exit(0);
});
