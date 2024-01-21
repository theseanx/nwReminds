// update as needed
const startingHours = 0;
const startingMinutes = 0;
const startingSeconds = 5;
let time = startingHours * 60 * 60 + startingMinutes * 60 + startingSeconds;



const countdownEl = document.getElementById('countdown');

const countdownInterval = setInterval(updateCountdown, 1000);


function updateCountdown() {
    console.log()
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    const minutes_text = minutes < 10 ? '0' + minutes : minutes;
    const hours_text = hours < 10 ? '0' + hours : hours;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    

    /*
    if (hours == 0 && minutes == 0 && seconds == 0) {
        console.log("TIMER STOPPED");
        hours = 10;
        minutes = 10;
        seconds = 10;

    }
    */

    if (time === 0) {
        // Perform action when countdown reaches zero
        console.log("Countdown reached zero! Perform some action.");

        if ("serviceWorker" in navigator) {
            send().catch(err => console.error(err));
          }


        // You can add your specific action here, such as displaying a message, triggering an event, etc.

        // For example, stopping the countdown and displaying a message:
        // clearInterval(countdownInterval);
        // countdownEl.innerHTML = 'Countdown reached zero!';

        // retrieve the next interval
        time = startingHours * 60 * 60 + startingMinutes * 60 + startingSeconds + 1;
    }

    console.log(`${hours}:${minutes}:${seconds}`);

    countdownEl.innerHTML = `${hours_text}:${minutes_text}:${seconds}`;
    time--;

}