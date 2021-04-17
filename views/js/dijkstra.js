var matrix = localStorage.getItem('matrix');
var n = localStorage.getItem('n');
var source = localStorage.getItem('source');
n = parseInt(n);
source = parseInt(source);
source -= 1;
var adm = new Array(n).fill(0).map(() => new Array(n).fill(100000000));
matrix = matrix.split(',');
for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        adm[i][j] = parseInt(matrix[(i * n) + j]);
    }
}
var question = document.getElementById("question");
var nodesq = new vis.DataSet([]);
var edgesq = new vis.DataSet([]);
for (var i = 0; i < n; i++) {
    nodesq.add({
        id: i,
        label: (i + 1).toString()
    });
};
for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        if (adm[i][j] != 100000000 && adm[j][i] != 100000000) {
            edgesq.add({
                from: i,
                to: j,
                label: adm[i][j].toString(),
                arrows: "to",
                smooth: {
                    type: "curvedCW",
                    roundness: 0.3
                }
            });
        }
        else if (adm[i][j] != 100000000) {
            edgesq.add({
                from: i,
                to: j,
                label: adm[i][j].toString(),
                arrows: "to"
            });
        }
    }
}
var optionsq = {
    edges: {
        font: {
            color: '#ffffff',
            strokeWidth: 0
        }
    },
    physics: {
        enabled: false,
    }
};
var dataq = {
    nodes: nodesq,
    edges: edgesq
};
var network = new vis.Network(question, dataq, optionsq);
var answer = document.getElementById("answer");
var distance = new Array(n).fill(100000000);
var visited = new Array(n).fill(false);
distance[source] = 0;
var getminimum = () => {
    var value = -1;
    var weight = 100000000;
    for (var i = 0; i < n; i++) {
        if (distance[i] < weight && visited[i] === false) {
            weight = distance[i];
            value = i;
        }
    }
    return value;
}
for (var i = 0; i < n; i++) {
    var nextmin = getminimum();
    visited[nextmin] = true;
    if (nextmin === -1) {
        break;
    }
    for (var j = 0; j < n; j++) {
        if (distance[nextmin] + adm[nextmin][j] < distance[j]) {
            distance[j] = distance[nextmin] + adm[nextmin][j];
        }
    }
}
var nodesa = new vis.DataSet([]);
var edgesa = new vis.DataSet([]);
for (var i = 0; i < n; i++) {
    if (distance[i] != 100000000) {
        nodesa.add({
            id: i,
            label: (i + 1).toString()
        });
        if (distance[i] != 0) {
            edgesa.add({
                from: source,
                to: i,
                label: distance[i].toString(),
                arrows: "to"
            })
        }
    }
}
var optionsa = {
    edges: {
        font: {
            color: '#ffffff',
            strokeWidth: 0
        }
    },
    physics: {
        enabled: false,
    }
};
var dataa = {
    nodes: nodesa,
    edges: edgesa
};
var network2 = new vis.Network(answer, dataa, optionsa);