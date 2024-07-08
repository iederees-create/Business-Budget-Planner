document.addEventListener('DOMContentLoaded', function() {
    // Initialize empty arrays for income and expense categories
    let incomeCategories = [];
    let expenseCategories = [];

    // Function to add income category input fields
    function addIncomeCategory() {
        const incomeSection = document.getElementById('income-section');
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'Enter Income Category';
        incomeSection.appendChild(newInput);
        incomeCategories.push(newInput);
    }

    // Function to add expense category input fields
    function addExpenseCategory() {
        const expenseSection = document.getElementById('expense-section');
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'Enter Expense Category';
        expenseSection.appendChild(newInput);
        expenseCategories.push(newInput);
    }

    // Event listeners for adding categories
    document.getElementById('add-income').addEventListener('click', addIncomeCategory);
    document.getElementById('add-expense').addEventListener('click', addExpenseCategory);

    // Function to calculate and update summary
    function updateSummary() {
        let totalIncome = 0;
        let totalExpenses = 0;

        // Calculate total income
        incomeCategories.forEach(input => {
            const value = parseFloat(input.value) || 0;
            totalIncome += value;
        });

        // Calculate total expenses
        expenseCategories.forEach(input => {
            const value = parseFloat(input.value) || 0;
            totalExpenses += value;
        });

        // Update HTML with calculated values
        document.getElementById('total-income').textContent = totalIncome.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
        document.getElementById('total-expenses').textContent = totalExpenses.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });

        const netProfit = totalIncome - totalExpenses;
        document.getElementById('net-profit').textContent = netProfit.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });

        const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;
        document.getElementById('profit-margin').textContent = profitMargin.toFixed(2) + '%';
    }

    // Call updateSummary on input change
    document.addEventListener('input', updateSummary);

    // Chart.js example for creating a pie chart
    const ctx = document.getElementById('budget-chart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Budget Overview',
                data: [totalIncome, totalExpenses],
                backgroundColor: ['#007bff', '#dc3545'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
});
