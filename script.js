document.addEventListener('DOMContentLoaded', function() {
    // Initialize arrays with initial income and expense inputs
    const incomeInputs = document.querySelectorAll('.income-amount');
    const expenseInputs = document.querySelectorAll('.expense-amount');

    let incomeCategories = Array.from(incomeInputs);
    let expenseCategories = Array.from(expenseInputs);

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
        newInputAmount.addEventListener('input', updateSummary);
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
        newInputAmount.addEventListener('input', updateSummary);
    }

    // Event listeners for adding categories
    document.getElementById('add-income').addEventListener('click', addIncomeCategory);
    document.getElementById('add-expense').addEventListener('click', addExpenseCategory);

    // Chart initialization
    const ctx = document.getElementById('budget-chart').getContext('2d');
    const budgetChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'Budget Distribution',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Budget Distribution'
                }
            }
        }
    });

    // Function to calculate and update summary
   
