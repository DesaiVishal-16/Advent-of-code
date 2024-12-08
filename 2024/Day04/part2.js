/*

--- Part Two ---
The Elf looks quizzically at you. Did you misunderstand the assignment?

Looking for the instructions, you flip over the word search to find that this isn't actually an XMAS puzzle; it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:

M.S
.A.
M.S
Irrelevant characters have again been replaced with . in the above diagram. Within the X, each MAS can be written forwards or backwards.

Here's the same example from before, but this time all of the X-MASes have been kept instead:

.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
In this example, an X-MAS appears 9 times.

Flip the word search from the instructions back over to the word search side and try again. How many times does an X-MAS appear?

*/

const fs = require('fs');

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const grid = data.trim().split('\n').map(row => row.split(''));

    function countXMas(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        let count = 0;

        function isValidMAS(r, c, dr, dc) {
            const word1 = grid[r][c] + grid[r + dr][c + dc] + grid[r + 2 * dr][c + 2 * dc];
            const word2 = grid[r + 2 * dr][c + 2 * dc] + grid[r + dr][c + dc] + grid[r][c];
            return word1 === "MAS" || word1 === "SAM" || word2 === "MAS" || word2 === "SAM";
        }

        for (let r = 1; r < rows - 1; r++) {
            for (let c = 1; c < cols - 1; c++) {
                if (grid[r][c] === 'A') {
                    const topLeftToBottomRight = isValidMAS(r - 1, c - 1, 1, 1);
                    const topRightToBottomLeft = isValidMAS(r - 1, c + 1, 1, -1);

                    if (topLeftToBottomRight && topRightToBottomLeft) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    console.log(`Number of X-MAS occurrences: ${countXMas(grid)}`);
});
