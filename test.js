const assert = require('assert');
const getMessage = require('./main');

describe('Main.js Test', () => {
  it('should return Hello, World', () => {
    const output = getMessage();
    assert.strictEqual(output, "Hello, World");
  });
});
