var sorttype = () => {
    var n = document.getElementById("numberofelements").value;
    var regex = /^[0-9]+$/;
    var message = document.getElementById("message");
    if (!n.match(regex)) {
        message.innerHTML = "Number Of Elements Should Be a Number!";
        return 0;
    }
    n = parseInt(n);
    var arr = document.getElementById("arr").value;
    arr = arr.split(", ");
    if (arr.length < n) {
        message.innerHTML = "Elements Entered Aren't Enough!";
        return 0;
    }
    if (arr.length > n) {
        message.innerHTML = "Elements Entered Are Too Much!";
        return 0;
    }
    for (idx in arr) {
        if (!arr[idx].match(regex)) {
            message.innerHTML = "All Elements Should Be a Number!";
            return 0;
        }
        if (arr[idx] < 1 || arr[idx] > 10000000) {
            message.innerHTML = "Elements Outof Bounds!";
            return 0;
        }
    }
    var options = document.getElementsByName("options");
    var type = "mergesort";
    for (idx in options) {
        if (options[idx].checked) {
            type = options[idx].id;
        }
    }
    localStorage.setItem('arr', arr);
    if (type == "mergesort") {
        window.location.href = "simulate/mergesort.html";
    }
    else if (type == "quicksort") {

        window.location.href = "simulate/quicksort.html";
    }
    else if (type == "heapsort") {
        window.location.href = "simulate/heapsort.html";
    }
}
var generate = () => {
    var n = document.getElementById("numberofelements").value;
    var regex = /^[0-9]+$/;
    var message = document.getElementById("message");
    if (!n.match(regex)) {
        message.innerHTML = "Number Of Elements Should Be a Number!";
        return 0;
    }
    n = parseInt(n);
    if (n < 1 || n > 2000) {
        message.innerHTML = "Number Of Elements Outof Bounds!";
        return 0;
    }
    let val = "";
    for (let i = 0; i < n; i++) {
        val += (Math.round(Math.random() * 500));
        if (i !== n - 1) {
            val += ", ";
        }
    }
    var arr = document.getElementById("arr");
    arr.value = val;
    message.innerHTML = "Random Numbers Generated!";
}
var resetradio = () => {
    document.getElementById("mergesort").checked = true;
    document.getElementById("quicksort").checked = false;
    document.getElementById("heapsort").checked = false;
}