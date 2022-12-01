import fs from 'fs';
import path from 'path';

/**
 * Reads an input text string and returns it as an array of arrays representing food items each elf is carrying
 * @param param0 object takes a param fileLocation of the input txt file to read
 * @returns array of arrays representing the calories in each elfs food items
 */
export function readInput({ fileLocation }: { fileLocation: string }) {
  // Read the file from the file location, split on empty lines, then split again on each new line in the arrays
  return fs
    .readFileSync(path.join(__dirname, fileLocation), 'utf-8')
    .split('\n\n')
    .map((elf) => elf.split(/\r?\n/).map((calories) => parseInt(calories)));
}

export function sumCalories({ input }: { input: number[][] }) {
  return input.map((elfFoodItems) =>
    elfFoodItems.reduce((partialSum, a) => partialSum + a, 0)
  );
}

export function sortCalories({ input }: { input: number[] }) {
  return input.sort((a, b) => b - a);
}

export function getHighestCalories({ input }: { input: number[] }) {
  return input.at(0) || 0;
}

export function getHighestThreeSum({ input }: { input: number[] }) {
  return input.slice(0, 3).reduce((partialSum, a) => partialSum + a, 0);
}

(() => {
  // Read our data
  const data = readInput({ fileLocation: 'input.txt' });

  // Get the sum for each elf
  const elves = sumCalories({ input: data });

  // Sort the elves
  const sortedElves = sortCalories({ input: elves });

  // Get the highest calories
  const highestCalories = getHighestCalories({ input: sortedElves });

  // Print the answer
  console.log(
    `The elf with the highest calories is carrying ${highestCalories} calories`
  );

  // Get the sum of the highest three elves
  const highestThreeSum = getHighestThreeSum({ input: sortedElves });

  // Print the answer to part 2
  console.log(
    `The calories carried by the top 3 elves are ${highestThreeSum} calories`
  );
})();
