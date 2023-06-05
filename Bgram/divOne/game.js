/*-------------------------------------------------------------------------------------------------------
Assigning tile values 
--------------------------------------------------------------------------------------------------------*/
function assignRandomLetters() {
    fetch('/tiles')
        .then(res => {
            // Check if the response was successful
            if (!res.ok) {
                throw new Error(`Failed to retrieve tiles (HTTP ${res.status})`);
            }
            return res.json();
        })
        .then(data => {
            const tiles = data.tiles;
            console.log('Retrieved tiles:', tiles);

            // Iterate over all the "drag-me" divs
            const dragMeDivs = document.querySelectorAll('.drag-me');
            console.log('dragMeDivs:', dragMeDivs);

            dragMeDivs.forEach((div, index) => {
                // Check if the tile exists at the given index
                if (!tiles[index]) {
                    throw new Error(`Tile not found for index ${index}`);
                }

                // Assign a random letter from the shuffled array to each div
                const tile = tiles[index];
                console.log(`Assigning tile ${tile.letter} to div ${index}`);
                div.textContent = tile.letter;

            });
        })
        .catch(error => {
            console.error(error);
        });
}

// Call the function to assign random letters to the "drag-me" divs
assignRandomLetters();


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
draggable functions 
--------------------------------------------------------------------------------------------------*/
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

/*--------------------------------------------------------------------------------
split
--------------------------------------------------------------------------------*/
function split() {
    const tiles = document.querySelectorAll(".drag-me");
    tiles.forEach(tile => {
        tile.style.visibility = "visible";
    });
    var splitButton = document.querySelector('button[onclick="split()"]');
    splitButton.remove();
}
/*------------------------------------------------------------------------------------------
        Peel method
------------------------------------------------------------------------------------------*/
function peel() {
    const newDiv = document.createElement('div');
    const uniqueId = generateUniqueId(); // Function to generate a unique ID

    newDiv.classList.add('drag-me');
    newDiv.style.visibility = "visible";

    // Generate a random letter
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * letters.length);
    const letter = letters.charAt(randomIndex);

    // Set the letter as the text content of the new div
    newDiv.textContent = letter;

    const handDiv = document.getElementById('hand');
    handDiv.appendChild(newDiv);

    // Add necessary attributes and event listeners for draggable functionality
    newDiv.setAttribute('draggable', 'true');
    newDiv.setAttribute('data-draggable-id', uniqueId);

    newDiv.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', this.getAttribute('data-draggable-id'));
    });

    newDiv.addEventListener('dragend', function (event) {
        // Perform any necessary actions after dragging ends
    });
}

function generateUniqueId() {
    // Generate a random alphanumeric ID
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';

    for (let i = 0; i < 10; i++) {
        uniqueId += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
    }

    return uniqueId;
}

