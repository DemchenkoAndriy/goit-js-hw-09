
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const interval = 1500;
let timerId = null;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

const body = document.querySelector('body');



btnStart.addEventListener('click', startChangeColor);
btnStop.addEventListener('click', stopChangeColor);


function startChangeColor() {

    btnStart.setAttribute("disabled", '');
    
    timerId = setInterval(() => {
        body.style.background = getRandomHexColor();
        console.log(timerId);
  }, interval);
}

function stopChangeColor() {
 
    clearInterval(timerId);
    //
 btnStart.removeAttribute("disabled");
}

