const express = require('express');
const app = express();
const port = 3000;

const path = require('path')
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('bananagramsDB.db', function (error) {
    if (error) {
        console.error(error.message); // Check for database connection errors
        return {};
    }
    console.log('Connected to the bananagrams database.'); // Log successful connection
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/*------------------------------------------------------------------------------------------------------
tiles database junk 
-------------------------------------------------------------------------------------------------------*/

app.get('/tiles', (req, res) => {
    db.all('SELECT letter FROM Tiles WHERE grabbable = TRUE ORDER BY RANDOM() LIMIT 10', (err, tiles) => {
        if (err) {
            console.error(err.message); // Check for errors retrieving tiles from database
            res.status(500).send({ error: 'Failed to retrieve tiles' });
            return;
        }
        console.log(`Retrieved ${tiles.length} tiles from the database.`); // Log successful tile retrieval
        res.send({ tiles });
    });
});

app.get(['/*.html', '/*.css', '/*.js', '/*.jpg', '/*.jpeg'], (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

// Utility function to shuffle an array in place
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


/*------------------------------------------------------------------------------------------------------
player database junk 
-------------------------------------------------------------------------------------------------------*/

app.get('/addplayer', function (req, res) {
    let name = req.query.name;
    addUser(db, req.query.name)
        .then(function () {
            res.end();
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).end();
        });
});

async function addPlayer(db, name) {
    return new Promise((resolve, reject) => {
    db.run("INSERT INTO Users (name) VALUES (?)", [name], function (err) {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
});
}


let server = app.listen(port, function () {
    console.log("App server is running on port", port);
    console.log("to end press Ctrl + C");
});
