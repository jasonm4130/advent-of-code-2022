import { readInput } from "../common/readInput";

export function transformData(data: string) {
  // Get each line of data
  return data.split(/\n/).map((line) => {
    // Split the line at the ,
    const [sectionAssignmentA, sectionAssignmentB] = line.split(',');

    // For each of the section assignments, split the string at the - create an array with all numbers between the two numbers
    const [sectionA, sectionB] = [sectionAssignmentA.split('-'), sectionAssignmentB.split('-')].map((section) => {
      const [start, end] = section.map((number) => parseInt(number, 10));
      return Array.from({length: end - start + 1}, (_, i) => start + i);
    });

    // Return the two sections
    return {sectionA, sectionB};
  });
}

export function isContainedCompletely(data: {sectionA: number[], sectionB: number[]}[]) {
  return data.map(({sectionA, sectionB}) => {
    // If the first section is completely contained in the second section return true
    if (sectionA.every((number) => sectionB.includes(number))) return true;

    // If the second section is completely contained in the first section return true
    if (sectionB.every((number) => sectionA.includes(number))) return true;

    // Otherwise return false
    return false;
  });
}

// Function to return if the two sections overlap
export function isOverlapping(data: {sectionA: number[], sectionB: number[]}[]) {
  return data.map(({sectionA, sectionB}) => {
    // If section A contains any of the numbers in section B return true
    if (sectionA.some((number) => sectionB.includes(number))) return true;

    // Return false
    return false;
  });
}

 (() => {
  // Read in the input data
  const data = readInput('./day-4/input.txt');

  // Transform the data
  const transformedData = transformData(data);

  // Get the number of items that are contained completely
  const containedCompletely = isContainedCompletely(transformedData).filter((item) => item).length;

  // Log the number of sections that are contained completely
  console.log(`There are ${containedCompletely} sections that are contained completely`);

  // Get the number of items that are overlapping
  const overlapping = isOverlapping(transformedData).filter((item) => item).length;

  // Log the number of sections that are overlapping
  console.log(`There are ${overlapping} sections that are overlapping`);
 })()