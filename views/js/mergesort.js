var arr = localStorage.getItem('arr');
arr = arr.split(",");
var temp = [];
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
    ctx.fillText("Before Merging", 50, (2 * canvasheight) / 3);
    ctx.fillStyle = "#ebde34";
    ctx.font = "20px Georgia";
    ctx.fillText("After Merging", 50, (2 * canvasheight) / 3 + 50);
}
for (let i = 0; i < len; i++) {
    arr[i] = parseInt(arr[i]);
    temp.push(parseInt(0));
}
var mx = 0;
for (idx in arr) {
    mx = Math.max(arr[idx], mx);
}
var barheight = canvasheight / (4 * mx);
var barwidth = canvaswidth / (3 * len);
var xoffset = canvaswidth / 6;
draw = (s, e, color) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvaswidth, canvasheight);
    caption();
    for (let i = 0; i < len; i++) {
        let curheight = arr[i] * barheight;
        let fromy = (canvasheight / 2) - curheight;
        let fromx = (2 * i * barwidth) + xoffset;
        if (i >= s && i <= e) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = "#ff0000";
        }
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
merge = (s, e) => {
    let m = parseInt((s + e) / 2);
    let p1 = s;
    let p2 = m + 1;
    let n1 = m;
    let n2 = e;
    let idx = s;
    while (p1 <= n1 && p2 <= n2) {
        if (arr[p1] <= arr[p2]) {
            temp[idx++] = arr[p1++];
        }
        else {
            temp[idx++] = arr[p2++];
        }
    }
    while (p1 <= n1) {
        temp[idx++] = arr[p1++];
    }
    while (p2 <= n2) {
        temp[idx++] = arr[p2++];
    }
    idx = s
    while (idx <= e) {
        arr[idx] = temp[idx++];
    }
}
function mytimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const mergesort = async (s, e) => {
    if (s < e) {
        let m = parseInt((s + e) / 2);
        await mergesort(s, m);
        await mergesort(m + 1, e);
        await draw(s, e, "#00ff00");
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(50);
        }
        await merge(s, e);
        await draw(s, e, "#ebde34");
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(50);
        }
        await draw(-1, -1, "#ebde34");
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(50);
        }
    }
}
const performer = async () => {
    await mergesort(0, len - 1);
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
        finaldraw("rgba(0,0,255,0.6)");
    }
});
performer();