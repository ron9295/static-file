const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.sendFile('index.html');
})

app.get('/calculator', (req, res) => {
    return res.sendFile(path.join(__dirname, './public/calculator.html'));
})
app.get('/imgYoram', (req, res) => {
    return res.sendFile(path.join(__dirname, './public/imgYoram.html'));
})

// app.get(('/calculator/calc'), (req, res) => {
//         let sum = 0;
//         switch (req.query.op) {
//             case "+":
//                 sum = Number(req.query.a) + Number(req.query.b);
//                 break;
//             case "-":
//                 sum = Number(req.query.a) - Number(req.query.b);
//                 break;
//             case "*":
//                 sum = Number(req.query.a) * Number(req.query.b);
//                 break;
//             case "/":
//                 req.query.b === 0 ? sum = "ERROR" : sum = Number(req.query.a) / Number(req.query.b);
//                 break;
//             default:
//                 sum = req.query.a;
//         }
//         console.log(sum);
//         console.log(req.query.a);
//         console.log(req.query.b);
//         return res.send(sum);
//     })
app.get(('/calculator/calc'), (req, res) => {
    let sum = 0;
    let a = Number(req.query.a);
    let b = Number(req.query.b)
    switch (req.query.op) {
        case "+":
            sum = a + b;
            break;
        case "-":
            sum = a - b;
            break;
        case "*":
            sum = a * b;
            break;
        case "/":
            b === 0 ? sum = "ERROR" : sum = a / b;
            break;
        default:
            sum = req.query.a;
    }
    console.log(sum);
    console.log(a);
    console.log(b);
    return res.send(sum);
})

app.get('/temp', (req, res) => {
    return res.sendFile(path.join(__dirname, './views/first.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});