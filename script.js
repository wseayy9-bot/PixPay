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

    let plans = JSON.parse(localStorage.getItem("plans")) || [];

    plans.push({
    name: name,
    amount: amount,
    profit: profit,
    startTime: Date.now(),
    endTime: Date.now() + (20 * 24 * 60 * 60 * 1000),
    status: "active"
});

    localStorage.setItem("plans", JSON.stringify(plans));
}
function getRemainingTime(startTime){

    const end = startTime + (20*24*60*60*1000);

    const now = Date.now();

    const diff = end - now;

    if(diff <= 0){
        return "Finished";
    }

    const days = Math.floor(diff/(1000*60*60*24));
    const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
    const seconds = Math.floor((diff%(1000*60))/1000);

    return `${days}D ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}
window.onload = function () {

    let plans = JSON.parse(localStorage.getItem("plans")) || [];

    let html = "";
  plans.forEach(plan => {
    if (Date.now() >= plan.endTime) {
        plan.status = "completed";
    }
});

localStorage.setItem("plans", JSON.stringify(plans));
    plans.filter(plan => plan.status === "active").forEach(plan => {

        html += `
        <div class="plan-card">
            <div class="plan-header">
                <h3>${plan.name}</h3>
                <span class="days">20 Days</span>
            </div>

            <div class="plan-info">
                <div>
                    <small>Investment</small>
                    <h4>${plan.amount}</h4>
                </div>

                <div>
                    <small>Daily Profit</small>
                    <h4>${plan.profit}</h4>
                </div>
            </div>

            <p class="countdown">⏰ Remaining:<span class="timer">${getRemainingTime(plan.startTime)}</span>
         </div>
        `;
        

    });

    if(document.getElementById("myPlans")){
        document.getElementById("myPlans").innerHTML = html;
    }

};
setInterval(() => {

    if(document.getElementById("myPlans")){
        window.onload();
    }

},1000);
