import { readInput } from "../common/readInput";

// Function that gets then stack for the current input
const getStack = (input: string) => {
  // Get the lines before the first blank line
  const lines = input.split(/\n/).slice(0, input.split(/\n/).indexOf(''));

  // Get each line as an array of characters
  const characters = lines.map((line) => line.split(''));

  // Get the last line as information about the stack
  const stackColumns = characters.at(-1)?.map((character, index) => {
    if (parseInt(character, 10)) {
      return {
        column: parseInt(character, 10),
        index,
      }
    }

    return null;
  })?.filter((column) => column !== null);

  // Get the stack
  const stack = stackColumns?.map((column) => {
    // Get each character at the column index (excluding the last line)
    return lines.slice(0, -1).map((line) => line[column!.index]).filter((character) => !!character && character !== ' ');
  });

  // Return the stack
  return stack;
}

export function getMovements(input: string) {
  // Get the lines after the first blank line
  const lines = input.split(/\n/).slice(input.split(/\n/).indexOf('') + 1);

  // For each of the lines, get the movement
  return lines.map((line) => {
    // Get the number of containers to move
    const numContainersToMove = parseInt(line.match(/move (.*) from/) ? line.match(/move (.*) from/)![1] : '0', 10);

    // Get the column to move from (use a zero index)
    const fromColumn = parseInt(line.match(/from (.*) to/) ? line.match(/from (.*) to/)![1] : '0', 10) - 1;

    // Get the column to move to (use a zero index)
    const toColumn = parseInt(line.match(/to (.*)/) ? line.match(/to (.*)/)![1] : '0', 10) - 1;

    // Return the movement
    return {
      numContainersToMove,
      fromColumn,
      toColumn,
    };
  });
}

export function moveFromStack(stack: string[][], {numContainersToMove, fromColumn, toColumn}: {numContainersToMove: number, fromColumn: number, toColumn: number}) {
  // Get the containers to move from the start of the array
  const containersToMove = stack[fromColumn].slice(0, numContainersToMove);

  // For each container
  containersToMove.forEach((container) => {
    // Remove the container from the stack
    stack[fromColumn].splice(0, 1);

    // Add the container to the top of the stack (the start of the array)
    stack[toColumn] = [container, ...stack[toColumn]];
  });

  // Return the stack
  return stack;
}

export function moveCratesInOrder(stack: string[][], {numContainersToMove, fromColumn, toColumn}: {numContainersToMove: number, fromColumn: number, toColumn: number}) {
  // Get the containers to move from the start of the array
  const containersToMove = stack[fromColumn].slice(0, numContainersToMove);

  // Remove the containers from the stack
  stack[fromColumn].splice(0, numContainersToMove);

  // Add the containers to the top of the stack (the start of the array)
  stack[toColumn] = [...containersToMove, ...stack[toColumn]];

  // Return the stack
  return stack;
}

export function getCratesAtTopOfStack(stack: string[][]) {
  // Get the crates at the top of the stack
  return stack.map((column) => column.at(0)).join('');
}

(() => {
  // Read in the input
  const input = readInput("./day-5/input.txt");

  // Get the stack
  const stack = getStack(input) as string[][];

  // Get the movements
  const movements = getMovements(input);

  // Move the containers
  const finalStack = movements.reduce((stack, movement) => moveFromStack(stack, movement), stack);

  // Get the crates at the top of the stack
  const cratesAtTopOfStack = getCratesAtTopOfStack(finalStack);

  // Log the answer
  console.log(cratesAtTopOfStack);

  // get the part two stack
  const stackPartTwo = getStack(input) as string[][];

  // Get the part two final stack
  const finalStackPartTwo = movements.reduce((stack, movement) => moveCratesInOrder(stack, movement), stackPartTwo);

  // Get the crates at the top of the stack
  const cratesAtTopOfStackPartTwo = getCratesAtTopOfStack(finalStackPartTwo);

  // Log the answer
  console.log(cratesAtTopOfStackPartTwo);
})()