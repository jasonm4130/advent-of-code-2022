import { calculateScore, readInput } from ".";

test('Read the input', () => {
  expect(readInput('test.txt')).toStrictEqual([{"mine": 2, "opponent": 1}, {"mine": 1, "opponent": 2}, {"mine": 3, "opponent": 3}]);
});

test('Calculate the score for a win', () => {
  expect(calculateScore({mine: 2, opponent: 1})).toBe(8);
})

test('Calculate the score for a loss', () => {
  expect(calculateScore({mine: 1, opponent: 2})).toBe(1);
})

test('Calculate the score for a draw', () => {
  expect(calculateScore({mine: 3, opponent: 3})).toBe(6);
})