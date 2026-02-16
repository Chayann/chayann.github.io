/* simple func for increase & decrease button */
function tickUp() {
    let counterSpan = document.getElementById("counter");
    let value = parseInt(counterSpan.innerText);
    value = value + 1;
    counterSpan.innerText = value;
}

function tickDown() {
    let counterSpan = document.getElementById("counter");
    let value = parseInt(counterSpan.innerText);
    value = value - 1;
    counterSpan.innerText = value;
}

/* simple func for loop */
function runForLoop() {
    let counterSpan = document.getElementById("counter");
    let value = parseInt(counterSpan.innerText);
    let result = "";

    for (let i = 0; i <= value; i++) {
        result = result + i + " ";
    }
    document.getElementById("forLoopResult").innerText = result;
}

/* func for repeitition condition */
function showOddNumbers() {
    let counterSpan = document.getElementById("counter");
    let value = parseInt(counterSpan.innerText);
    let result = "";
    
    for (let i = 1; i <= value; i++) {
        if (i % 2 !== 0) {
            result = result + i + " ";
        }
    }
    document.getElementById("oddNumberResult").innerText = result;
}

/* arrays */
function addMultiplesToArray() {
    let counterSpan = document.getElementById("counter");
    let value = parseInt(counterSpan.innerText);
    let arr = [];

    for(let i = value; i >= 5; i--) {
        if (i % 5 === 0) {
            arr.push(i);
        }
    }
    console.log(arr);
}

/* obj & form fields */
function printCarObject() {
    let typeValue = document.getElementById("carType").value;
    let mpgValue = document.getElementById("carMPG").value;
    let colorValue = document.getElementById("carColor").value;

    let car = {
        cType: typeValue,
        cMPG: mpgValue,
        cColor: colorValue
    };
    console.log(car);
}

/* obj & form fields pt2*/
function loadCar(num) {
    let selectedCar;

    if (num === 1) {
        selectedCar = carObject1;
    } else if (num === 2) {
        selectedCar = carObject2;
    } else if (num === 3) {
        selectedCar = carObject3;
    }

    document.getElementById("carType").value = selectedCar.cType;
    document.getElementById("carMPG").value = selectedCar.cMPG;
    document.getElementById("carColor").value = selectedCar.cColor;
}

/* func for changing styles */
function changeColor(num) {
    let paragraph = document.getElementById("styleParagraph");

    if (num === 1) {
        paragraph.style.color = "red";
    } else if (num === 2) {
        paragraph.style.color = "green";
    } else if (num === 3) {
        paragraph.style.color = "blue";
    }
}