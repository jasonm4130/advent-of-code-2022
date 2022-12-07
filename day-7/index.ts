import { readInput } from '../common/readInput';

(() => {
  // Read input
  const input = readInput('day-7/input.txt');

  // Define our data structure
  const dirs = {} as Record<string, number>;

  // Path
  const parserPath = [] as string[];

  // Split the input into lines
  const lines = input.split('\n');

  // For each line
  for (const line of lines) {
    // Test if our line is numbers then whitespace then a file name
    const isFile = line.match(/^(\d+) (.*)$/);

    // If it is a file
    if (isFile) {
      // Define our path
      const path = [] as string[];

      // get the file size
      const fileSize = parseInt(isFile[1], 10);

      // Loop through the current path
      parserPath.forEach((dir) => {
        // Add the current dir to the path
        path.push(dir);

        // Initialize the current dir if it doesn't exist
        const dirTotal = dirs[path.join('/')] ?? 0;

        // Add the file size to the current dir
        dirs[path.join('/')] = dirTotal + fileSize;
      });
    }

    // If the line starts with $ cd
    if (line.startsWith('$ cd ')) {
      // Get the dir name
      const dir = line.replace('$ cd ', '');

      // If the dir is .. then pop the last dir
      if (dir === '..') {
        parserPath.pop();
      } else {
        // Otherwise push the dir
        parserPath.push(dir);
      }
    }
  }

  // Get all the dirs with a value of less than 100000 and sum their values
  const totalPart1 = Object.values(dirs)
    .filter((v) => v < 100000)
    .reduce((a, b) => a + b, 0);

  // Get the first dir with a value of 70000000 - the root dir + the current dir
  const totalPart2 = Object.values(dirs)
    .sort((a, b) => a - b)
    .find((dirSize) => 70000000 - dirs['/'] + dirSize >= 30000000);

  console.log('Part 1:', totalPart1);
  console.log('Part 2:', totalPart2);
})();
