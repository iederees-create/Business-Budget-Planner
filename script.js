
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

    // Line chart initialization
    const ctxLine = document.getElementById('line-chart').getContext('2d');
    const lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Income',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            }, {
                label: 'Expenses',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
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
                    text: 'Income & Expenses Over Time'
                }
            }
        }
    });

    // Bar chart initialization
    const ctxBar = document.getElementById('bar-chart').getContext('2d');
    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Income',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
                    text: 'Income vs Expenses Comparison'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to calculate and update summary and charts
    function updateSummary() {
        let totalIncome = 0;
        let totalExpenses = 0;

        incomeCategories.forEach(input => {
            totalIncome += parseFloat(input.value) || 0;
        });

        expenseCategories.forEach(input => {
            totalExpenses += parseFloat(input.value) || 0;
        });

        const netProfit = totalIncome - totalExpenses;
        const profitMargin = totalIncome ? (netProfit / totalIncome) * 100 : 0;

        document.getElementById('total-income').innerText = `R${totalIncome.toFixed(2)}`;
        document.getElementById('total-expenses').innerText = `R${totalExpenses.toFixed(2)}`;
        document.getElementById('net-profit').innerText = `R${netProfit.toFixed(2)}`;
        document.getElementById('profit-margin').innerText = `${profitMargin.toFixed(2)}%`;

        updateCharts(totalIncome, totalExpenses);
    }

    // Function to update charts
    function updateCharts(totalIncome, totalExpenses) {
        const incomeData = [];
        const expenseData = [];
        const incomeLabels = [];
        const expenseLabels = [];

        incomeCategories.forEach((input, index) => {
            incomeData.push(parseFloat(input.value) || 0);
            const label = input.previousElementSibling.value || `Income ${index + 1}`;
            incomeLabels.push(label);
        });

        expenseCategories.forEach((input, index) => {
            expenseData.push(parseFloat(input.value) || 0);
            const label = input.previousElementSibling.value || `Expense ${index + 1}`;
            expenseLabels.push(label);
        });

        // Update budget distribution pie chart
        budgetChart.data.labels = [...incomeLabels, ...expenseLabels];
        budgetChart.data.datasets[0].data = [...incomeData, ...expenseData];
        budgetChart.update();

        // Update line chart
        lineChart.data.datasets[0].data = incomeData;
        lineChart.data.datasets[1].data = expenseData;
        lineChart.update();

        // Update bar chart
        barChart.data.labels = [...incomeLabels, ...expenseLabels];
        barChart.data.datasets[0].data = incomeData;
        barChart.data.datasets[1].data = expenseData;
        barChart.update();
    }

    // Add initial event listeners for existing input fields
    incomeCategories.forEach(input => {
        input.addEventListener('input', updateSummary);
    });

    expenseCategories.forEach(input => {
        input.addEventListener('input', updateSummary);
    });

    // Initial summary update
    updateSummary();
});
