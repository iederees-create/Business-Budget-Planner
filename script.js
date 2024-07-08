document.addEventListener('DOMContentLoaded', function() {
    // Your existing code...

    // Handle file upload
    document.getElementById('file-upload').addEventListener('change', handleFileUpload);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Parse income data
            const incomeSheet = workbook.Sheets['Income'];
            const incomeData = XLSX.utils.sheet_to_json(incomeSheet, { header: 1 });
            processIncomeData(incomeData);

            // Parse expense data
            const expenseSheet = workbook.Sheets['Expenses'];
            const expenseData = XLSX.utils.sheet_to_json(expenseSheet, { header: 1 });
            processExpenseData(expenseData);

            // Update summary and charts
            updateSummary();
        };

        reader.readAsArrayBuffer(file);
    }

    function processIncomeData(data) {
        const incomeSection = document.getElementById('income-section');
        incomeSection.innerHTML = ''; // Clear existing inputs
        incomeCategories = [];

        data.slice(1).forEach((row, index) => {
            if (row.length >= 2) {
                const [category, amount] = row;
                const newDiv = document.createElement('div');
                newDiv.className = 'category';
                const newInputCategory = document.createElement('input');
                newInputCategory.type = 'text';
                newInputCategory.value = category;
                const newInputAmount = document.createElement('input');
                newInputAmount.type = 'number';
                newInputAmount.className = 'income-amount';
                newInputAmount.value = amount;
                newDiv.appendChild(newInputCategory);
                newDiv.appendChild(newInputAmount);
                incomeSection.appendChild(newDiv);
                incomeCategories.push(newInputAmount);
                newInputAmount.addEventListener('input', updateSummary);
            }
        });
    }

    function processExpenseData(data) {
        const expenseSection = document.getElementById('expense-section');
        expenseSection.innerHTML = ''; // Clear existing inputs
        expenseCategories = [];

        data.slice(1).forEach((row, index) => {
            if (row.length >= 2) {
                const [category, amount] = row;
                const newDiv = document.createElement('div');
                newDiv.className = 'category';
                const newInputCategory = document.createElement('input');
                newInputCategory.type = 'text';
                newInputCategory.value = category;
                const newInputAmount = document.createElement('input');
                newInputAmount.type = 'number';
                newInputAmount.className = 'expense-amount';
                newInputAmount.value = amount;
                newDiv.appendChild(newInputCategory);
                newDiv.appendChild(newInputAmount);
                expenseSection.appendChild(newDiv);
                expenseCategories.push(newInputAmount);
                newInputAmount.addEventListener('input', updateSummary);
            }
        });
    }

    // Your existing updateSummary and updateCharts functions...

});
