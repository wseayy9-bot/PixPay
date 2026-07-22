function selectPlan(name, amount, profit) {

    let plans = JSON.parse(localStorage.getItem("plans")) || [];

    plans.push({
        name: name,
        amount: parseFloat(amount.replace("$","")),
        profit: parseFloat(profit.replace("$","")),
        startTime: Date.now(),
        nextReward: Date.now() + (22 * 60 * 60 * 1000),
        received: 0,
        status: "active"
    });

    localStorage.setItem("plans", JSON.stringify(plans));
}

function getRemainingTime(startTime){

    const end = startTime + (20 * 24 * 60 * 60 * 1000);
    const diff = end - Date.now();

    if(diff <= 0){
        return "Finished";
    }

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);

    return `${days}D ${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

window.onload = function(){

    let plans = JSON.parse(localStorage.getItem("plans")) || [];
    let balance = Number(localStorage.getItem("balance")) || 0;

    plans.forEach(plan=>{

        if(plan.status=="active"){

            while(Date.now() >= plan.nextReward && plan.received < 20){

                balance += plan.profit;

                plan.received++;
                plan.nextReward += 22 * 60 * 60 * 1000;

            }

            if(plan.received >= 20){
                plan.status="completed";
            }

        }

    });

    localStorage.setItem("balance",balance.toFixed(2));
    localStorage.setItem("plans",JSON.stringify(plans));

    let page = window.location.pathname;
    let showPlans=[];

    if(page.includes("completed.html")){
        showPlans = plans.filter(p=>p.status=="completed");
    }else{
        showPlans = plans.filter(p=>p.status=="active");
    }

    let html="";

    showPlans.forEach(plan=>{

        html += `
        <div class="plan-card">

            <div class="plan-header">
                <h3>${plan.name}</h3>
                <span class="days">${plan.received}/20 Days</span>
            </div>

            <div class="plan-info">

                <div>
                    <small>Investment</small>
                    <h4>$${plan.amount}</h4>
                </div>

                <div>
                    <small>Daily Profit</small>
                    <h4>$${plan.profit}</h4>
                </div>

                <div>
                    <small>Received</small>
                    <h4>${plan.received}/20</h4>
                </div>

            </div>

            <p class="countdown">
                ⏰ Remaining:
                <span>${getRemainingTime(plan.startTime)}</span>
            </p>

        </div>
        `;

    });

    if(document.getElementById("myPlans")){
        document.getElementById("myPlans").innerHTML = html;
    }

    if(document.getElementById("balance")){
        document.getElementById("balance").innerHTML =
        "$"+(localStorage.getItem("balance") || "0.00");
    }

}

setInterval(window.onload,1000);
