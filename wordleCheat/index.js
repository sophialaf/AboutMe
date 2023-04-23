const express = require('express'); 
const app = express();
const port = 8080;
const path = require('path')

let server = app.listen(port, function () {
    console.log("App server is running on port", port);
    console.log("to end press Ctrl + C");
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});

const fs = require('fs');
let wordlist = [];
fs.readFile(path.join(__dirname, 'enwords.txt'), 'utf8', function (err, data) {
    wordlist = data.split('\n');
});

// app.get('/words', function (req, res) {
//     let position = req.query.position ? parseInt(req.query.position) : 0; 
//     let end = start + 20;
//     let start = parseInt(req.query.start) || 0;
//     let words = wordlist.slice(start, end).join('\n');
//     let response = { words: words, position: position };
//     res.json(response);
// });
app.get('/words', function (req, res) {
    let start = parseInt(req.query.start) || 0;
    let end = start + 20;
    let words = wordlist.slice(start, end).join('\n');
    res.send(words);
});


