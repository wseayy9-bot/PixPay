// ===== 20 Days Countdown =====

let endTime = localStorage.getItem("endTime");

if (!endTime) {
    endTime = new Date().getTime() + (20 * 24 * 60 * 60 * 1000);
    localStorage.setItem("endTime", endTime);
}

function updateTimer() {

    let now = new Date().getTime();
    let distance = endTime - now;

    if (distance <= 0) {
        document.getElementById("timer").innerHTML = "Finished";
        return;
    }

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(document.getElementById("timer")){
        document.getElementById("timer").innerHTML =
            days + "D " +
            String(hours).padStart(2,'0') + ":" +
            String(minutes).padStart(2,'0') + ":" +
            String(seconds).padStart(2,'0');
    }
}

setInterval(updateTimer,1000);
updateTimer();
function selectPlan(name, amount, profit) {
    localStorage.setItem("planName", name);
    localStorage.setItem("planAmount", amount);
    localStorage.setItem("dailyProfit", profit);
}

window.onload = function () {
    const name = localStorage.getItem("planName");
    const amount = localStorage.getItem("planAmount");
    const profit = localStorage.getItem("dailyProfit");

    if (document.getElementById("planName")) {
        document.getElementById("planName").innerText = name || "No Plan";
        document.getElementById("planAmount").innerText = amount || "$0";
        document.getElementById("dailyProfit").innerText = profit || "$0.00";
    }
};
