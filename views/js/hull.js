var W = window.innerWidth;
var H = window.innerHeight;
var pts = [];
function setup() {
    createCanvas(W, H);
    pts = [];
};
class pt {
    constructor(val) {
        val = val.split(' ');
        this.x = parseInt(val[0]);
        this.y = parseInt(val[1]);
    }
};
class edge {
    constructor(pi, pj) {
        this.pi = pi;
        this.pj = pj;
    }
};
function draw() {
    if (mouseIsPressed && mouseY < 6 * H / 8) {
        let x = mouseX;
        let y = mouseY;
        fill(255, 255, 255);
        stroke(255, 255, 255);
        circle(x, y, 5);
        pts.push(`${x} ${y}`);
    }

}
window.onresize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    setup();
};
var c = document.querySelector('button').addEventListener('click', (e) => {
    background(0);
    var rmd = new Set(pts);
    pts = [...rmd];
    var tmp = [];
    pts.forEach(v => {
        tmp.push(new pt(v));
    });
    fill(255, 255, 255);
    stroke(255, 255, 255);
    tmp.forEach(v => {
        circle(v.x, v.y, 5);
    });
    if (tmp.length < 3) {
        return;
    }
    var n = tmp.length;
    var anticlock = (a, b, c) => {
        let val = (b.y - a.y) * (c.x - b.x);
        val -= (b.x - a.x) * (c.y - b.y);
        return (val > 0);
    }
    fill(0, 255, 0);
    stroke(0, 255, 0);
    let L = 0;
    for (let i = 1; i < n; i++) {
        if (tmp[i].x < tmp[L].x) {
            L = i;
        }
    }
    let cur = L;
    let next = -1;
    let delay = 7000 / n;
    var edges = [];
    var smart = (mycallback) => {
        setTimeout(() => {
            next = (cur + 1) % n;
            circle(tmp[cur].x, tmp[cur].y, 5);
            for (let i = 0; i < n; i++) {
                if (anticlock(tmp[cur], tmp[i], tmp[next])) {
                    next = i;
                }
            }
            edges.push(new edge(tmp[cur], tmp[next]));
            cur = next;
            if (cur != L) {
                smart(mycallback);
            } else {
                mycallback();
            }
        }, delay);
    }
    smart(() => {
        setTimeout(() => {
            fill(255, 0, 0);
            stroke(255, 0, 0);
            edges.forEach(v => {
                line(v.pi.x, v.pi.y, v.pj.x, v.pj.y);
            });
        }, 1000);
    });
});