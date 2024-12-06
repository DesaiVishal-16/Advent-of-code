/*
  Exanple :

7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9

Part 1: 
The levels are either all increasing or all decreasing.
Any two adjacent levels differ by at least one and at most three

7 6 4 2 1: Safe 
1 2 7 8 9: Unsafe 
9 7 6 2 1: Unsafe 
1 3 2 4 5: Unsafe 
8 6 4 4 1: Unsafe 
1 3 6 7 9: Safe

safte reports => 2 => answer
*/


const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("Error reading file", error);
    return;
  }


  const list = data.trim().split("\n").map(row => {
    const parsedRow = row.trim().split(/\s+/).map(Number);
    return parsedRow;
  });

  function isRowSafe(row) {
    if (!Array.isArray(row)) {
      console.error("Invalid row:", row);
      return false;
    }


    const isIncreasing = row.every((val, idx) =>
      idx === 0 || (val > row[idx - 1] && val - row[idx - 1] <= 3)
    ); 
    
    const isDecreasing = row.every((val, idx) =>
      idx === 0 || (val < row[idx - 1] && row[idx - 1] - val <= 3)
    )
    
    return isIncreasing || isDecreasing;
  }

  function checkSafeLevels(list) {
    let safeCount = 0;
    
    for (let row of list) {
      if (isRowSafe(row)) {
        safeCount++;
      }
    }
    
    return safeCount;
  }

  function checkSafeLevelsWithDampener(list) {
    let safeCount = 0;
    
    for (let row of list) {
      if (isRowSafe(row)) {
        safeCount++;
        continue;
      }
    
      for (let i = 0; i < row.length; i++) {
        const modifiedRow = [...row.slice(0, i), ...row.slice(i + 1)];
        
        if (isRowSafe(modifiedRow)) {
          safeCount++;
          break;
        }
      }
    }
    
    return safeCount;
  }

  console.log("Safe levels:", checkSafeLevels(list));
  console.log("Safe levels with dampener:", checkSafeLevelsWithDampener(list));
});
