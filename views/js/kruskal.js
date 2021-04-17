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
		if (adm[i][j] != 100000000 && i <= j) {
			edgesq.add({
				from: i,
				to: j,
				label: adm[i][j].toString(),
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
var krusedges = [];
class myedge {
	constructor(weight, from, to) {
		this.weight = weight;
		this.from = from;
		this.to = to;
	}
}
for (var i = 0; i < n; i++) {
	for (var j = 0; j < n; j++) {
		if (adm[i][j] != 100000000 && i <= j) {
			let k = new myedge(adm[i][j], i, j);
			krusedges.push(k);
		}
	}
}
krusedges.sort((x, y) => {
	if (x.weight < y.weight) {
		return -1;
	} else if (x.weight > y.weight) {
		return 1;
	}
	return 0;
});
var par = new Array(n);
for (var i = 0; i < n; i++) {
	par[i] = i;
}
var getp = (x) => {
	if (par[x] == x) {
		return x;
	}
	return (par[x] = getp(par[x]));
}
var merge = (u, v) => {
	par[u] = v;
}
var nodesa = new vis.DataSet([]);
var edgesa = new vis.DataSet([]);
for (var i = 0; i < n; i++) {
	nodesa.add({
		id: i,
		label: (i + 1).toString()
	});
}
for (var i = 0; i < krusedges.length; i++) {
	var x = krusedges[i].from;
	var y = krusedges[i].to;
	x = getp(x);
	y = getp(y);
	if (x != y) {
		edgesa.add({
			from: krusedges[i].from,
			to: krusedges[i].to,
			label: krusedges[i].weight.toString(),
		});
		merge(x, y);
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
var network = new vis.Network(answer, dataa, optionsa);