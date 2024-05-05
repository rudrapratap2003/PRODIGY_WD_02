    let timer;
    let running = false;
    let startTime;
    let lapStartTime;
    let lapCounter = 1;

    function startStop() {
        if (running) {
            clearInterval(timer);
            document.getElementById('startStop').src = 'start.png';
        } else {
            if (!lapStartTime) {
                lapStartTime = Date.now();
            }
            startTime = Date.now() - (lapCounter === 1 ? 0 : parseInt(document.getElementById('display').textContent.replace(/:/g, '').replace('.', '')) * 10);
            timer = setInterval(updateDisplay, 10);
            document.getElementById('startStop').src = 'pause.png';
        }
        running = !running;
    }

    function lapReset() {
        if (running) {
            const lapTime = document.getElementById('display').textContent;
            const lapItem = document.createElement('li');
            lapItem.textContent = `#${lapCounter++}.  ${lapTime}`;
            document.getElementById('laps').appendChild(lapItem);
            lapStartTime = Date.now();
        } else {
            resetStopwatch();
        }
    }

    function updateDisplay() {
        const elapsedTime = Date.now() - startTime;
        const formattedTime = formatTime(elapsedTime);
        document.getElementById('display').textContent = formattedTime;
    }

    function formatTime(time) {
        let ms = Math.floor(time / 10) % 100;
        time = Math.floor(time / 1000);
        let secs = time % 60;
        time = Math.floor(time / 60);
        let mins = time % 60;
        let hrs = Math.floor(time / 60);

        return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 2)}`;
    }

    function pad(num, size = 2) {
        let s = num + '';
        while (s.length < size) s = '0' + s;
        return s;
    }

    function resetStopwatch() {
        clearInterval(timer);
        document.getElementById('display').textContent = '00:00:00:00';
        document.getElementById('startStop').src = 'start.png';
        running = false;
        lapCounter = 1;
        document.getElementById('laps').innerHTML = '';
        lapStartTime = null;
    }