document.addEventListener('DOMContentLoaded', function() {
    const incomeSection = document.getElementById('income-section');
    const expenseSection = document.getElementById('expense-section');
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpensesEl = document.getElementById('total-expenses');
    const netProfitLossEl = document.getElementById('net-profit-loss');
    const profitMarginEl = document.getElementById('profit-margin');
    const addIncomeCategoryBtn = document.getElementById('add-income-category');
    const addExpenseCategoryBtn = document.getElementById('add-expense-category');
    const incomeAmountEls = document.querySelectorAll('.income-amount');
    const expenseAmountEls = document.querySelectorAll('.expense-amount');

    let incomeCategories = [...incomeAmountEls];
    let expenseCategories = [...expenseAmountEls];

    incomeCategories.forEach(el => el.addEventListener('input', updateSummary));
    expenseCategories.forEach(el => el.addEventListener('input', updateSummary));

    addIncomeCategoryBtn.addEventListener('click', () => addCategory(incomeSection, incomeCategories, 'income'));
    addExpenseCategoryBtn.addEventListener('click', () => addCategory(expenseSection, expenseCategories, 'expense'));

    document.getElementById('file-upload').addEventListener('change', handleFileUpload);

    function addCategory(section, categories, type) {
        const newDiv = document.createElement('div');
        newDiv.className = 'category';
        const newInputCategory = document.createElement('input');
        newInputCategory.type = 'text';
        const newInputAmount = document.createElement('input');
        newInputAmount.type = 'number';
        newInputAmount.className = type + '-amount';
        newDiv.appendChild(newInputCategory);
        newDiv.appendChild(newInputAmount);
        section.appendChild(newDiv);
        categories.push(newInputAmount);
        newInputAmount.addEventListener('input', updateSummary);
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const incomeSheet = workbook.Sheets['Income'];
            const incomeData = XLSX.utils.sheet_to_json(incomeSheet, { header: 1 });
            processIncomeData(incomeData);

            const expenseSheet = workbook.Sheets['Expenses'];
            const expenseData = XLSX.utils.sheet_to_json(expenseSheet, { header: 1 });
            processExpenseData(expenseData);

            updateSummary();
        };

        reader.readAsArrayBuffer(file);
    }

    function processIncomeData(data) {
        incomeSection.innerHTML = '<h2>Income</h2>';
        incomeCategories = [];

        data.slice(1).forEach((row) => {
            if (
