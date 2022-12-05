import { resolve } from 'path';
import { readInput } from '../common/readInput';

export const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function transformData(data: string) {
  return data.split(/\n/).map((line) => {
    const { length } = line;

    const [compartmentA, compartmentB] = [
      line.slice(0, length / 2),
      line.slice(length / 2),
    ];

    return { compartmentA, compartmentB };
  });
}

export function getReoccurringItems(
  data: { compartmentA: string; compartmentB: string }[]
) {
  return data.map(({ compartmentA, compartmentB }) => {
    let itemToMove = '';
    compartmentA.split('').forEach((letter) => {
      if (compartmentB.includes(letter)) {
        itemToMove = letter;
      }
    });
    return itemToMove;
  });
}

export function getPriority(data: string[]) {
  return data.map((letter) => LETTERS.indexOf(letter) + 1);
}

export function transformDataPartTwo(data: string) {
  return data.split(/\n/).reduce(
    (accumulator, line) => {
      // If there are three elves in the group add another group
      if (accumulator.at(-1)!.length === 3) {
        accumulator.push([]);
      }

      // Add the elf to the group
      accumulator.at(-1)?.push(line);

      // Return our items
      return accumulator;
    },
    [[]] as string[][]
  );
}

export function getBadgeItems(data: string[][]) {
  return data.map((group) => {
    const possibleBadgeItems = group.at(0)?.split('');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < possibleBadgeItems!.length; i++) {
      const letter = possibleBadgeItems![i];
      if (group.every((pack) => pack.includes(letter))) {
        return letter;
      }
    }

    return '';
  });
}

(() => {
  const data = readInput(resolve('./day-3/input.txt'));

  const transformedData = transformData(data);

  const reoccurringItems = getReoccurringItems(transformedData);

  const priorities = getPriority(reoccurringItems);

  const sumOfPriorities = priorities.reduce((sum, num) => sum + num, 0);

  console.log(`The sum of the priorities is ${sumOfPriorities}`);

  const partTwoTransformedData = transformDataPartTwo(data);

  const badgeItems = getBadgeItems(partTwoTransformedData);

  const partTwoPriorities = getPriority(badgeItems);

  const sumOfPartTwoPriorities = partTwoPriorities.reduce(
    (sum, num) => sum + num,
    0
  );

  console.log(`the sum of part two priorities is ${sumOfPartTwoPriorities}`);
})();
