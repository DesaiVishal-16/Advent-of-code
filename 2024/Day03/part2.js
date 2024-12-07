/*

 There are two new instructions you'll need to handle:
The do() instruction enables future mul instructions.
The don't() instruction disables future mul instructions.
Only the most recent do() or don't() instruction applies. At the beginning of the program, mul instructions are enabled.

For example:

xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
This corrupted memory is similar to the example from before, but this time the mul(5,5) and mul(11,8) instructions are disabled because there is a don't() instruction before them. The other mul instructions function normally, including the one at the end that gets re-enabled by a do() instruction.

This time, the sum of the results is 48 (2*4 + 8*5).
 
*/

const fs = require('fs');

fs.readFile("input.txt", "utf-8", (err, data) => {
  if(err){
    console.log("Error importing file", err);
    return;   }
  
  let mulEnabled = true;
  let results = [];
  
  const matches = data.match(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g) || [];
  
  for (const fullMatch of matches) {
    if (fullMatch === 'do()') {
      mulEnabled = true;
    } else if (fullMatch === 'don\'t()') {
      mulEnabled = false;
    } else if (mulEnabled) {
      const [num1, num2] = fullMatch.match(/\d+/g).map(Number);
      results.push(num1 * num2);
    }
  }
   
  const finalSum = results.reduce((acc, curr) => acc + curr, 0);
  console.log(finalSum);
});
