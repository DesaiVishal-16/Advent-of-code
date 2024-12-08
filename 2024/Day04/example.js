/*
This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:


..X...
.SAMX.
.A..A.
XMAS.S
.X....
The actual word search will be full of letters instead. For example:

MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:

....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX

*/

function findXmas(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    
    // All 8 possible directions (horizontal, vertical, diagonal)
    const directions = [
        [0, 1],   // right
        [0, -1],  // left
        [1, 0],   // down
        [-1, 0],  // up
        [1, 1],   // down-right
        [1, -1],  // down-left
        [-1, 1],  // up-right
        [-1, -1]  // up-left
    ];
    
    function isValid(r, c) {
        return r >= 0 && r < rows && c >= 0 && c < cols;
    }
    
    function findWordAtPosition(r, c, dr, dc) {
        const word = "XMAS";
        for (let i = 0; i < word.length; i++) {
            const currR = r + i * dr;
            const currC = c + i * dc;
            
            if (!isValid(currR, currC) || grid[currR][currC] !== word[i]) {
                return false;
            }
        }
        return true;
    }
    
    let xmasCount = 0;
    
    // Checking every possible starting position and direction
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            for (const [dr, dc] of directions) {
                if (findWordAtPosition(r, c, dr, dc)) {
                    xmasCount++;
                }
            }
        }
    }
    
    return xmasCount;
}

const grid = [
    "MMMSXXMASM".split(''),
    "MSAMXMSMSA".split(''),
    "AMXSXMAAMM".split(''),
    "MSAMASMSMX".split(''),
    "XMASAMXAMM".split(''),
    "XXAMMXXAMA".split(''),
    "SMSMSASXSS".split(''),
    "SAXAMASAAA".split(''),
    "MAMMMXMMMM".split(''),
    "MXMXAXMASX".split('')
];

console.log(`Number of XMAS occurrences: ${findXmas(grid)}`);
