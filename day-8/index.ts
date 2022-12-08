/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import { readInput } from '../common/readInput';

export function getMatrix(input: string) {
  // Define our matrix
  const matrix = [] as number[][];

  // Split the input into lines
  const lines = input.split('\n');

  // For each line
  for (const line of lines) {
    // Split the line into numbers
    const numbers = line.split('').map((n) => parseInt(n, 10));

    // Push the numbers to the matrix
    matrix.push(numbers);
  }

  // Return the matrix
  return matrix;
}

export function isTreeVisible(matrix: number[][], x: number, y: number) {
  // Get the value at the current x and y
  const value = matrix[y][x];

  // If the tree is on the edge of the matrix then return true
  if (
    x === 0 ||
    x === matrix[0].length - 1 ||
    y === 0 ||
    y === matrix.length - 1
  ) {
    return true;
  }

  // Get the trees above the current tree (minus the current tree)
  const treesAbove = matrix.reduce((accumulator, row, index) => {
    if (index < y) {
      accumulator.push(row[x]);
    }
    return accumulator;
  }, [] as number[]);

  // Define our isVisible flag
  let isVisible = true;

  // If any of the trees above are taller or equal to the current tree then set isVisible to false
  treesAbove.forEach((tree) => {
    if (tree >= value) {
      isVisible = false;
    }
  });

  // If isVisible is true then return true
  if (isVisible) {
    return true;
  }

  // Get the trees below the current tree (minus the current tree)
  const treesBelow = matrix.reduce((accumulator, row, index) => {
    if (index > y) {
      accumulator.push(row[x]);
    }
    return accumulator;
  }, [] as number[]);

  // Define our isVisible flag
  isVisible = true;

  // If any of the trees below are taller or equal to the current tree then set isVisible to false
  treesBelow.forEach((tree) => {
    if (tree >= value) {
      isVisible = false;
    }
  });

  // If isVisible is true then return true
  if (isVisible) {
    return true;
  }

  // Get the trees to the left of the current tree (minus the current tree)
  const treesLeft = matrix[y].reduce((accumulator, tree, index) => {
    if (index < x) {
      accumulator.push(tree);
    }
    return accumulator;
  }, [] as number[]);

  // Define our isVisible flag
  isVisible = true;

  // If any of the trees to the left are taller or equal to the current tree then set isVisible to false
  treesLeft.forEach((tree) => {
    if (tree >= value) {
      isVisible = false;
    }
  });

  // If isVisible is true then return true
  if (isVisible) {
    return true;
  }

  // Get the trees to the right of the current tree (minus the current tree)
  const treesRight = matrix[y].reduce((accumulator, tree, index) => {
    if (index > x) {
      accumulator.push(tree);
    }
    return accumulator;
  }, [] as number[]);

  // Define our isVisible flag
  isVisible = true;

  // If any of the trees to the right are taller or equal to the current tree then set isVisible to false
  treesRight.forEach((tree) => {
    if (tree >= value) {
      isVisible = false;
    }
  });

  // If isVisible is true then return true
  if (isVisible) {
    return true;
  }

  // If the tree is not visible then return false
  return false;
}

export function getScenicScore(matrix: number[][], x: number, y: number) {
  // Get the value at the current x and y
  const value = matrix[y][x];

  // Define our trees above score
  let treesAboveScore = 0;

  // Loop through the trees above the current tree stopping when we reach a tree that is taller or equal to the current tree
  for (let i = y - 1; i >= 0; i--) {
    const tree = matrix[i][x];

    treesAboveScore++;
    if (tree >= value) {
      break;
    }
  }

  // Define our trees below score
  let treesBelowScore = 0;

  // Loop through the trees below the current tree stopping when we reach a tree that is taller or equal to the current tree
  for (let i = y + 1; i < matrix.length; i++) {
    const tree = matrix[i][x];

    treesBelowScore++;

    if (tree >= value) {
      break;
    }
  }

  // Define our trees to the left score
  let treesLeftScore = 0;

  // Loop through the trees to the left of the current tree stopping when we reach a tree that is taller or equal to the current tree
  for (let i = x - 1; i >= 0; i--) {
    const tree = matrix[y][i];

    treesLeftScore++;

    if (tree >= value) {
      break;
    }
  }

  // Define our trees to the right score
  let treesRightScore = 0;

  // Loop through the trees to the right of the current tree stopping when we reach a tree that is taller or equal to the current tree
  for (let i = x + 1; i < matrix[0].length; i++) {
    const tree = matrix[y][i];

    treesRightScore++;

    if (tree >= value) {
      break;
    }
  }

  // Return the trees multiplied together
  return treesAboveScore * treesBelowScore * treesLeftScore * treesRightScore;
}

export function getHighestScenicScore(matrix: number[][]) {
  // Define our scenic score array
  const scenicScores = [] as number[];

  // Loop through the rows of the matrix
  matrix.forEach((row, y) => {
    // Loop though the columns of the matrix
    row.forEach((_, x) => {
      // Get the scenic score
      const scenicScore = getScenicScore(matrix, x, y);

      // Push the scenic score to the scenic score array
      scenicScores.push(scenicScore);
    });
  });

  // Return the highest scenic score
  return scenicScores.sort((a, b) => b - a)[0];
}

(() => {
  // Read the input file
  const input = readInput('day-8/input.txt');

  // Get the matrix
  const matrix = getMatrix(input);

  // Define our visible matrix
  const visibleMatrix = [] as boolean[][];

  // Define our visible trees count
  let visibleTrees = 0;

  // Loop through the rows of the matrix
  matrix.forEach((row, y) => {
    // Define our visible row
    const visibleRow = [] as boolean[];

    // Loop through the columns of the matrix
    row.forEach((_, x) => {
      // If the tree is visible
      if (isTreeVisible(matrix, x, y)) {
        // Increment the visible trees count
        visibleTrees++;

        // Push true to the visible row
        visibleRow.push(true);
      } else {
        // Push false to the visible row
        visibleRow.push(false);
      }
    });

    // Push the visible row to the visible matrix
    visibleMatrix.push(visibleRow);
  });

  // Log the matrix
  console.log(matrix);

  // Log the visible matrix
  console.log(visibleMatrix);

  // Log the visible trees count
  console.log(visibleTrees);

  // Log the highest scenic score
  console.log(getHighestScenicScore(matrix));
})();
