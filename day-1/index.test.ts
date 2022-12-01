import {
  getHighestCalories,
  getHighestThreeSum,
  readInput,
  sortCalories,
  sumCalories
} from '.';

test('Read the input', () => {
  expect(readInput({ fileLocation: 'test.txt' })).toStrictEqual([
    [1000, 2000, 3000],
    [4000],
    [5000, 6000],
    [7000, 8000, 9000],
    [10000],
  ]);
});

test('Sum the callories', () => {
  expect(
    sumCalories({
      input: [
        [1000, 2000, 3000],
        [4000],
        [5000, 6000],
        [7000, 8000, 9000],
        [10000],
      ],
    })
  ).toStrictEqual([6000, 4000, 11000, 24000, 10000]);
});

test('Sort the calories', () => {
  expect(
    sortCalories({ input: [6000, 4000, 11000, 24000, 10000] })
  ).toStrictEqual([24000, 11000, 10000, 6000, 4000]);
});

test('Get the highest calories', () => {
  expect(getHighestCalories({ input: [24000, 11000, 10000, 6000, 4000] })).toBe(
    24000
  );
});

test('Get the sum of the highest three', () => {
  expect(getHighestThreeSum({ input: [24000, 11000, 10000, 6000, 4000] })).toBe(
    45000
  );
});
