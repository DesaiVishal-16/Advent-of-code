/*
Examples: 

xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))

Only the four highlighted sections are real mul instructions.
Adding up the result of each instruction produces 161 (2*4 + 5*5 + 11*8 + 8*5).

*/

const str = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"

function removeExtra(str){
   const regex = /mul\((\d+),(\d+)\)/g ;   
    
   const matches = [...str.matchAll(regex)].map(match =>{
    const num1 = parseInt(match[1]);
    const num2 = parseInt(match[2]);
    return num1 * num2;
  });

  return matches;
}

const resArr = removeExtra(str)

console.log(resArr)

const res = resArr.reduce((acc,curr)=> acc * curr ,0)
console.log(res)


const fs = require('fs')

fs.readFile("input.txt","utf-8",(err,data)=>{
   if(err){
    console.log("Error for importing file",err)
    return;
  } 
  const regex = /mul\((\d+),(\d+)\)/g;
   
  const matches = [];
  let match;

  while((match = regex.exec(data)) !== null){
    const num1 = parseInt(match[1]);
    const num2 = parseInt(match[2]);

   matches.push(num1 * num2)
  }
  const res = matches.reduce((acc,curr)=> acc + curr,0)
  console.log(res)
})



