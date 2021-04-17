function mytimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
window.onload = () => {
    var alreadyfilled = new Set();
    let sudoku = document.querySelector('#sudoku');
    sudoku.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        let cell = document.createElement('div');
        cell.style.backgroundColor = 'rgba(0,0,0,0.5)';
        cell.style.border = '0.05rem solid white';
        if (i % 3 == 0 && i % 9 != 0) {
            cell.style.borderLeft = '0.2rem solid white';
        }
        if ((Math.floor(i / 9)) % 3 == 0 && (Math.floor(i / 9)) != 0) {
            cell.style.borderTop = '0.2rem solid white';
        }
        cell.style.textAlign = 'center';
        cell.style.color = 'white';
        if (window.innerWidth < window.innerHeight) {
            cell.style.fontSize = '5vw';
        } else {
            cell.style.fontSize = '5vh';
        }
        sudoku.appendChild(cell);
        sudoku.style.border = '0.3rem solid white';
    }
    var mat = localStorage.getItem('mat');
    var board = new Array(9).fill('.').map(() => new Array(9).fill('.'));
    var idx = 0;
    mat = mat.split(',');
    var allcells = document.querySelectorAll('#sudoku div');
    mat.forEach((val) => {
        let r = Math.floor(idx / 9);
        let c = idx % 9;
        board[r][c] = val;
        if (val != '.') {
            allcells[idx].style.color = 'green';
            allcells[idx].innerHTML = val;
        }
        idx++;
    });
    setTimeout(() => {
        var canplace = async (row, col, number) => {
            for (let i = 0; i < 9; i++) {
                if (board[row][i] === number) {
                    return false;
                }
            }
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === number) {
                    return false;
                }
            }
            let sx = Math.floor(row / 3) * 3;
            let sy = Math.floor(col / 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[sx + i][sy + j] === number) {
                        return false;
                    }
                }
            }
            return true;
        }
        var draw = async (row, col, number) => {
            allcells[row * 9 + col].innerHTML = number;
        }
        var undraw = async (row, col) => {
            allcells[row * 9 + col].innerHTML = '';
        }
        var recur = async (row, col) => {
            if (row == 9 && col == 0) {
                return true;
            }
            if (col == 9) {
                return recur(row + 1, 0);
            }
            if (board[row][col] != '.') {
                return recur(row, col + 1);
            }
            for (let no = 49; no <= 57; no++) {
                let number = String.fromCharCode(no);
                let can = await canplace(row, col, number);
                if (can) {
                    board[row][col] = number;
                    await mytimeout(10);
                    await draw(row, col, number);
                    let cana = await recur(row, col + 1);
                    if (cana) {
                        return true;
                    }
                    await undraw(row, col);
                    board[row][col] = '.';
                }
            }
            return false;
        }
        recur(0, 0);
    }, 1000);

};
window.onresize = () => {
    let allcells = document.querySelectorAll('#sudoku div');
    allcells.forEach(cell => {
        if (window.innerWidth < window.innerHeight) {
            cell.style.fontSize = '5vw';
        } else {
            cell.style.fontSize = '5vh';
        }
    });
}