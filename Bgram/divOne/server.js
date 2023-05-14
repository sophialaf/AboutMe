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
    db.all('SELECT letter FROM Tiles WHERE grabbable = TRUE ORDER BY RANDOM() LIMIT 21', (err, tiles) => {
        if (err) {
            console.error(err.message); // Check for errors retrieving tiles from database
            res.status(500).send({ error: 'Failed to retrieve tiles' });
            return;
        }
        console.log(`Retrieved ${tiles.length} tiles from the database.`); // Log successful tile retrieval

        // Update grabbable value for each tile
        tiles.forEach((tile) => {
            // Set grabbable to false for the current tile
            tile.grabbable = false;

            // Update the grabbable value in the database (assuming you have an update query)
            db.run('UPDATE Tiles SET grabbable = false WHERE letter = ?', [tile.letter], (err) => {
                if (err) {
                    console.error(err.message); // Handle the error if the update fails
                }
            });
        });
        res.send({ tiles });
    });
});

app.get(['/*.html', '/*.css', '/*.js', '/*.jpg', '/*.jpeg'], (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});
/*------------------------------------------------------------------------------------------------------
player database junk doesnt work lol
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

/*---------------------------------------------------------------------------------------------------------------------------
resetting the database
-----------------------------------------------------------------------------------------------------------------------------*/
const setAllElementsToTrue = () => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Tiles SET grabbable = TRUE';

        db.run(query, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

app.post('/update-elements', (req, res) => {
    setAllElementsToTrue()
        .then(() => {
            res.sendStatus(200); // Send a success response
        })
        .catch((error) => {
            console.error('Error setting all elements to true:', error);
            res.sendStatus(500); // Send an error response
        });
});

/*---------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------*/

let server = app.listen(port, function () {
    console.log("App server is running on port", port);
    console.log("to end press Ctrl + C");
});
