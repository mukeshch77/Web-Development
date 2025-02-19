const fs = require('fs');

// Read the file named "test.txt"
fs.readFile('test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log('File contents:\n', data);
});