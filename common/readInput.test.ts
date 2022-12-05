const { resolve } = require('path');
const { readInput } = require('../common/readInput');
const expectedData = 'Qui enim laboris Lorem reprehenderit aliquip sunt esse irure. Aute dolore nulla duis proident eu fugiat. Ex non anim elit magna incididunt ipsum consequat nostrud consequat ad ullamco. Ad est aute nostrud qui irure fugiat quis.';

// Test that read input returns the data from a file path as a string
test('readInput returns the data from a file path as a string', () => {
  const data = readInput('./common/testData.txt');
  expect(data).toBe(expectedData);
});