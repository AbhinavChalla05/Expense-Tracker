function getTransactions() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    
    if (encodedData) {
        try {
            const decodedData = JSON.parse(decodeURIComponent(encodedData));
            if (Array.isArray(decodedData) && decodedData.length > 0)
                return decodedData;
        } catch (error) {
            console.error('Error parsing transaction data:', error);
        }
    }

    alert('No transaction data found. Redirecting to transactions page...');
    window.location.href = 'transactions.html';
    return [];
}

function parseDate(dateStr) {
    const parts = dateStr.split(' ');
    const monthMap = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return new Date(parts[2], monthMap[parts[0]], parseInt(parts[1].replace(',', '')));
}

function calculateCategoryTotals(transactions) {
    const totals = {};
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        if (transaction.type === 'expense') {
            const category = transaction.category.toLowerCase();
            totals[category] = (totals[category] || 0) + transaction.amount;
        }
    }
    return totals;
}

function calculateSavings(transactions) {
    let totalIncome = 0;
    let totalExpenses = 0;

    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        if (transaction.type === 'income')
            totalIncome += transaction.amount;
        else
            totalExpenses += transaction.amount;
    }

    const savings = totalIncome - totalExpenses;
    const savingsPercentage = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

    return {
        totalIncome,
        totalExpenses,
        savings,
        savingsPercentage: Math.max(0, savingsPercentage)
    };
}

function getCategoryColor(category) {
    const colors = {
        'food': '#ff006e',
        'bills': '#3a86ff',
        'shopping': '#8338ec',
        'transport': '#ff9e00',
        'income': '#38b000'
    };
    return colors[category.toLowerCase()] || '#00bbf9';
}

window.onload = function() {
    const transactions = getTransactions();
    if (transactions.length > 0) {
        generateReport();
    }
};

function generateReport() {
    const transactions = getTransactions();
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    let filteredTransactions = transactions.filter(t => {
        const date = parseDate(t.date);
        return date >= sixMonthsAgo;
    });

    const categoryTotals = calculateCategoryTotals(filteredTransactions);
    const totalExpenses = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
    let pieChartHtml = '';
    let legendHtml = '';
    let currentPercentage = 0;
    let pieLabelsHtml = '';
    
    if (totalExpenses > 0) {
        const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
        for (let i = 0; i < sortedCategories.length; i++) {
            const category = sortedCategories[i][0];
            const amount = sortedCategories[i][1];
            const percentage = (amount / totalExpenses) * 100;
            pieChartHtml += `${getCategoryColor(category)} ${currentPercentage}% ${currentPercentage + percentage}%,`;
            
            const midAngle = (currentPercentage + (percentage / 2)) * 3.6;
            const radius = 150;
            const x = Math.cos((midAngle - 90) * Math.PI / 180) * radius + 200;
            const y = Math.sin((midAngle - 90) * Math.PI / 180) * radius + 200;
            
            if (percentage >= 5) {
                pieLabelsHtml += `
                    <div class="pie-segment-label" style="left: ${x}px; top: ${y}px; transform: translate(-50%, -50%)">
                        ${percentage.toFixed(1)}%
                    </div>
                `;
            }
            
            legendHtml += `
                <div class="legend-item">
                    <div class="legend-color color-${category}"></div>
                    <span>${category.charAt(0).toUpperCase() + category.slice(1)} ($${amount.toFixed(2)} - ${percentage.toFixed(1)}%)</span>
                </div>
            `;
            currentPercentage += percentage;
        }
    } else {
        pieChartHtml = '#f5f5f5 0% 100%';
        legendHtml = '<div class="legend-item">No expenses in selected period</div>';
    }
    
    const pieChartElement = document.getElementById('expense-pie-chart');
    pieChartElement.style.background = `conic-gradient(${pieChartHtml.slice(0, -1)})`;
    pieChartElement.innerHTML = pieLabelsHtml;
    document.getElementById('expense-legend').innerHTML = legendHtml;

    const savings = calculateSavings(filteredTransactions);
    const spentPercentage = 100 - savings.savingsPercentage;
    
    document.getElementById('savings-chart').innerHTML = `
        <div class="spent" style="width: ${spentPercentage}%">${spentPercentage.toFixed(1)}% Spent</div>
        <div class="saved" style="width: ${savings.savingsPercentage}%">${savings.savingsPercentage.toFixed(1)}% Saved</div>
    `;
    document.getElementById('savings-summary').innerHTML = `
        <p>You've saved ${savings.savingsPercentage.toFixed(1)}% of your income.</p>
        <p>Total Income: $${savings.totalIncome.toFixed(2)}</p>
        <p>Total Expenses: $${savings.totalExpenses.toFixed(2)}</p>
        <p>Net Savings: $${savings.savings.toFixed(2)}</p>
    `;
}