// const button = document.getElementById("runaway-btn");

// const animateMove = (element, prop, pixels) =>
//     anime({
//         targets: element,
//         [prop]: `${pixels}px`,
//         easing: "easeOutCirc"
//     });

// ["mouseover", "click"].forEach(function (el) {
//     button.addEventListener(el, function (event) {
//         const top = getRandomNumber(window.innerHeight - this.offsetHeight);
//         const left = getRandomNumber(window.innerWidth - this.offsetWidth);

//         animateMove(this, "left", left).play();
//         animateMove(this, "top", top).play();
//     });
// });

// const getRandomNumber = (num) => {
//     return Math.floor(Math.random() * (num + 1));
// };
// const button = document.getElementById('move-button');

// button.addEventListener('mousemove', (event) => {
//     // get the current mouse position
//     const mouseX = event.clientX;
//     const mouseY = event.clientY;

//     // calculate the new position of the button
//     const buttonX = mouseX - button.offsetWidth / 2;
//     const buttonY = mouseY - button.offsetHeight / 2;

//     // set the new position of the button
//     button.style.left = buttonX + 'px';
//     button.style.top = buttonY + 'px';
// });
// function scrambleText(text) {
//     // Convert the text into an array of characters
//     const characters = text.split('');

//     // Shuffle the characters randomly
//     for (let i = characters.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [characters[i], characters[j]] = [characters[j], characters[i]];
//     }

//     // Convert the shuffled characters back into a string
//     return characters.join('');
// }

// // Get a reference to the input field
// const inputField = document.getElementById('scramble-input');

// // Add an event listener to the input field that scrambles the text as it's typed
// inputField.addEventListener('input', (event) => {
//     const inputText = event.target.value;
//     const scrambledText = scrambleText(inputText);
//     event.target.value = scrambledText;
// });
const input = document.getElementById('scramble-input');
const originalText = input.placeholder;

// shuffle function
function shuffleText(text) {
    let shuffledText = '';
    text.split('').forEach((char) => {
        const rand = Math.floor(Math.random() * 3) - 1; // random number between -1 and 1
        const charCode = char.charCodeAt(0) + rand;
        shuffledText += String.fromCharCode(charCode);
    });
    return shuffledText;
}

input.addEventListener('input', () => {
    const inputText = input.value;
    const scrambledText = shuffleText(inputText);
    input.setAttribute('data-scrambled-text', scrambledText);
});

input.addEventListener('focus', () => {
    input.setAttribute('data-scrambled-text', originalText);
});

input.addEventListener('blur', () => {
    input.setAttribute('data-scrambled-text', '');
});
