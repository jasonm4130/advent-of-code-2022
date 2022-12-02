import fs from 'fs';
import path from 'path';

const KEY = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3 // Scissors
}

export function readInput(fileName: string) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf-8').split(/\n/).map((line) => {
    const [opponent, mine] = line.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'];
    return {
      opponent: KEY[opponent],
      mine: KEY[mine],
    }
  });
}

export function calculateScore({opponent, mine}: {opponent: number, mine: number}) {
  let score = mine;
  if (mine > opponent) {
    score += 6
  }
  if (mine === opponent) {
    score += 3;
  }
  return score;
}

export function calculateTotal(input: {opponent: number, mine: number}[]){
  return input.map((round) => calculateScore(round)).reduce((score, round) => score + round, 0);
}

(() => {
  // Get the data
  const data = readInput('input.txt');

  console.log(calculateScore(data[0]))

  // Calculate the total
  const total = calculateTotal(data);

  console.log(`the total of the scores is ${total}`);
})();