import { getReoccurringItems, transformData } from '.';

const TEST_DATA = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

// Test the transform data function
test('Transform data should return the correct data', () => {
  expect(transformData(TEST_DATA)).toStrictEqual([
    {
      compartmentA: 'vJrwpWtwJgWr',
      compartmentB: 'hcsFMMfFFhFp',
    },
    {
      compartmentA: 'jqHRNqRjqzjGDLGL',
      compartmentB: 'rsFMfFZSrLrFZsSL',
    },
    {
      compartmentA: 'PmmdzqPrV',
      compartmentB: 'vPwwTWBwg',
    },
    {
      compartmentA: 'wMqvLMZHhHMvwLH',
      compartmentB: 'jbvcjnnSBnvTQFn',
    },
    {
      compartmentA: 'ttgJtRGJ',
      compartmentB: 'QctTZtZT',
    },
    {
      compartmentA: 'CrZsJsPPZsGz',
      compartmentB: 'wwsLwLmpwMDw',
    },
  ]);
});

// Test that the function get reoccurring items from a object gets the single item that is reoccurring
test('Get reoccurring items from object should return the correct item', () => {
  expect(
    getReoccurringItems([
      {
        compartmentA: 'vJrwpWtwJgWr',
        compartmentB: 'hcsFMMfFFhFp',
      },
    ])
  ).toStrictEqual(['p']);
  expect(
    getReoccurringItems([
      { compartmentA: 'vJrwpWtwJgWr', compartmentB: 'hcsFMMfFFhFp' },
      { compartmentA: 'jqHRNqRjqzjGDLGL', compartmentB: 'rsFMfFZSrLrFZsSL' },
      { compartmentA: 'PmmdzqPrV', compartmentB: 'vPwwTWBwg' },
    ])
  ).toStrictEqual(['p', 'L', 'P']);
});
