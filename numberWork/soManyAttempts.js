// // Get references to the form, input, and radio buttons
// var form = document.getElementById("form");
// var input = document.getElementById("input");
// var radio1 = document.getElementById("radio1");
// var radio2 = document.getElementById("radio2");
// var radio3 = document.getElementById("radio3");

// // Set the initial input format
// input.value = formatInput(radio1.value, input.value);

// // Listen for changes to the radio buttons
// radio1.addEventListener("change", function () {
//     input.value = formatInput(radio1.value, input.value);
// });

// radio2.addEventListener("change", function () {
//     input.value = formatInput(radio2.value, input.value);
// });

// radio3.addEventListener("change", function () {
//     input.value = formatInput(radio3.value, input.value);
// });

// // Listen for changes to the input
// input.addEventListener("input", function () {
//     input.value = formatInput(getSelectedRadioValue(), input.value);
// });

// // Listen for the form to be submitted
// form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Get the current value of the input
//     var value = input.value;

//     // Verify that the input is correct
//     if (verifyInput(getSelectedRadioValue(), value)) {
//         alert("Input is correct!");
//     } else {
//         alert("Input is incorrect. Please try again.");
//     }
// });

// // Listen for the Enter key to be pressed
// input.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//         form.dispatchEvent(new Event("submit"));
//     }
// });

// // Format the input based on the selected radio button
// function formatInput(format, value) {
//     switch (format) {
//         case "US Phone":
//             return value.replace(/[^\d]/g, "").slice(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
//         case "FR Phone":
//             return value.replace(/[^\d]/g, "").slice(0, 8).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
//     }
// }
// Get references to the radio buttons and the input field
// var radio1 = docum// Get references to the radio buttons and the text box
// var radio1 = document.getElementById("usNumSelect");
// var radio2 = document.getElementById("frNumSelect");
// var radio3 = document.getElementById("ssnSelect");
// var textbox = document.getElementById("inputAccepter");

// // Set the initial placeholder text
// textbox.placeholder = radio1.value;

// // Listen for changes to the radio buttons
// radio1.addEventListener("change", function() {
// textbox.placeholder = radio1.value;
// });

// radio2.addEventListener("change", function() {
// textbox.placeholder = radio2.value;
// });

// radio3.addEventListener("change", function() {
//     textbox.placeholder = radio2.value;
//     });