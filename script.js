let seconds = 22 * 60 * 60;

function updateTimer(){
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    document.getElementById("timer").innerHTML =
        String(h).padStart(2,"0") + ":" +
        String(m).padStart(2,"0") + ":" +
        String(s).padStart(2,"0");

    if(seconds > 0){
        seconds--;
    }
}

setInterval(updateTimer,1000);
updateTimer();
function selectPlan(name, amount, profit) {
    localStorage.setItem("planName", name);
    localStorage.setItem("planAmount", amount);
    localStorage.setItem("dailyProfit", profit);
}
