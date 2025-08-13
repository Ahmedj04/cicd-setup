// const assert = require('assert');

// describe('Hello World Test', () => {
//   it('should return Hello World', () => {
//     const output = "Hello, World";
//     assert.strictEqual(output, "Hello, World");
//   });
// });
const assert = require('assert');
const getMessage = require('./main'); // import function from main.js

describe('Main.js Test', () => {
  it('should return Hello, World', () => {
    const output = getMessage();
    assert.strictEqual(output, "Hello, World");
  });
});
