const express = require('express'); 
const app = express();
const port = 8080;
const path = require('path') 

let server = app.listen(port, function () {
    console.log("App server is running on port", port);
    console.log("to end press Ctrl + C");
});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});


const list = [
    "https://picsum.photos/id/31/3264/4912",
    "https://picsum.photos/id/33/5000/3333",
    "https://picsum.photos/id/30/1280/901",
    "https://picsum.photos/id/43/1280/831",
    "https://picsum.photos/id/53/1280/1280"
];
app.get('/img', function (req, res) {
    let i = Math.floor(Math.random() * list.length);
    let url = list[i]; 
    res.send(url);
});