const startBtn = document.querySelector(".startBtn");
const timersContainer = document.getElementById("timersContainer");
const emptyMessage = document.getElementById("emptyMessage");

startBtn.addEventListener("click", () => {

    const hours =
        parseInt(document.getElementById("hours").value) || 0;

    const minutes =
        parseInt(document.getElementById("minutes").value) || 0;

    const seconds =
        parseInt(document.getElementById("seconds").value) || 0;

    if(hours > 23 || minutes > 59 || seconds > 59){
        alert("Enter Valid Time");
        return;
    }

    let totalSeconds =
        hours * 3600 +
        minutes * 60 +
        seconds;

    if(totalSeconds <= 0){
        alert("Enter Valid Time");
        return;
    }

    emptyMessage.style.display = "none";

    createTimer(totalSeconds);
});

function createTimer(totalSeconds){

    const timerDiv = document.createElement("div");
    timerDiv.classList.add("timer");

    const label = document.createElement("span");
    label.innerText = "Time Left :";

    const timeText = document.createElement("span");

    const stopBtn = document.createElement("button");
    stopBtn.innerText = "Delete";

    timerDiv.append(label, timeText, stopBtn);

    timersContainer.appendChild(timerDiv);

    function updateTimer(){

        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        timeText.innerText =
        `${String(hrs).padStart(2,"0")} : ${String(mins).padStart(2,"0")} : ${String(secs).padStart(2,"0")}`;
    }

    updateTimer();

    const interval = setInterval(() => {

        totalSeconds--;

        if(totalSeconds < 0){

            clearInterval(interval);

            timerDiv.innerHTML = `
                <h2>Timer Is Up !</h2>
                <button>Stop</button>
            `;

            timerDiv.classList.add("timer-ended");

            timerDiv
            .querySelector("button")
            .addEventListener("click", () => {

                timerDiv.remove();

                if(timersContainer.children.length === 0){
                    emptyMessage.style.display = "block";
                }
            });

            return;
        }

        updateTimer();

    },1000);

    stopBtn.addEventListener("click", () => {

        clearInterval(interval);

        timerDiv.remove();

        if(timersContainer.children.length === 0){
            emptyMessage.style.display = "block";
        }
    });
}