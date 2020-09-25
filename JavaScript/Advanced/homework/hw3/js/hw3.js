var direction = 1;
var startValue = document.querySelector('form > input:first-child').value;
var endValue = document.querySelector('form > input:nth-child(2)').value;
var startButton = document.querySelector('input[value="Start"]');
var counter = 0;
var display = document.getElementById('display');
var interval;

function reverseCount() {
    if (direction == 1) {
        direction = 0;
    } else if (direction == 0) {
        direction = 1;
    };
};
function resetCount() {
    if (direction == 1) {
        counter = startValue;
    } else if (direction == 0){
        counter = endValue;
    };
    // console.log(`counter = ${counter} direction = ${direction}`);
    changeDisplayValue(counter);
};
function count() {
    // console.log(counter);
    if (direction == 1) {
        if (counter < endValue) {
            counter++;
            changeDisplayValue(counter);            
        } else {
            stopCount();
            // counter = endValue;//возврат counter т.к. он
                    // успел увеличится на 1 перед остановкой
        };
    } else if (direction == 0){
        if (counter > startValue) {
            counter--;
            changeDisplayValue(counter);            
        } else {
            stopCount();
            // counter = startValue;//аналогично в другую сторону
        };
    };
};
function changeDisplayValue(value) {
    display.innerHTML = value;
    // counter = value;
    // console.log(`counter = ${counter} direction = ${direction}`);
};
function startCount() {
    interval = setInterval(count, 1000);
    toggleStartButton('Start');
};
function stopCount() {
    clearInterval(interval);
};
function pressStop() {
    stopCount();
    toggleStartButton('Continue');
};
function toggleStartButton(newValue) {
    startButton.value = newValue;    
};

