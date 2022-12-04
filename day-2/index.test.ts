import { calculateOutcome, calculateScore, getRoundPlayed, readInput } from ".";

test('Read the input', () => {
  expect(readInput('test.txt')).toStrictEqual([{"mine": 2, "opponent": 1}, {"mine": 1, "opponent": 2}, {"mine": 3, "opponent": 3}]);
});

test('Calculate outcome should draw if the inputs are the same', () => {
  expect(calculateOutcome({mine: 1, opponent: 1})).toBe('draw');
  expect(calculateOutcome({mine: 2, opponent: 2})).toBe('draw');
  expect(calculateOutcome({mine: 3, opponent: 3})).toBe('draw');
})

test('Calculate outcome should win if mine beats opponent', () => {
  expect(calculateOutcome({mine: 1, opponent: 3})).toBe('win');
  expect(calculateOutcome({mine: 2, opponent: 1})).toBe('win');
  expect(calculateOutcome({mine: 3, opponent: 2})).toBe('win');
})

test('Calculate outcome should lose if opponent beats mine', () => {
  expect(calculateOutcome({mine: 3, opponent: 1})).toBe('lose');
  expect(calculateOutcome({mine: 1, opponent: 2})).toBe('lose');
  expect(calculateOutcome({mine: 2, opponent: 3})).toBe('lose');
})

test('Calculate the score for a win', () => {
  expect(calculateScore({mine: 2, opponent: 1})).toBe(8);
})

test('Calculate the score for a loss', () => {
  expect(calculateScore({mine: 1, opponent: 2})).toBe(1);
})

test('Calculate the score for a draw', () => {
  expect(calculateScore({mine: 3, opponent: 3})).toBe(6);
})

test('Get round played should return correct hand for a lose', () => {
  expect(getRoundPlayed({opponent: 1, outcome: 'lose'})).toStrictEqual({mine: 3, opponent: 1});
  expect(getRoundPlayed({opponent: 2, outcome: 'lose'})).toStrictEqual({mine: 1, opponent: 2});
  expect(getRoundPlayed({opponent: 3, outcome: 'lose'})).toStrictEqual({mine: 2, opponent: 3});
})

test('Get round played should return correct hand for a draw', () => {
  expect(getRoundPlayed({opponent: 1, outcome: 'draw'})).toStrictEqual({mine: 1, opponent: 1});
  expect(getRoundPlayed({opponent: 2, outcome: 'draw'})).toStrictEqual({mine: 2, opponent: 2});
  expect(getRoundPlayed({opponent: 3, outcome: 'draw'})).toStrictEqual({mine: 3, opponent: 3});
})

test('Get round played should return correct hand for a win', () => {
  expect(getRoundPlayed({opponent: 1, outcome: 'win'})).toStrictEqual({mine: 2, opponent: 1});
  expect(getRoundPlayed({opponent: 2, outcome: 'win'})).toStrictEqual({mine: 3, opponent: 2});
  expect(getRoundPlayed({opponent: 3, outcome: 'win'})).toStrictEqual({mine: 1, opponent: 3});
})