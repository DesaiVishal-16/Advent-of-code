const fs = require('fs');

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Converting input text to grid
    const grid = data.trim().split('\n').map(row => row.split(''));
    
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
    console.log(`Number of XMAS occurrences: ${findXmas(grid)}`);
});
