window.onload = () => {
    let sudoku = document.querySelector('#sudoku');
    sudoku.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        let cell = document.createElement('div');
        cell.style.backgroundColor = 'rgba(0,0,0,0.3)';
        cell.style.border = '0.05rem solid black';
        cell.style.fontWeight = 'bolder';
        if (i % 3 == 0 && i % 9 != 0) {
            cell.style.borderLeft = '0.2rem solid black';
        }
        if ((Math.floor(i / 9)) % 3 == 0 && (Math.floor(i / 9)) != 0) {
            cell.style.borderTop = '0.2rem solid black';
        }
        cell.contentEditable = true;
        cell.style.textAlign = 'center';
        if (window.innerWidth < window.innerHeight) {
            cell.style.fontSize = '5vw';
        } else {
            cell.style.fontSize = '5vh';
        }
        sudoku.appendChild(cell);
        sudoku.style.border = '0.3rem solid black';
    }
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
var solve = () => {
    let allcells = document.querySelectorAll('#sudoku div');
    let idx = 0;
    var mat = new Array(9).fill('.').map(() => new Array(9).fill('.'));
    let done = 1;
    allcells.forEach(cell => {
        let r = Math.floor(idx / 9);
        let c = idx % 9;
        mat[r][c] = cell.textContent;
        let regex = /^[0-9]+$/;
        let n = mat[r][c];
        if (n != '') {
            let message = document.getElementById("message");
            if (!n.match(regex) || parseInt(n) > 9 || parseInt(n) < 1) {
                message.innerHTML = "Each Cell Should Be A number Between 1 to 9!";
                done = 0;
                return 0;
            }
        } else {
            mat[r][c] = '.';
        }
        idx++;
    });
    if (done) {
        localStorage.setItem('mat', mat);
        window.location.href = './simulate/sudo.html';
    }
}