const { saveAs } = require('file-saver');

const blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
console.log(blob);

saveAs(blob, 'hello world.txt');
