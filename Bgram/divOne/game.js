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

                // Make the div visible
                div.style.visibility = 'visible';
            });
        })
        .catch(error => {
            // Log the error message and display an alert to the user
            console.error(error);
            alert('Failed to assign random letters to the "drag-me" divs. Please try again later.');
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