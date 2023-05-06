
/*-------------------------------------------------------------------------------------------------------
Code for the gameboard grid
--------------------------------------------------------------------------------------------------------*/
// Define the number of rows and columns 
var rows = 30;
var cols = 40;

// Generate the HTML code for the checkerboard grid
var html = '';
for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
        if ((i + j) % 2 == 0) {
            html += '<div class="even"></div>';
        } else {
            html += '<div class="odd"></div>';
        }
    }
}

// Add the HTML code to the body of the document
document.getElementById('game-area').innerHTML = html;

// Set the custom properties for the grid rows and columns
document.documentElement.style.setProperty('--rows', rows);
document.documentElement.style.setProperty('--cols', cols);

/*-------------------------------------------------------------------------------------------------------
Making the tiles 
--------------------------------------------------------------------------------------------------------*/
// Define the letter distribution
const letterDistribution = {
    A: 13,
    B: 3,
    C: 3,
    D: 6,
    E: 18,
    F: 3,
    G: 4,
    H: 3,
    I: 12,
    J: 2,
    K: 2,
    L: 5,
    M: 3,
    N: 8,
    O: 11,
    P: 2,
    Q: 2,
    R: 9,
    S: 6,
    T: 9,
    U: 6,
    V: 3,
    W: 3,
    X: 2,
    Y: 3,
    Z: 2
};

// // Generate the array of tiles with the letter distribution
let tiles = [];
for (let letter in letterDistribution) {
    for (let i = 0; i < letterDistribution[letter]; i++) {
        tiles.push(`<div class="tile" data-letter="${letter}">${letter}</div>`);
    }
}

// // Shuffle the tiles using the Fisher-Yates shuffle algorithm
for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
}

// // Select 21 random tiles from the shuffled array
const handTiles = tiles.slice(0, 21);

// // Generate the HTML for the tiles and add them to the "hand" div
document.getElementById('hand').innerHTML = handTiles.join('');

// // Generate the HTML for the remaining tiles and add them to the "board" div
document.getElementById('board').innerHTML = tiles.slice(21).join('');
/*-------------------------------------------------------------------------------------------------------
Button functionality 
--------------------------------------------------------------------------------------------------------*/

function goBack() {
    window.location.href = "startPage.html";
}

function singlePlayer() {
    window.location.href = "home.html";
}
function Instructions() {
    window.location.href = "instructions.html";
}


/*--------------------------------------------------------------------------------------------------
animation
--------------------------------------------------------------------------------------------------*/
const draggable = document.getElementById('draggable');
const hand = document.getElementById('hand');
const anim = document.getElementById('animate');

function animate() {
    const startPos = draggable.getBoundingClientRect().left;
    const endPos = hand.getBoundingClientRect().right - draggable.offsetWidth;
    const duration = 1000; // 1 second

    let startTimestamp = null;
    function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        const newPos = easeOutQuad(progress, startPos, endPos - startPos, duration);
        draggable.style.transform = `translateX(${newPos}px)`;
        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            draggable.style.transform = '';
        }
    }

    window.requestAnimationFrame(step);
}

function easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
}

anim.addEventListener('click', animate);


/**
 * 
 */



const generateHandButton = document.getElementById("generate-hand-button");
generateHandButton.addEventListener("click", generateHand);


function dropHandler(event) {
    event.preventDefault();
    const container = document.getElementsByClassName("cell");
    const draggable = document.getElementById("draggable");
    const containerRect = container.getBoundingClientRect();
    const draggableRect = draggable.getBoundingClientRect();
    if (
        containerRect.left <= draggableRect.left &&
        containerRect.right >= draggableRect.right &&
        containerRect.top <= draggableRect.top &&
        containerRect.bottom >= draggableRect.bottom
    ) {
        draggable.style.left = container.offsetLeft + "px";
        draggable.style.top = container.offsetTop + "px";
    }
}


function dump() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.style.transform = "translateY(-100%)";
    });
}
