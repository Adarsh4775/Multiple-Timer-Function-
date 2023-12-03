const timers = [];

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const timer = {
        id: Date.now(),
        timeRemaining: totalSeconds,
        intervalId: setInterval(() => {
            if (timer.timeRemaining <= 0) {
                clearInterval(timer.intervalId);
                handleTimerEnd(timer);
            } else {
                updateTimerDisplay(timer);
                timer.timeRemaining--;
            }
        }, 1000)
    };

    timers.push(timer);
    displayTimer(timer);
}

function displayTimer(timer) {
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.dataset.timerId = timer.id;
    
    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer-display');
    timerDisplay.textContent = formatTime(timer.timeRemaining);
    timerElement.appendChild(timerDisplay);

    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop Timer';
    stopButton.style.color = "white";
    stopButton.style.backgroundColor = "red";
    stopButton.addEventListener('click', () => stopTimer(timer.id));
    timerElement.appendChild(stopButton);

    document.getElementById('activeTimers').appendChild(timerElement);
}

function updateTimerDisplay(timer) {
    const timerElement = document.querySelector(`[data-timer-id="${timer.id}"] .timer-display`);
    timerElement.textContent = formatTime(timer.timeRemaining);
}

function handleTimerEnd(timer) {
    const timerElement = document.querySelector(`[data-timer-id="${timer.id}"]`);
    timerElement.classList.add('timer-ended');

    const alertSound = document.getElementById('alert-sound');
    alertSound.play();
}

function stopTimer(timerId) {
    const timerIndex = timers.findIndex(timer => timer.id === timerId);
    if (timerIndex !== -1) {
        clearInterval(timers[timerIndex].intervalId);
        timers.splice(timerIndex, 1);
        document.querySelector(`[data-timer-id="${timerId}"]`).remove();
    }
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}