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

    // Function to calculate and update the summary
    function updateSummary() {
        const totalIncome = incomeCategories.reduce((sum, input) => sum + Number(input.value), 0);
        const totalExpenses = expenseCategories.reduce((sum, input) => sum + Number(input.value), 0);
        const netProfit = totalIncome - totalExpenses;
        const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

        document.getElementById('total-income').innerText = `R${totalIncome.toFixed(2)}`;
        document.getElementById('total-expenses').innerText = `R${totalExpenses.toFixed(2)}`;
        document.getElementById('net-profit').innerText = `R${netProfit.toFixed(2)}`;
        document.getElementById('profit-margin').innerText = `${profitMargin.toFixed(2)}%`;

        updateChart(totalIncome, totalExpenses);
        updateLineChart(incomeCategories, expenseCategories);
        updateBarChart(totalIncome, totalExpenses);
    }

    // Function to update the budget distribution chart
    function updateChart(totalIncome, totalExpenses) {
        const ctx = document.getElementById('budget-chart').getContext('2d');
        if (window.budgetChart) {
            window.budgetChart.destroy();
        }
        window.budgetChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    data: [totalIncome, totalExpenses],
                    backgroundColor: ['#36A2EB', '#FF6384']
                }]
            }
        });
    }

    // Function to update the income and expenses over time chart
    function updateLineChart(incomeCategories, expenseCategories) {
        const ctx = document.getElementById('line-chart').getContext('2d');
        const incomeData = incomeCategories.map(input => Number(input.value));
        const expenseData = expenseCategories.map(input => Number(input.value));
        const labels = incomeCategories.map((_, index) => `Category ${index + 1}`);
        
        if (window.lineChart) {
            window.lineChart.destroy();
        }
        
        window.lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        borderColor: '#36A2EB',
                        fill: false
                    },
                    {
                        label: 'Expenses',
                        data: expenseData,
                        borderColor: '#FF6384',
                        fill: false
                    }
                ]
            }
        });
    }

    // Function to update the income vs expenses comparison chart
    function updateBarChart(totalIncome, totalExpenses) {
        const ctx = document.getElementById('bar-chart').getContext('2d');
        
        if (window.barChart) {
            window.barChart.destroy();
        }
        
        window.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    label: 'Amount (ZAR)',
                    data: [totalIncome, totalExpenses],
                    backgroundColor: ['#36A2EB', '#FF6384']
                }]
            }
        });
    }

    document.getElementById('add-income').addEventListener('click', addIncomeCategory);
    document.getElementById('add-expense').addEventListener('click', addExpenseCategory);

    incomeCategories.forEach(input => input.addEventListener('input', updateSummary));
    expenseCategories.forEach(input => input.addEventListener('input', updateSummary));

    updateSummary();

    // Product catalog data
    const products = [
        {
            name: "Monthly Budget Planner",
            description: "A comprehensive monthly budget planner to track income, expenses, and savings.",
            features: "Income tracking, Expense tracking, Savings goal",
            price: "$10",
            url: "Link to Buy"
        },
        {
            name: "Cash Flow Statement",
            description: "Monitor the cash flow in and out of your business.",
            features: "Cash inflow, Cash outflow, Net cash flow",
            price: "$15",
            url: "Link to Buy"
        },
        {
            name: "Expense Tracker",
            description: "Simple and accessible way to track daily expenses.",
            features: "Expense logging, Categories, Summaries",
            price: "$8",
            url: "Link to Buy"
        },
        {
            name: "Sales and Revenue Tracker",
            description: "Track sales performance and revenue over time.",
            features: "Sales logging, Revenue tracking, Trend analysis",
            price: "$12",
            url: "Link to Buy"
        },
        {
            name: "Project Management Dashboard",
            description: "Manage and track project progress, deadlines, and tasks.",
            features: "Task tracking, Deadline management, Progress visualization",
            price: "$20",
            url: "Link to Buy"
        },
        {
            name: "KPI Dashboard",
            description: "Visual dashboard to track key performance indicators (KPIs) and metrics.",
            features: "KPI visualization, Metrics tracking, Trend analysis",
            price: "$18",
            url: "Link to Buy"
        },
        {
            name: "Inventory Management",
            description: "Track inventory levels, purchases, and sales.",
            features: "Stock levels, Purchases, Sales, Alerts for low stock",
            price: "$14",
            url: "Link to Buy"
        },
        {
            name: "Marketing Campaign Tracker",
            description: "Plan, execute, and track marketing campaigns.",
            features: "Campaign planning, Performance tracking, Analytics",
            price: "$16",
            url: "Link to Buy"
        },
        {
            name: "CRM Template",
            description: "Manage customer information, interactions, and sales pipelines.",
            features: "Customer data, Interaction logging, Sales pipeline",
            price: "$22",
            url: "Link to Buy"
        },
        {
            name: "Employee Timesheet",
            description: "Log working hours and manage payroll.",
            features: "Hour logging, Overtime calculation, Payroll management",
            price: "$10",
            url: "Link to Buy"
        }
    ];

    // Populate product catalog
    const productTableBody = document.getElementById('product-table-body');
    if (productTableBody) {
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.features}</td>
                <td>${product.price}</td>
                <td><a href="${product.url}">Download/Buy</a></td>
            `;
            productTableBody.appendChild(row);
        });
    }
});
