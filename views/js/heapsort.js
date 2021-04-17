var arr = localStorage.getItem('arr');
arr = arr.split(",");
var temp = [];
var seen = [];
var len = arr.length;
var done = false;
var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var canvaswidth = canvas.width;
var canvasheight = canvas.height;
var ctx = canvas.getContext("2d");
caption = () => {
    ctx.fillStyle = "#00ff00";
    ctx.font = "20px Georgia";
    ctx.fillText("Bubbling Down ( Heapify )", 50, (2 * canvasheight) / 3);
    ctx.fillStyle = "#ebde34";
    ctx.font = "20px Georgia";
    ctx.fillText("Elements At Correct Positions", 50, (2 * canvasheight) / 3 + 50);
}
for (let i = 0; i < len; i++) {
    arr[i] = parseInt(arr[i]);
    temp.push(parseInt(0));
    seen.push(parseInt(0));
}
var mx = 0;
for (idx in arr) {
    mx = Math.max(arr[idx], mx);
}
var barheight = canvasheight / (4 * mx);
var barwidth = canvaswidth / (3 * len);
var xoffset = canvaswidth / 6;
draw = () => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvaswidth, canvasheight);
    caption();
    for (let i = 0; i < len; i++) {
        if (seen[i]) {
            ctx.fillStyle = "#ebde34";
        } else if (temp[i]) {
            ctx.fillStyle = "#00ff00";
        } else {
            ctx.fillStyle = "#ff0000";
        }
        let curheight = arr[i] * barheight;
        let fromy = (canvasheight / 2) - curheight;
        let fromx = (2 * i * barwidth) + xoffset;
        ctx.fillRect(fromx, fromy, barwidth, curheight);
    }
}
finaldraw = () => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvaswidth, canvasheight);
    caption();
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < len; i++) {
        let curheight = arr[i] * barheight;
        let fromy = (canvasheight / 2) - curheight;
        let fromx = (2 * i * barwidth) + xoffset;
        ctx.fillRect(fromx, fromy, barwidth, curheight);
    }
}
cleartemp = () => {
    for (let i = 0; i < len; i++) {
        temp[i] = 0;
    }
}
function mytimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
heapify = async (n, i) => {
    let largest = i;
    temp[i] = 1;
    await draw(); if (len < 100) {
        await mytimeout(500);
    } else {
        await mytimeout(10);
    }
    let L = (2 * i) + 1;
    let R = (2 * i) + 2;
    if (L < n && arr[L] > arr[largest]) {
        largest = L;
    }
    if (R < n && arr[R] > arr[largest]) {
        largest = R;
    }
    if (largest != i) {
        let temp = arr[largest];
        arr[largest] = arr[i];
        arr[i] = temp;
        await heapify(n, largest);
    }
}
const heapsort = async () => {
    for (let i = Math.floor(len / 2) - 1; i > -1; i--) {
        await heapify(len, i);
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(10);
        }
        await cleartemp();
    }
    for (let i = len - 1; i > 0; i--) {
        let temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp;
        seen[i] = 1;
        await draw();
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(10);
        }
        await heapify(i, 0);
        await cleartemp();
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(10);
        }
        await draw();
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(10);
        }
    }
}
const performer = async () => {
    await heapsort(0, len - 1);
    done = true;
    await mytimeout(2000);
    await finaldraw();
}
window.addEventListener("resize", () => {
    canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    canvaswidth = canvas.width;
    canvasheight = canvas.height;
    barheight = canvasheight / (4 * mx);
    barwidth = canvaswidth / (3 * len);
    xoffset = canvaswidth / 6;
    if (done === true) {
        finaldraw();
    }
});
performer();