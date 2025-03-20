function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

function calculateTotals(transactions) {
    let totalIncome = 0;
    let totalExpenses = 0;
    let latestDate = null;
    
    transactions.forEach(transaction => {
        if (transaction.type === 'income')
            totalIncome += transaction.amount;
        else
            totalExpenses += transaction.amount;
            
        const transactionDate = new Date(transaction.date);
        if (!latestDate || transactionDate > latestDate)
            latestDate = transactionDate;
    });
    
    return {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        lastUpdated: latestDate
    };
}

function formatLastUpdated(date) {
    if (!date) return 'No transactions yet';
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
        return 'Today';
    } else if (date >= yesterday) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

function updateDashboard() {
    const transactions = getTransactions();
    const totals = calculateTotals(transactions);
    
    document.querySelector('.amount.income').textContent = `$${totals.totalIncome.toFixed(2)}`;
    document.querySelector('.amount.expense').textContent = `$${totals.totalExpenses.toFixed(2)}`;
    document.querySelector('.amount.balance').textContent = `$${totals.balance.toFixed(2)}`;
    document.querySelector('.last-updated').textContent = `Last updated: ${formatLastUpdated(totals.lastUpdated)}`;
    
    const recentTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    
    const transactionList = document.querySelector('.transaction-list');
    transactionList.innerHTML = recentTransactions.map(transaction => `
        <li class="transaction-item">
            <div class="transaction-info">
                <span class="transaction-name">${transaction.description}</span>
                <span class="transaction-date">${transaction.date}</span>
            </div>
            <span class="transaction-amount ${transaction.type}">
                ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
            </span>
        </li>
    `).join('');
}

updateDashboard();
window.addEventListener('storage', function(e) {
    if (e.key === 'transactions')
        updateDashboard();
});