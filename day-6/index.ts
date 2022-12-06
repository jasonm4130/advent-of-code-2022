import { readInput } from '../common/readInput';

export function getStartOfBufferIndex(data: string, bufferSize = 4) {
  // Split our data into characters
  const dataAsCharacters = data.split('');

  // create an array to store the last 4 characters
  const lastFourCharacters: string[] = [];

  // Loop through our data
  for (let i = 0; i < dataAsCharacters.length; i++) {
    // Get the current character
    const currentCharacter = dataAsCharacters[i];

    // Add the current character to the last four characters
    lastFourCharacters.push(currentCharacter);

    // If we have more than 4 characters remove the first one
    if (lastFourCharacters.length > bufferSize) {
      lastFourCharacters.shift();
    }

    // If we have 4 characters check if they are all different
    if (
      lastFourCharacters.length === bufferSize &&
      new Set(lastFourCharacters).size === bufferSize
    ) {
      return i + 1;
    }
  }
}

(() => {
  // Read in the input
  const data = readInput('./day-6/input.txt');

  // Get the start of the buffer index
  const startOfBufferIndex = getStartOfBufferIndex(data, 4);

  console.log(startOfBufferIndex);

  // Get the start of the buffer index for part two
  const startOfBufferIndexPartTwo = getStartOfBufferIndex(data, 14);

  console.log(startOfBufferIndexPartTwo);
})();
