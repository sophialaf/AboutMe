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


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bananagramsDB.db');

function assignTileValueToDiv(divId, tileValue) {
    const div = document.getElementById(drag-me);
    div.innerText = tileValue;
}

function getGrabbableTileValue() {
    return new Promise((resolve, reject) => {
        db.all('SELECT tile_value FROM Tiles WHERE grabbable = "TRUE"', (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const tileValue = rows[0].tile_value;
                resolve(tileValue);
            }
            db.close();
        });
    });
}

function doitall() {
    const cell1 = document.getElementById(cell1);
    cell1.innerText = Q;
}

function goBack() {
    window.location.href = "startPage.html";
}
