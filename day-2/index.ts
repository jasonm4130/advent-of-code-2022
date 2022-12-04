import fs from 'fs';
import path from 'path';

type KeyType = {
  A: number,
  B: number,
  C: number,
  X: number | string,
  Y: number | string,
  Z: number | string,
}

const PART_ONE_KEY = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3 // Scissors
}

const PART_TWO_KEY = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 'lose', // Lose
  Y: 'draw', // Draw
  Z: 'win' // Win
}

export function calculateOutcome({mine, opponent}: {mine: number, opponent: number}){
  if (mine === opponent) {
    return 'draw';
  }

  if (mine === 1 && opponent === 3 || mine === 2 && opponent === 1 || mine === 3 && opponent === 2) {
    return 'win';
  }

  return 'lose';
}

export function readInput(fileName: string, key: KeyType) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf-8').split(/\n/).map((line) => {
    const [opponent, alt] = line.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'];

    if (key === PART_ONE_KEY) {
      return {
        opponent: key[opponent],
        mine: key[alt],
      }
    }

    if (key === PART_TWO_KEY) {
      return {
        opponent: key[opponent],
        outcome: key[alt],
      }
    }

  });
}

export function calculateScore({opponent, mine}: {opponent: number, mine: number}) {
  let score = mine;
  if (calculateOutcome({mine, opponent}) === 'win') {
    score += 6
  }
  if (calculateOutcome({mine, opponent}) === 'draw') {
    score += 3;
  }
  return score;
}

export function calculateTotal(input: {opponent: number, mine: number}[]){
  return input.map((round) => calculateScore(round)).reduce((score, round) => score + round, 0);
}

export function getRoundPlayed({outcome, opponent}: {outcome: 'win' | 'lose' | 'draw', opponent: number}) {
  // Start with rock
  let mine = 1;

  // Loop through my possible plays until we reach the desired outcome of the round
  while (mine < 4) {
    // If we have the desired outcome break out of the loop
    if (calculateOutcome({opponent, mine}) === outcome) break;

    // Try the next option
    mine += 1;
  }

  return {opponent, mine};
}

(() => {
  // Get the data
  const data = readInput('input.txt', PART_ONE_KEY) as {opponent: number, mine: number}[];

  // Calculate the total
  const total = calculateTotal(data);

  // Display our score
  console.log(`the total of the scores is ${total}`);

  // Transform the data for part 2
  const partTwoData = readInput('input.txt', PART_TWO_KEY) as {opponent: number, outcome: 'lose' | 'win' | 'draw'}[];

  // Get the rounds played
  const rounds = partTwoData.map((round) => getRoundPlayed(round));

  // Calculate the total
  const partTwoTotal = calculateTotal(rounds);

  console.log(`the total for part two rounds is ${partTwoTotal}`)
})();