/*
NOTE: Example

left    right
 3       4 
 4       3
 2       5
 1       3
 3       9
 3       3
 
 Part 1:
 smallest number in the left list to smallest number is right list  && second smallest in the left list to second smallest number 

left    right    distance
 1       3         2 
 2       3         1
 3       3         0
 3       4         1
 3       5         2
 4       9         5

then add up all distance = 11 => answer

Part 2: 
 calculate a total similarity score by adding up each number in the left list after multiplying it by the number of times that number appears in the right list
left  right  occur
 3     4     3 => 3 * 3 
 4     3     4 => 4 * 1
 2     5     2 => 2 * 0 
 1     3     1 => 1 * 0
 3     9     3 => 3 * 3
 3     3     3 => 3 * 3

 then add up times of occur total => 31 => answer

*/

const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const arr = data.trim().split("\n").map(row => 
    row.trim().split(/\s+/).map(Number)
  );
 
  const left = arr.map(row => row[0]).sort((a, b) => a - b);
  const right = arr.map(row => row[1]).sort((a, b) => a - b);
  
  //Part 1: 
  const sum = left.reduce((acc, val, i) => acc + Math.abs(right[i] - val), 0);

  console.log(sum);
  
  //Part 2:
  const similarityScore = left.reduce((score,leftNum)=> {
    const occur = right.filter((rightNum)=> rightNum === leftNum).length;

    return score + (leftNum * occur)
  },0)
  
  console.log(similarityScore)
});

