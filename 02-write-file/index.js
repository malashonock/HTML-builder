const fs = require('fs');
const path = require('path');
const { stdin } = process;

// const ws = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

console.log(
  'Hello! Please type some text below (to exit, type "exit" or press Ctrl + C):'
);

stdin.on('data', (input) => {
  const inputString = input.toString().replace(/\r|\n$/g, '');
  if (inputString === 'exit') {
    process.emit('SIGINT');
  } else {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      inputString + '\n',
      'utf-8',
      (error) => {
        if (error) throw error;
        console.log('Text saved, please type more:');
      }
    );
  }
});

process.on('SIGINT', () => {
  console.log('Good bye!');
  process.exit(0);
});
