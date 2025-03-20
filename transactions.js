let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function displayTransactions(transactionsToShow = transactions) {
    const tbody = document.getElementById('transactions-body');
    tbody.innerHTML = '';
    
    const sortValue = document.getElementById('sort-filter').value;
    const sortedTransactions = [...transactionsToShow];
    
    switch(sortValue) {
        case 'date-desc':
            sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'amount-desc':
            sortedTransactions.sort((a, b) => b.amount - a.amount);
            break;
        case 'amount-asc':
            sortedTransactions.sort((a, b) => a.amount - b.amount);
            break;
    }
    
    sortedTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td><span class="category-badge category-${transaction.category.toLowerCase()}">${transaction.category}</span></td>
            <td class="amount ${transaction.type}">${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

function addTransaction() {
    const description = prompt('Enter transaction description:');
    if (!description) return;
    
    const amount = parseFloat(prompt('Enter amount:'));
    if (isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }
    
    const type = prompt('Enter type (income/expense):').toLowerCase();
    if (!['income', 'expense'].includes(type)) {
        alert('Please enter either "income" or "expense"');
        return;
    }
    
    const category = prompt('Enter category (food/bills/shopping/transport/income):').toLowerCase();
    if (!['food', 'bills', 'shopping', 'transport', 'income'].includes(category)) {
        alert('Please enter a valid category');
        return;
    }
    
    const transaction = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description,
        amount,
        type,
        category: category.charAt(0).toUpperCase() + category.slice(1)
    };
    
    transactions.push(transaction);
    saveTransactions();
    displayTransactions();
}

function addDemoData() {
    const demoTransactions = [{date: 'Mar 18, 2025', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Mar 15, 2025', description: 'Freelance Project Payment', amount: 1200.00, type: 'income', category: 'Income'}, {date: 'Mar 10, 2025', description: 'Lottery Prize', amount: 500.00, type: 'income', category: 'Income'}, {date: 'Feb 18, 2025', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Feb 15, 2025', description: 'Gift from Family', amount: 1000.00, type: 'income', category: 'Income'}, {date: 'Jan 18, 2025', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Jan 10, 2025', description: 'Year-end Bonus', amount: 5000.00, type: 'income', category: 'Income'}, {date: 'Dec 18, 2024', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Dec 15, 2024', description: 'Holiday Bonus', amount: 1000.00, type: 'income', category: 'Income'}, {date: 'Nov 18, 2024', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Oct 18, 2024', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Sep 18, 2024', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Aug 18, 2024', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Jul 18, 2024', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Jun 18, 2024', description: 'Monthly Salary', amount: 2850.00, type: 'income', category: 'Income'}, {date: 'Mar 18, 2025', description: 'Grocery Shopping', amount: 85.42, type: 'expense', category: 'Food'}, {date: 'Mar 15, 2025', description: 'Flight to Hyderabad', amount: 450.00, type: 'expense', category: 'Transport'}, {date: 'Mar 12, 2025', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'Bills'}, {date: 'Mar 10, 2025', description: 'New Smartphone', amount: 899.99, type: 'expense', category: 'Shopping'}, {date: 'Mar 8, 2025', description: 'Restaurant Dinner', amount: 45.80, type: 'expense', category: 'Food'}, {date: 'Feb 28, 2025', description: 'Flight to Mumbai', amount: 380.00, type: 'expense', category: 'Transport'}, {date: 'Feb 25, 2025', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Feb 20, 2025', description: 'Grocery Shopping', amount: 92.50, type: 'expense', category: 'Food'}, {date: 'Feb 15, 2025', description: 'New Laptop', amount: 1299.99, type: 'expense', category: 'Shopping'}, {date: 'Feb 10, 2025', description: 'Electricity Bill', amount: 78.50, type: 'expense', category: 'Bills'}, {date: 'Jan 30, 2025', description: 'Flight to Delhi', amount: 420.00, type: 'expense', category: 'Transport'}, {date: 'Jan 25, 2025', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Jan 20, 2025', description: 'Grocery Shopping', amount: 88.75, type: 'expense', category: 'Food'}, {date: 'Jan 15, 2025', description: 'New Headphones', amount: 199.99, type: 'expense', category: 'Shopping'}, {date: 'Jan 10, 2025', description: 'Water Bill', amount: 45.00, type: 'expense', category: 'Bills'}, {date: 'Dec 28, 2024', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Dec 25, 2024', description: 'Holiday Shopping', amount: 350.00, type: 'expense', category: 'Shopping'}, {date: 'Dec 20, 2024', description: 'Grocery Shopping', amount: 95.25, type: 'expense', category: 'Food'}, {date: 'Dec 15, 2024', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'Bills'}, {date: 'Nov 28, 2024', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Nov 25, 2024', description: 'Grocery Shopping', amount: 82.50, type: 'expense', category: 'Food'}, {date: 'Nov 20, 2024', description: 'New Shoes', amount: 129.99, type: 'expense', category: 'Shopping'}, {date: 'Oct 28, 2024', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Oct 25, 2024', description: 'Grocery Shopping', amount: 78.75, type: 'expense', category: 'Food'}, {date: 'Oct 20, 2024', description: 'Electricity Bill', amount: 85.50, type: 'expense', category: 'Bills'}, {date: 'Sep 28, 2024', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Sep 25, 2024', description: 'Grocery Shopping', amount: 92.25, type: 'expense', category: 'Food'}, {date: 'Sep 20, 2024', description: 'New Watch', amount: 299.99, type: 'expense', category: 'Shopping'}, {date: 'Aug 28, 2024', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Aug 25, 2024', description: 'Grocery Shopping', amount: 88.50, type: 'expense', category: 'Food'}, {date: 'Aug 20, 2024', description: 'Water Bill', amount: 45.00, type: 'expense', category: 'Bills'}, {date: 'Jul 28, 2024', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Jul 25, 2024', description: 'Grocery Shopping', amount: 85.75, type: 'expense', category: 'Food'}, {date: 'Jul 20, 2024', description: 'Internet Bill', amount: 59.99, type: 'expense', category: 'Bills'}, {date: 'Jun 28, 2024', description: 'Monthly Rent', amount: 1200.00, type: 'expense', category: 'Bills'}, {date: 'Jun 25, 2024', description: 'Grocery Shopping', amount: 90.25, type: 'expense', category: 'Food'}, {date: 'Jun 20, 2024', description: 'Electricity Bill', amount: 75.50, type: 'expense', category: 'Bills'}];
    transactions = demoTransactions;
    saveTransactions();
    displayTransactions();
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all transaction data? This action cannot be undone.')) {
        transactions = [];
        saveTransactions();
        displayTransactions();
    }
}

function sortTransactions() {
    const sortValue = document.getElementById('sort-filter').value;
    let sortedTransactions = [...transactions];
    switch(sortValue) {
        case 'date-desc':
            sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'amount-desc':
            sortedTransactions.sort((a, b) => b.amount - a.amount);
            break;
        case 'amount-asc':
            sortedTransactions.sort((a, b) => a.amount - b.amount);
            break;
    }
    displayTransactions(sortedTransactions);
}

function filterTransactions() {
    const dateFilter = document.getElementById('date-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const sortValue = document.getElementById('sort-filter').value;
    let filteredTransactions = transactions;            
    if (dateFilter !== 'all') {
        const today = new Date();
        filteredTransactions = filteredTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            switch(dateFilter) {
                case 'month':
                    return transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear();
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return transactionDate >= weekAgo;
                case 'day':
                    return transactionDate.toDateString() === today.toDateString();
            }
        });
    }
    if (typeFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.type === typeFilter
        );
    }
    if (categoryFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.category.toLowerCase() === categoryFilter
        );
    }

    switch(sortValue) {
        case 'date-desc':
            filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'amount-desc':
            filteredTransactions.sort((a, b) => b.amount - a.amount);
            break;
        case 'amount-asc':
            filteredTransactions.sort((a, b) => a.amount - b.amount);
            break;
    }
    displayTransactions(filteredTransactions);
}

function viewReports() {
    const dateFilter = document.getElementById('date-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    
    let filteredTransactions = transactions.filter(transaction => {
        const date = new Date(transaction.date);
        const today = new Date();
        
        if (dateFilter !== 'all') {
            if (dateFilter === 'month' && (date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()))
                return false;
            if (dateFilter === 'week') {
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                if (date < weekAgo) return false;
            }
            if (dateFilter === 'day' && date.toDateString() !== today.toDateString())
                return false;
        }
        if (typeFilter !== 'all' && transaction.type !== typeFilter)
            return false;
        if (categoryFilter !== 'all' && transaction.category !== categoryFilter)
            return false;
        return true;
    });

    const sortValue = document.getElementById('sort-filter').value;
    switch(sortValue) {
        case 'date-desc':
            filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'amount-desc':
            filteredTransactions.sort((a, b) => b.amount - a.amount);
            break;
        case 'amount-asc':
            filteredTransactions.sort((a, b) => a.amount - b.amount);
            break;
    }

    const encodedData = encodeURIComponent(JSON.stringify(filteredTransactions));
    window.location.href = `reports.html?data=${encodedData}`;
}
document.getElementById('sort-filter').value = 'date-desc';
displayTransactions();
