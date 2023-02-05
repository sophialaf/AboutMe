let clickedOne = false, clickedTwo = false, clickedThree = false;

function openDoor(input) {
    if (input == 1) {
        firstInput();
    }
    if (input == 2) {
        secondInput();
    }
    if (input == 3) {
        thirdInput();
    }
}
function closeDoorTimeout() {
    timeout = setTimeout(closeDoorAgain, 5000);
}

function firstInput() {
    clickedOne = true;
    clickedTwo = false;
    clickedThree = false;
}
function secondInput() {
    if (clickedOne) {
        clickedTwo = true;
        clickedThree = false;
    } else {
        clickedOne = false;
        clickedTwo = false;
        clickedThree = false;
    }
}
function thirdInput() {
    if (clickedOne) {
        if (clickedTwo) {
            document.getElementById("doorPic").src = "openedDoor.jpeg";
            document.getElementById('butts').innerText="You bet I am.";
            closeDoorTimeout();
            clickedOne = false;
            clickedTwo = false;
            clickedThree = false;
        }
    } else {
        clickedOne = false;
        clickedTwo = false;
        clickedThree = false;
    }
}

function imNotStinky(){
    document.getElementById('doorPic').src = 'lionpic.jpeg';
    document.getElementById('butts').innerText="You get eaten by a lion.";
    closeDoorTimeout();
    alert("How dare you.");
}

function closeDoorAgain() {
    document.getElementById("doorPic").src = "closedDoor.jpeg";
    document.getElementById('butts').innerText="Lets see if you pass";
}