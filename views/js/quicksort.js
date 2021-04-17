var arr = localStorage.getItem('arr');
arr = arr.split(",");
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
    ctx.fillText("Elements Smaller Than Pivot", 50, (2 * canvasheight) / 3);
    ctx.fillStyle = "#311394"
    ctx.font = "20px Georgia";
    ctx.fillText("The Pivot ( Last Element ) ", 50, (2 * canvasheight) / 3 + 50);
    ctx.fillStyle = "#ebde34";
    ctx.font = "20px Georgia";
    ctx.fillText("Elements At Correct Positions", 50, (2 * canvasheight) / 3 + 100);
}
for (let i = 0; i < len; i++) {
    arr[i] = parseInt(arr[i]);
    seen.push(parseInt(0));
}
var mx = 0;
for (idx in arr) {
    mx = Math.max(arr[idx], mx);
}
var barheight = canvasheight / (4 * mx);
var barwidth = canvaswidth / (3 * len);
var xoffset = canvaswidth / 6;
draw = (s, win, e) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvaswidth, canvasheight);
    caption();
    for (let i = 0; i < len; i++) {
        let curheight = arr[i] * barheight;
        let fromy = (canvasheight / 2) - curheight;
        let fromx = (2 * i * barwidth) + xoffset;
        if (seen[i]) {
            ctx.fillStyle = "#ebde34";
        } else if (i >= s && i <= win) {
            ctx.fillStyle = "#00ff00";
        } else if (i == e) {
            ctx.fillStyle = "#311394";
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
function mytimeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
partition = async (s, e) => {
    let win = s - 1;
    let p = arr[e];
    for (let i = s; i <= e - 1; i++) {
        if (p > arr[i]) {
            win++;
            let temp = arr[i];
            arr[i] = arr[win];
            arr[win] = temp;
            await draw(s, win, e);
            if (len < 100) {
                await mytimeout(750);
            } else {
                await mytimeout(10);
            }
        }
    } if (len < 100) {
        await mytimeout(750);
    } else {
        await mytimeout(10);
    }
    win++;
    let temp = arr[e];
    arr[e] = arr[win];
    arr[win] = temp;
    await draw(s, win - 1, win); if (len < 100) {
        await mytimeout(1000);
    } else {
        await mytimeout(10);
    }
    return win;
}
const quicksort = async (s, e) => {
    if (s < e) {
        let p = await partition(s, e);
        seen[p] = 1;
        await draw(-1, -1, -1);
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(10);
        }
        await quicksort(s, p - 1);
        await quicksort(p + 1, e);
    }
    else if (s == e) {
        seen[s] = 1;
        await draw();
        if (len < 100) {
            await mytimeout(1000);
        } else {
            await mytimeout(10);
        }
    }
}
const performer = async () => {
    await quicksort(0, len - 1);
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