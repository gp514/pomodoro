const timerDisplay = document.querySelector("#timer");
const defaultButton = document.querySelector("#default");
const resetButton = document.querySelector("#reset");
const body = document.querySelector("body");
const activeMinutesUp = document.querySelector("#active-time .fa-caret-up");
const activeMinutesDown = document.querySelector("#active-time .fa-caret-down");
const activeMinutesDisplay = document.querySelector("#active-time span");
const breakMinutesUp = document.querySelector("#break-time .fa-caret-up");
const breakMinutesDown = document.querySelector("#break-time .fa-caret-down");
const breakMinutesDisplay = document.querySelector("#break-time span");
const allArrows = document.querySelectorAll("i");
const state = document.querySelector("#state");

const defaultActiveMinutes = 25;
const defaultBreakMinutes = 5;

let activeMinutes = defaultActiveMinutes;
let breakMinutes = defaultBreakMinutes;

let totalSeconds = activeMinutes*60;
let elapsedSeconds = 0;

let tick = false;

let session = true;

const countdown = function() {
    if(tick){
        if(elapsedSeconds === totalSeconds) {
            session = !session;
            elapsedSeconds = 0;
            if(session) {
                totalSeconds = activeMinutes * 60;
                body.style.backgroundColor = "#b9dbaf";
                state.textContent = "ACTIVE"
            } else {
                totalSeconds = breakMinutes * 60;
                body.style.backgroundColor = "rgb(248, 160, 160)";
                state.textContent = "PAUSED"
            }
      }
        elapsedSeconds++;
        const remainingSeconds = totalSeconds - elapsedSeconds;

        const minutes = (Math.floor(remainingSeconds/60)).toLocaleString(undefined, {minimumIntegerDigits: 2});
        const seconds = (remainingSeconds % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});

        timerDisplay.textContent = `${minutes}:${seconds}`;
        setTimeout(countdown, 1000);
    }
    
}

const pauseTimer = function() {
    tick = false;
    body.style.backgroundColor = "lightgray";
    timerDisplay.removeEventListener("click", pauseTimer);
    state.style.display = "visible";
    state.textContent = "PAUSED"
    setTimeout(function() {timerDisplay.addEventListener("click", startTimer)}, 500);
}

const startTimer = function() {
    tick = true;
    state.style.visibility = "visible";
    if(session) {
        body.style.backgroundColor = "#b9dbaf";
        state.textContent = "ACTIVE"
    } else {
        body.style.backgroundColor = "rgb(248, 160, 160)";
        state.textContent = "BREAK"
    }
    timerDisplay.removeEventListener("click", startTimer);
   setTimeout(function(){timerDisplay.addEventListener("click", pauseTimer);}, 500); 
    for(let i = 0; i < allArrows.length; i++) {
        allArrows[i].classList.add("timer-active");
    }
    countdown();
}

const resetClock = function() {
    timerDisplay.removeEventListener("click", startTimer);
    timerDisplay.removeEventListener("click", pauseTimer);

    state.style.visibility = "hidden";

    for(let i = 0; i < allArrows.length; i++) {
        allArrows[i].classList.remove("timer-active");
    }

    tick = false;
    elapsedSeconds = 0;
    timerDisplay.textContent = "START";
    timerDisplay.addEventListener("click", startTimer);
}

const resetDefault = function() {
    activeMinutes = defaultActiveMinutes;
    breakMinutes = defaultBreakMinutes;

    activeMinutesDisplay.textContent = activeMinutes;
    breakMinutesDisplay.textContent = breakMinutes;

    totalSeconds = activeMinutes*60;

    resetClock();
}

const incrementActiveMinutes = function() {
    activeMinutes++;
    activeMinutesDisplay.textContent = activeMinutes;
    totalSeconds = activeMinutes*60;
}

const decrementActiveMinutes = function() {
    activeMinutes--;
    activeMinutesDisplay.textContent = activeMinutes;
    totalSeconds = activeMinutes*60;
}

const incrementBreakMinutes = function() {
    breakMinutes++;
    breakMinutesDisplay.textContent = breakMinutes;
}

const decrementBreakMinutes = function() {
    breakMinutes--;
    breakMinutesDisplay.textContent = breakMinutes;
}



defaultButton.addEventListener("click", resetDefault);
timerDisplay.addEventListener("click", startTimer)
resetButton.addEventListener("click", resetClock);
activeMinutesUp.addEventListener("click", incrementActiveMinutes);
activeMinutesDown.addEventListener("click", decrementActiveMinutes);
breakMinutesUp.addEventListener("click", incrementBreakMinutes);
breakMinutesDown.addEventListener("click", decrementBreakMinutes);