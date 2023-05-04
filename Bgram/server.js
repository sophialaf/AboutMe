const express = require('express');
const app = express();
const port = 8080;

const path = require('path')
const numOfTiles = 21;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'startPage.html'));
});

app.get(['/*.html', '/*.css', '/*.js', '/*.jpg'], (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
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

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let server = app.listen(port, function () {
    console.log("App server is running on port", port);
    console.log("to end press Ctrl + C");
});

const sqlite3 = require('sqlite3').verbose();  // verbose() gives you better error codes. Remove when done debugging
// Open a new database connection to the database file
let database = new sqlite3.Database('bananagramsDB.db', function (error) {
    if (error) {
        console.error(err.message);
        return {};
    }
});
