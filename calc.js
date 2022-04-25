let result;
const resDisplay = document.getElementById("result");
const opDisplay = document.getElementById("operator");
const display = document.getElementById("display");
let currSum = 0;
let operator;
let alrDot = false;
let currNum;
let isThereOperator = false;
let num;
let first = true;
const setdisplay = (str) => {
    let display = document.getElementById("display");
    if (display.innerHTML.charAt(0) == 0) {
        display.innerHTML = str;
    } else {
        display.innerHTML += str;
    }
}

const setResult = () => {
    if (document.getElementById("display").innerHTML.includes("=")) {
        document.getElementById("display").innerHTML = 0;
        document.getElementById("result").innerHTML = 0;
    }
    const val = event.target.innerHTML;
    if (val === "." && !alrDot) {
        resDisplay.innerHTML += event.target.innerHTML;
        alrDot = true;
        setdisplay(val);
    } else if (val != ".") {
        resDisplay.innerHTML = Number(resDisplay.innerHTML + event.target.innerHTML);
        setdisplay(val);
    }
}

const setOperator = () => {
    if (display.innerHTML.includes("=")) {
        display.innerHTML = currSum;
        isThereOperator = false;
    }
    if (!isThereOperator) {
        isThereOperator = true;
    } else {
        currSum = calc(currSum, Number(resDisplay.innerHTML), operator);
    }
    setdisplay(event.target.innerHTML);
    opDisplay.innerHTML = event.target.innerHTML;
    operator = event.target.innerHTML;
    if (first) {
        currSum = Number(resDisplay.innerHTML);
        first = false;
    } else {
        num = Number(resDisplay.innerHTML);
    }
    resDisplay.innerHTML = "";
    sum += calc(sum, currNum, operator);
}



const showSum = () => {
    if (!document.getElementById("display").innerHTML.includes("=")) {
        setdisplay("=");
        if (currNum == undefined)
            currNum = resDisplay.innerHTML;
        currSum = calc(currSum, Number(resDisplay.innerHTML), operator);
        setdisplay(currSum);
        resDisplay.innerHTML = currSum;
        opDisplay.innerHTML = "";
    }
}

const clickDel = () => {
    let r = document.getElementById("result");
    if (r.innerHTML.length > 0 && r.innerHTML != 0) {
        let k = document.getElementById("display");
        r.innerHTML.length == 1 ? r.innerHTML = 0 : r.innerHTML = deletechar(r.innerHTML);
        k.innerHTML.length == 1 ? k.innerHTML = 0 : k.innerHTML = deletechar(k.innerHTML);
    }
}

const deletechar = (str) => {
    str = str.substring(0, str.length - 1);
    return str;
}
const calc = (a, b, op) => {
    axios.get('/calculator/calc', {
            params: {
                a: a,
                b: b,
                op: op,
            },
        })
        .then(function(res) {
            console.log(res.data);
            var s = Number(res.data);
            return s;
        })
        .catch(function(error) {
            console.log(error);
        });
}

const restart = () => {
    document.getElementById("result").innerHTML = "0";
    document.getElementById("display").innerHTML = "0";
    opDisplay.innerHTML = "";
    sum = 0;
    operator = "";
    alrDot = false;
    currSum = 0;
    firstTime = true;
    isThereOperator = false;
    first = true;
}

const deleteNum = () => {
    let i = document.getElementById("display").innerHTML;
    if (!i.includes("=")) {
        leng = document.getElementById("display").innerHTML.length;
        len = resDisplay.innerHTML.length;
        till = leng - len;
        document.getElementById("display").innerHTML = i.substring(0, till);
        resDisplay.innerHTML = "";
    }
}