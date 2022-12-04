import { resolve } from 'path';
import { readInput } from "../common/readInput";

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function transformData(data: string) {
  return data.split(/\n/).map((line) => {
    const length = line.length;

    const [compartmentA, compartmentB] = [line.slice(0, length / 2), line.slice(length / 2)]

    return {compartmentA, compartmentB}
  });
}

export function getReoccurringItems(data: {compartmentA: string, compartmentB: string}[]) {
  return data.map(({compartmentA, compartmentB}) => {
    let itemToMove = '';
    compartmentA.split('').forEach((letter) => {
      if (compartmentB.includes(letter)) {
        itemToMove = letter;
      }
    })
    return itemToMove;
  });
}

export function getPriority(data: string[]) {
  return data.map((letter) => {
    return LETTERS.indexOf(letter) + 1;
  })
}

export function transformDataPartTwo(data: string) {
  return data.split(/\n/).reduce((accumulator, line) => {
    // If there are three elves in the group add another group
    if (accumulator.at(-1)!.length === 3) {
      accumulator.push([]);
    }

    // Add the elf to the group
    accumulator.at(-1)?.push(line);

    // Return our items
    return accumulator;
  }, [[]] as string[][]);
}

export function getBadgeItems(data: string[][]) {
  return data.map((group) => {
    let possibleBadgeItems = group.at(0)?.split('');

    for (let i = 0; i < possibleBadgeItems!.length; i++) {
      const letter = possibleBadgeItems![i];
      if (group.every((pack) => pack.includes(letter))) {
        return letter;
      }
    };
  })
}

(() => {
  const data = readInput(resolve('./day-3/input.txt'));

  const transformedData = transformData(data);

  const reoccurringItems = getReoccurringItems(transformedData);

  const priorities = getPriority(reoccurringItems);

  const sumOfPriorities = priorities.reduce((sum, num) => {
    return sum + num;
  }, 0);

  console.log(`The sum of the priorities is ${sumOfPriorities}`);

  const partTwoTransformedData = transformDataPartTwo(data);

  const badgeItems = getBadgeItems(partTwoTransformedData) as string[];

  const partTwoPriorities = getPriority(badgeItems);

  const sumOfPartTwoPriorities = partTwoPriorities.reduce((sum, num) => {
    return sum + num;
  }, 0);

  console.log(`the sum of part two priorities is ${sumOfPartTwoPriorities}`)
})()