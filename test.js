const assert = require('assert');
const getMessage = require('./main');

describe('Main.js Test', () => {
  it('should return Hello, World Ahmed', () => {
    const output = getMessage();
    assert.strictEqual(output, "Hello, World Ahmed");
  });
});
