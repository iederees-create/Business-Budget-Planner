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

    // Function to handle file upload and parse the budget data
    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            parseBudgetData(jsonData);
        };
        reader.readAsBinaryString(file);
    }

    // Function to parse and load the budget data from the uploaded file
    function parseBudgetData(data) {
        incomeCategories = [];
        expenseCategories = [];

        const incomeSection = document.getElementById('income-section');
        const expenseSection = document.getElementById('expense-section');

        incomeSection.innerHTML = '<h2>Income</h2>';
        expenseSection.innerHTML = '<h2>Expenses</h2>';

        data.forEach(row => {
            if (row[0] === 'Income') {
                const newDiv = document.createElement('div');
                newDiv.className = 'category';
                const newInputCategory = document.createElement('input');
                newInputCategory.type = 'text';
                newInputCategory.value = row[1];
                const newInputAmount = document.createElement('input');
                newInputAmount.type = 'number';
                newInputAmount.className = 'income-amount';
                newInputAmount.value = row[2];
                newDiv.appendChild(newInputCategory);
                newDiv.appendChild(newInputAmount);
                incomeSection.appendChild(newDiv);
                incomeCategories.push(newInputAmount);
                newInputAmount.addEventListener('input', updateSummary);
            } else if (row[0] === 'Expense') {
                const newDiv = document.createElement('div');
                newDiv.className = 'category';
                const newInputCategory = document.createElement('input');
                newInputCategory.type = 'text';
                newInputCategory.value = row[1];
                const newInputAmount = document.createElement('input');
                newInputAmount.type = 'number';
                newInputAmount.className = 'expense-amount';
                newInputAmount.value = row[2];
                newDiv.appendChild(newInputCategory);
                newDiv.appendChild(newInputAmount);
                expenseSection.appendChild(newDiv);
                expenseCategories.push(newInputAmount);
                newInputAmount.addEventListener('input', updateSummary);
            }
        });

        updateSummary();
    }

    document.getElementById('file-input').addEventListener('change', handleFileUpload);
    document.getElementById('add-income').addEventListener('click', addIncomeCategory);
    document.getElementById('add-expense').addEventListener('click', addExpenseCategory);

    incomeCategories.forEach(input => input.addEventListener('input', updateSummary));
    expenseCategories.forEach(input => input.addEventListener('input', updateSummary));

    updateSummary();
});
