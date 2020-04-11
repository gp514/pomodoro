const timerDisplay = document.querySelector("#timer");
const defaultButton = document.querySelector("#default");
const resetButton = document.querySelector("#reset");

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
        elapsedSeconds++;
        const remainingSeconds = totalSeconds - elapsedSeconds;

        const minutes = (Math.floor(remainingSeconds/60)).toLocaleString(undefined, {minimumIntegerDigits: 2});
        const seconds = (remainingSeconds % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});

        timerDisplay.textContent = `${minutes}:${seconds}`;
        setTimeout(countdown, 1000);
    }
    if(elapsedSeconds === totalSeconds) {
        session = !session;
        console.log(session);
        elapsedSeconds = 0;
        !session ? totalSeconds = breakMinutes * 60 : totalSeconds = activeMinutes * 60;
    }
}

const pauseTimer = function() {
    tick = false;
    timerDisplay.removeEventListener("click", pauseTimer);
    timerDisplay.addEventListener("click", startTimer);
}

const startTimer = function() {
    tick = true;
    countdown();
    timerDisplay.removeEventListener("click", startTimer);
    timerDisplay.addEventListener("click", pauseTimer);
}

const resetClock = function() {
    timerDisplay.removeEventListener("click", startTimer);
    timerDisplay.removeEventListener("click", pauseTimer);

    tick = false;
    elapsedSeconds = 0;
    timerDisplay.textContent = "START";
    timerDisplay.addEventListener("click", startTimer);
}

const resetDefault = function() {
    activeMinutes = defaultActiveMinutes;
    breakMinutes = defaultBreakMinutes;

    resetClock();
}



defaultButton.addEventListener("click", resetDefault);
timerDisplay.addEventListener("click", startTimer)
resetButton.addEventListener("click", resetClock);





//startTimer();