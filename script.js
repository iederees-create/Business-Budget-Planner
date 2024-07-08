document.addEventListener('DOMContentLoaded', function() {
    // Initialize empty arrays for income and expense categories
    let incomeCategories = [];
    let expenseCategories = [];

    // Function to add income category input fields
    function addIncomeCategory() {
        const incomeSection = document.getElementById('income-section');
        const newDiv = document.createElement('div');
        newDiv.className = 'category';
        const newInputCategory = document.createElement('input');
        newInputCategory.type = 'text';
        newInputCategory.placeholder = 'Enter Income Category';
        const newInputAmount = document.createElement('input');
        newInputAmount.type = 'number';
        newInputAmount.className = 'income-amount';
        newInputAmount.placeholder = 'Amount (ZAR)';
        newDiv.appendChild(newInputCategory);
        newDiv.appendChild(newInputAmount);
        incomeSection.appendChild(newDiv);
        incomeCategories.push(newInputAmount);
    }

    // Function to add expense category input fields
    function addExpenseCategory() {
        const expenseSection = document.getElementById('expense-section');
        const newDiv = document.createElement('div');
        newDiv.className = 'category';
        const newInputCategory = document.createElement('input');
        newInputCategory.type = 'text';
        newInputCategory.placeholder = 'Enter Expense Category';
        const newInputAmount = document.createElement('input');
        newInputAmount.type = 'number';
        newInputAmount.className = 'expense-amount';
        newInputAmount.placeholder = 'Amount (ZAR)';
        newDiv.appendChild(newInputCategory);
        newDiv.appendChild(newInputAmount);
        expenseSection.appendChild(newDiv);
        expenseCategories.push(newInputAmount);
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

        // Update Chart
        updateChart(totalIncome, totalExpenses);
    }

    //
