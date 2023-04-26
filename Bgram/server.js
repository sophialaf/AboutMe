const express = require('express'); //Set up the express module
const app = express();
const port = 8080;

const path = require('path') // bring in the path module to help locate files
const numOfTiles = 21;

const sqlite3 = require('bananagramsDB.db').verbose();  // verbose() gives you better error codes. Remove when done debugging
// Open a new database connection to the database file
let database = new sqlite3.Database('bananagramsDB.db', function (error) {
    if (error) {
        console.error(err.message);
        return {};
    }
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/getusers', function (req, res) {
    getUsers(database)
        .then((users) => {
            res.json(users);
        });
});

app.get('/adduser', function (req, res) {
    const id = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER));
    addUser(database, id, req.query.name)
        .then(function () {
            res.end();
        });
});

async function getUsers(db) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

async function addUser(db, id, name) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO users ('id', 'name') VALUES (?, ?)", [id, name], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


/*
SELECT tile_value FROM Tiles WHERE grabbable = "TRUE";

In the script that assigned those values to the divs, change grabbable to false somehow
*/

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let server = app.listen(port, function () {
    console.log("App server is running on port", port);
    console.log("to end press Ctrl + C");
});
// Start listening for requests on the designated port
// This can be at the beginning, or the end, or in-between.
// Conventionally it is put at the end

var dragMe = document.getElementById('drag-me');
var cells = document.getElementsByClassName('cell');

dragMe.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', null);
});

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    cells[i].addEventListener('drop', function (event) {
        event.preventDefault();
        this.appendChild(dragMe);
    });
}








// // Create an array of div elements
// var divArray = [];


// function newGame() {
//     generateTiles();
// }

// function generateTiles() {
//     for (var i = 0; i < numOfTiles; i++) {
//         var div = document.createElement("div");
//         divArray.push(div);
//     }

// // Get the container divs
// var sourceDiv = document.getElementById("handSource");
// var targetDiv = document.getElementById("handTarget");

// // Animate the divs falling onto the screen and moving into the target div
// divArray.forEach(function (div, index) {
//     // Set the initial position of the div
//     div.style.position = "absolute";
//     div.style.left = Math.random() * window.innerWidth + "px";
//     div.style.top = "-100px";

//     // Add the div to the source div
//     sourceDiv.appendChild(div);

//     // Animate the div falling onto the screen
//     var fallAnimation = div.animate([
//         { transform: "translateY(-100px)" },
//         { transform: "translateY(" + (index * 50) + "px)" }
//     ], {
//         duration: 1000,
//         easing: "ease-in-out"
//     });

//     // When the fall animation is done, animate the div moving into the target div
//     fallAnimation.onfinish = function () {
//         var moveAnimation = div.animate([
//             { transform: "translateY(" + (index * 50) + "px)" },
//             { transform: "translateY(0)" },
//             { transform: "translateX(" + (index * 50) + "px)" },
//             { transform: "translateX(" + (index * 50) + "px) rotate(-90deg)" }
//         ], {
//             duration: 1000,
//             easing: "ease-in-out"
//         });

//         // When the move animation is done, add the div to the target div
//         moveAnimation.onfinish = function () {
//             targetDiv.appendChild(div);
//         };
//     };
// });
// }