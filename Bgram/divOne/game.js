// Define the number of rows and columns
var rows = 8;
var cols = 8;



// Generate the HTML code for the chessboard grid
var html = '';
for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
        if ((i + j) % 2 == 0) {
            html += '<div style="background-color: #000;"></div>';
        } else {
            html += '<div style="background-color: #fff;"></div>';
        }
    }
}



// Add the HTML code to the body of the document
document.body.innerHTML = html;



// Set the custom properties for the grid rows and columns
document.documentElement.style.setProperty('--rows', rows);
document.documentElement.style.setProperty('--cols', cols);
