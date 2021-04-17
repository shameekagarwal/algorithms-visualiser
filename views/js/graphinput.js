var solvetype = () => {
    var n = document.getElementById("numberofnodes").value;
    var regex = /^[0-9]+$/;
    var message = document.getElementById("message");
    if (!n.match(regex)) {
        message.innerHTML = "Number Of Nodes Should Be a Number!";
        return 0;
    }
    n = parseInt(n);
    var e = document.getElementById("numberofedges").value;
    if (!e.match(regex)) {
        message.innerHTML = "Number Of Edges Should Be a Number!";
        return 0;
    }
    e = parseInt(e);
    var adjacencymatrix = document.getElementById("adjacencymatrix");
    var totaledges = adjacencymatrix.rows.length - 1;
    if (totaledges < e) {
        message.innerHTML = "Edges entered arent enough!";
        return 0;
    }
    if (totaledges > e) {
        message.innerHTML = "Edges entered are Too Much!";
        return 0;
    }
    var options = document.getElementsByName("options");
    var type = "kruskal";
    for (idx in options) {
        if (options[idx].checked) {
            type = options[idx].id;
        }
    }
    var matrix = new Array(n).fill(0).map(() => new Array(n).fill(100000000));
    var bidir = document.getElementById("bidir").checked;
    for (var i = 1, row; row = adjacencymatrix.rows[i]; i++) {
        var from = row.cells[0].firstChild.value;
        var to = row.cells[1].firstChild.value;
        var weight = row.cells[2].firstChild.value;
        if (!from.match(regex)) {
            message.innerHTML = "All Froms Should Be a Number!";
            return 0;
        }
        if (!to.match(regex)) {
            message.innerHTML = "All Tos Should Be a Number!";
            return 0;
        }
        if (!weight.match(regex)) {
            message.innerHTML = "All Weights Should Be a Number!";
            return 0;
        }
        from = parseInt(from);
        to = parseInt(to);
        weight = parseInt(weight);
        if (from < 1 || from > n) {
            message.innerHTML = "Froms Outof Bounds";
            return 0;
        }
        if (to < 1 || to > n) {
            message.innerHTML = "Tos Outof Bounds";
            return 0;
        }
        if (weight < 1 || weight > 10000000) {
            message.innerHTML = "Weights Outof Bounds!";
            return 0;
        }
        matrix[from - 1][to - 1] = weight;
        if (type == "kruskal" || bidir === true) {
            matrix[to - 1][from - 1] = weight;
        }
    }
    localStorage.setItem('matrix', matrix);
    localStorage.setItem('n', n);
    if (type === "kruskal") {
        window.location.href = "simulate/kruskal.html";
    }
    else if (type === "dijkstra") {
        var source = document.getElementById("source").value;
        if (!source.match(regex)) {
            message.innerHTML = "Source Node Should Be a Number!";
            return 0;
        }
        if (source < 1 || source > n) {
            message.innerHTML = "Source Should Be Between 1 To Number Of Nodes!";
            return 0;
        }
        localStorage.setItem('source', source);
        window.location.href = "simulate/dijkstra.html";
    }
}
var generate = () => {
    var n = document.getElementById("numberofnodes").value;
    var regex = /^[0-9]+$/;
    var message = document.getElementById("message");
    if (!n.match(regex)) {
        message.innerHTML = "Number Of Nodes Should Be a Number!";
        return 0;
    }
    n = parseInt(n);
    if (n < 1 || n > 30) {
        message.innerHTML = "Number Of Nodes Outof Bounds!";
        return 0;
    }
    var e = document.getElementById("numberofedges").value;
    var regex = /^[0-9]+$/;
    if (!e.match(regex)) {
        message.innerHTML = "Number Of Edges Should Be a Number!";
        return 0;
    }
    e = parseInt(e);
    if (e < 1 || e > 100) {
        message.innerHTML = "Number Of Edges Outof Bounds!";
        return 0;
    }
    var adjacencymatrix = document.getElementById("adjacencymatrix");
    while (adjacencymatrix.firstChild) {
        adjacencymatrix.firstChild.remove();
    }
    var tablehead = document.createElement("thead");
    tablehead.classList.add("thead-dark");
    var tablebody = document.createElement("tbody");
    var tableheadrow = document.createElement("tr");
    var header = ["FROM", "TO", "WEIGHT"];
    for (var i = 0; i < 3; i++) {
        var tableheadcell = document.createElement("th");
        var textnode = document.createTextNode(header[i]);
        tableheadcell.appendChild(textnode);
        tableheadrow.appendChild(tableheadcell);
    }
    tablehead.appendChild(tableheadrow);
    adjacencymatrix.appendChild(tablehead);
    for (var i = 0; i < e; i++) {
        var tablerow = document.createElement("tr");
        var textnodea = document.createElement("input");
        textnodea.setAttribute("type", "text");
        var textnodeb = document.createElement("input");
        textnodeb.setAttribute("type", "text");
        var textnodec = document.createElement("input");
        textnodec.setAttribute("type", "text");
        textnodea.classList.add("col-8");
        textnodeb.classList.add("col-8");
        textnodec.classList.add("col-8");
        textnodea.value = 1 + Math.round(Math.random() * (n - 1));
        textnodeb.value = 1 + Math.round(Math.random() * (n - 1));
        textnodec.value = 1 + Math.round(Math.random() * 10);;
        var tablecella = document.createElement("td");
        var tablecellb = document.createElement("td");
        var tablecellc = document.createElement("td");
        tablecella.appendChild(textnodea);
        tablecellb.appendChild(textnodeb);
        tablecellc.appendChild(textnodec);
        tablerow.appendChild(tablecella);
        tablerow.appendChild(tablecellb);
        tablerow.appendChild(tablecellc);
        tablebody.appendChild(tablerow);
    }
    adjacencymatrix.appendChild(tablebody);
    message.innerHTML = "Table Generated!";
}
var resetradio = () => {
    document.getElementById("kruskal").checked = true;
    document.getElementById("dijkstra").checked = false;
}