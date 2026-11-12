// SpendWise - Interactive Version

// 1. ARRAYS to store data
let expenses = [
    { name: "Lunch", amount: 500, category: "Food" },
    { name: "Transport", amount: 300, category: "Transport" },
    { name: "Shopping", amount: 1200, category: "Shopping" }
];
let budget = 5000;
let currentfilter = "All";
// DOM elements - getElementById
const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totlSpentEl = document.getElementById("totalSpent");
const budgetDisplay = document.getElementById("budgetDisplay");
const remainingEl = document.getElementById("remaining");
const statuesEl = document.getElementById("statusMessage");
const messageEl = document.getElementById("message");
const insight = document.getElementById("isightText");
const emptyMsg = document.getElementById("emptyMessage");

// 2. CONDITIONALS + LOOPS + DOM UPDATE
function renderExpenses(){
    expenseList.innerHTML = "";
    let total = 0;
    // loop through array
    for (let i = 0; i < expenses.length; i++){
        const exp = expenses[i];
        total += exp.amount;
        // Conditional: filter
        if (currentfilter !== "All" && exp.category !== currentfilter) continue;
        const li = document.createElement("li");
        li.innerHTML = '<span><strong>${exp.name}</strong> - ${exp.category}</span>'
        '<span>KES ${exp.amount}<button class="delete-btn" data-index="${i}">delete</button></span>';
        expenseList.appendChild(li);
    }
    // CONDITIONALS:budget status
    const remaining = budget - total;
    totlSpentEl.textContent = 'KES ${total}';
    budgetDisplay.textContent = 'KES ${budget}';
    remainingEl.textContent = 'KES ${remaining}';

    if (total > budget){
        statuesEl.textContent = "Over budget";
        statuesEl.className = "Over";
        insightEl.textContent = "You have exceeded your budget. Try cutting shopping or Entertainment this week .";



    } else if (total > budget * 0.8){
        statuesEl.textContent = "Almost at the budget limit";
        statuesEl.className = "warning";
        insightEl.textContent = "You are at over 80% of your budget. Be careful with new expenses.";

    } else if (total === 0){
        statuesEl.textContent = "Within budget";
        insight.textContent = "Add expenses to get personalized advice.";
    } else {
        statuesEl.textContent = "Within budget";
        statuesEl.className = "good";
        // Find biggest category using loop
        let topCat = "", max = 0;
        const cats = {};
        for(const e of expenses){
            cats[e.category] = (cats[e.category] || 0) + e.amount;
        }
        for(const c in cats){
            if(cats[c] > max){max = cats[c]; topCat = c; }
        }
        insightEl.textContent = 'Your biggest spending is ${topCat} (KES ${max}). Great job staying within budget!';
    }
    emptyMsg.style.display = expenses.length === 0 ? "block" : "none";
    // Delete buttons need listeners after render
    document.querySelectorAll(".delete-bnt"). forEach(btn =>{
        btn.addEventListener("click", () =>{
            expenses.splice(Number(btn.dataset.index), 1);
            renderExpenses();
        })
    })

}
// 3. EVENTS
form.addEventListener("submit", (e) =>{
    e.preventDefault(); // prevent page reload
    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("expenseAmount") .value);
    const category = document.getElementById("expenseCategory").value;
    // CONDITIONAL Validation
    if (!name || !category || amount <= 0 || isNaN(amount)){
        messageEl.textContent = "Please fill all fields with a valid amount.";
        messageEl.style.color = "red";
        return;
    }
    expenses.push({name, amount, category }); // ARRAY push
    messageEl.textContent = '${name} added!';
    messageEl.style.color = "green";
    form.reset();
    renderExpenses();
});
document.getElementById("clearBtn"). addEventListener("click", () =>{
    expenses = [];
    renderExpenses();
});
document.querySelectorAll(".filter-btn"). forEach(btn =>{
    btn.addEventListener("click", () =>{
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentfilter = btn.dataset.filter;
        renderExpenses();
    });
});
renderExpenses();