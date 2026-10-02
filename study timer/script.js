const startButton = document.querySelector("button");
const stopButton = document.querySelectorAll("button")[2];
const pauseButton = document.querySelectorAll("button")[1];

const timeDisplay = document.querySelector(".time");
const sessionsDisplay = document.querySelector("#sessions");
const totalDisplay = document.querySelector("#total");
const pauseDisplay = document.querySelector(".pause");

let startTime;
let timeInterval;
let pauseInterval;
let sessionSeconds = 0;
let totalSeconds = 0;
let isPaused = false;
let pausedTime = 0;
let pauseStart = 0;
let started = false;
let stopped = true;
let time;
let calculatePause = 0;
let pauseSeconds = 0;
let totalPauseSeconds = 0;

function formatTime(totalSeconds) {

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hours = String(hours).padStart(2, "0")
    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")

    return `${hours}:${minutes}:${seconds}`;

}

function startTimer() {
    
        function updateTimer() {
            
            let elapsedTime = Date.now() - startTime - calculatePause;

            sessionSeconds = Math.floor(elapsedTime / 1000);

            timeDisplay.textContent = formatTime(sessionSeconds);
        }

        updateTimer();

        return setInterval(updateTimer, 1000);

    }

startButton.addEventListener("click", function() {

    if(stopped === true) {

        time = new Date();

    started = true;
    stopped = false;

    startTime = Date.now();
    pausedTime = 0;

    timeInterval = startTimer();
    }

});


stopButton.addEventListener("click", function() {

    if(started === true) {

        if (isPaused === true) {
            let currentPause = Date.now() - pauseStart;
            totalPauseSeconds += Math.floor(currentPause / 1000);
        }

    started = false;
    stopped = true;

    clearInterval(timeInterval);
    clearInterval(pauseInterval);

    let session = document.createElement("div");
    session.classList.add("session");

    let studyTime = document.createElement("span");
    studyTime.textContent = formatTime(sessionSeconds);

    let pauseTime = document.createElement("span");
    pauseTime.textContent = formatTime(totalPauseSeconds);

    let sessionStartTime = document.createElement ("span");
    let formattedTime = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
    sessionStartTime.textContent = formattedTime;

    session.appendChild(studyTime);
    session.appendChild(pauseTime);
    session.appendChild(sessionStartTime);

    sessionsDisplay.appendChild(session);

    totalSeconds += sessionSeconds;

    timeDisplay.textContent = "00:00:00";
    totalDisplay.textContent = formatTime(totalSeconds);

    currentPause = 0;
    sessionSeconds = 0;
    pauseSeconds = 0;
    totalPauseSeconds = 0;
    calculatePause = 0;
    isPaused = false;
    pauseButton.textContent = "Pause";
    pauseDisplay.textContent = "";
}

});

function startPause() {

    function updatePause () {
        calculatePause = Date.now() - pauseStart;
        pauseSeconds = Math.floor(calculatePause / 1000);

        pauseDisplay.textContent = "pause: " + formatTime(pauseSeconds);
    }

    updatePause();
    totalPauseSeconds += pauseSeconds;

    return setInterval(updatePause ,1000)
}

pauseButton.addEventListener("click", function() {

    if(started === true) {

        if (isPaused === false) {

            clearInterval(timeInterval);

            pauseStart = Date.now();

            pauseInterval = startPause();
        
            pauseButton.textContent = "Resume";
        
            isPaused = true;
    
        }
    
        else {
               
            clearInterval(pauseInterval);
        
            timeInterval = startTimer();

            let currentPause = Date.now() - pauseStart;
            totalPauseSeconds += Math.floor(currentPause / 1000);
        
            pauseButton.textContent = "Pause";
        
            isPaused = false;
       
            pauseStart = 0;

            pauseDisplay.textContent = "";
    }
}
})