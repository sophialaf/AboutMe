function usNum() {
    // var input = document.getElementByName("numImput");
    // input.placeholder = "(xxx)xxx-xxxx";
    // document.getElementById('result')="this is a change"
    document.getElementByName(numImput)[0].placeholder = "(xxx)xxx-xxxx"
    $('#numInput').attr('placeholder','(xxx)xxx-xxxx');
}

function frNum() {
    document.getElementByName(numImput)[0].placeholder = "xx.xx.xx.xx"
    $('#numInput').attr('placeholder','xx.xx.xx.xx');
}

function ssn() {
    document.getElementByName(numImput)[0].placeholder = "xxx-xx-xxxx"
    $('#numInput').attr('placeholder','xxx-xx-xxxx');
}

function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}