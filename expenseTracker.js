const expenseTable = document.getElementById('expenseTable');
const expenseChart = document.getElementById('expenseChart');
const filterCategory = document.getElementById('filterCategory');
const filterDate = document.getElementById('filterDate');
const totalDisplay = document.getElementById('totalDisplay');
const budgetInput = document.getElementById('monthlyBudget');
const setBudgetButton = document.getElementById('setBudget');
const budgetStatus = document.getElementById('budgetStatus');
const budgetProgressBar = document.getElementById('budgetProgress');
const budgetProgressContainer = document.getElementById('budgetProgressContainer');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let monthlyBudget = JSON.parse(localStorage.getItem('monthlyBudget')) || 0;

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function saveBudget() {
  localStorage.setItem('monthlyBudget', JSON.stringify(monthlyBudget));
}

// adding an expense
document.getElementById('addExpense').addEventListener('click', () => {
  const name = document.getElementById('expenseName').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;
  const date = document.getElementById('expenseDate').value;

  if (!name || !amount || !category || !date) {
    alert('Please fill all fields!');
    return;
  }

  const expense = { name, amount, category, date };
  expenses.push(expense); 
  saveExpenses(); 
  updateTable();
  updateChart(); 

  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';
  document.getElementById('expenseCategory').value = 'Food';
  document.getElementById('expenseDate').value = '';
});


//generate pdf 
document.getElementById('generatePDF').addEventListener('click', () => {
  const currentMonth = filterDate.value;
  if (!currentMonth) {
    alert('Please select a month to generate the report.');
    return;
  }

  const filteredExpenses = expenses.filter(expense => expense.date.startsWith(currentMonth));
  if (filteredExpenses.length === 0) {
    alert('No expenses found for the selected month.');
    return;
  }

  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Convert "2024-12" to "December 2024"
  const [year, month] = currentMonth.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const formattedMonth = `${monthNames[parseInt(month) - 1]} ${year}`;


  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Expense Report for ${formattedMonth}`, 10, 10);

  doc.setFontSize(12);
  doc.text('Date', 10, 30);
  doc.text('Name', 40, 30);
  doc.text('Category', 90, 30);
  doc.text('Amount ($)', 150, 30);

  let yPosition = 40;
  filteredExpenses.forEach(expense => {
    doc.text(expense.date, 10, yPosition);
    doc.text(expense.name, 40, yPosition);
    doc.text(expense.category, 90, yPosition);
    doc.text(expense.amount.toFixed(2), 150, yPosition);
    yPosition += 10;
  });

  doc.setFontSize(14);
  doc.text(`Total Expenses: $${total.toFixed(2)}`, 10, yPosition + 10);
  doc.save(`Expense_Report_${currentMonth}.pdf`);
});


// calculating the total expense
document.getElementById('calculateTotal').addEventListener('click', () => {
  const currentMonth = filterDate.value;
  if (!currentMonth) {
    alert('Please select a month to calculate the total expenses.');
    return;
  }

  // Filter expenses for the selected month
  const filteredExpenses = expenses.filter(expense => expense.date.startsWith(currentMonth));
  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  totalDisplay.textContent = `Total: $${total.toFixed(2)}`;

  // Update the chart 
  if (filteredExpenses.length > 0) {
    updateChart(filteredExpenses); 
    document.querySelector('.chart-container').style.display = 'block';
  } else {
    alert('No expenses found for the selected month.');
    document.querySelector('.chart-container').style.display = 'none';
  }

  // Budget validation
  updateBudgetStatus(total);
});

filterCategory.addEventListener('change', updateTable);
filterDate.addEventListener('input', updateTable);

function updateTable() {
  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = !filterCategory.value || expense.category === filterCategory.value;
    const matchesDate = !filterDate.value || expense.date.startsWith(filterDate.value);
    return matchesCategory && matchesDate;
  });

  expenseTable.innerHTML = ''; // Clears the table before rendering

  filteredExpenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td>
        <button onclick="editExpense(${index})" class="edit-button" >Edit</button>
        <button onclick="deleteExpense(${index})" class="delete-button">Delete</button>
      </td>
    `;
    expenseTable.appendChild(row);
  });
}

function editExpense(index) {
  const expense = expenses[index];
  document.getElementById('expenseName').value = expense.name;
  document.getElementById('expenseAmount').value = expense.amount;
  document.getElementById('expenseCategory').value = expense.category;
  document.getElementById('expenseDate').value = expense.date;

  expenses.splice(index, 1); 
  saveExpenses();
  updateTable();
  updateChart();                      // Update chart with the updated expenses
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  updateTable();
  updateChart();                               // Update chart after deletion
}

function sortTable(column) {
  if (column === 'name') {
    expenses.sort((a, b) => a.name.localeCompare(b.name));
  } else if (column === 'amount') {
    expenses.sort((a, b) => a.amount - b.amount);
  } else if (column === 'date') {
    expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  saveExpenses(); // Re-save the sorted data to localStorage
  updateTable();
  updateChart(); // Update chart after sorting
}

// Update chart with given expenses (filtered or entire list)
function updateChart(filteredExpenses = expenses) {
  if (filteredExpenses.length === 0) return; 

  const categories = [...new Set(filteredExpenses.map(expense => expense.category))];
  const categoryTotals = categories.map(category =>
    filteredExpenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  // Clear the old chart
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Create a new chart
  window.myChart = new Chart(expenseChart, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: categoryTotals,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        ],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  });
}

// Handle setting the budget
setBudgetButton.addEventListener('click', () => {
  const budget = parseFloat(budgetInput.value);
  if (isNaN(budget) || budget <= 0) {
    alert('Please enter a valid positive number for the budget.');
    return;
  }

  monthlyBudget = budget;
  saveBudget();                 
  updateBudgetStatus();
});

// Function to update budget status (remaining and progress)
function updateBudgetStatus(totalSpent = 0) {
  const remainingBudget = monthlyBudget - totalSpent;
  const progress = (totalSpent / monthlyBudget) * 100;

  if (monthlyBudget > 0) {
    budgetStatus.textContent = `Remaining Budget: $${remainingBudget.toFixed(2)} (${progress.toFixed(2)}% used)`;
    budgetProgressBar.style.width = `${progress}%`;   // Update the progress bar
    if (progress > 80) {
      budgetProgressBar.style.backgroundColor = '#FF6347'; // Red for 80% and above
    } else {
      budgetProgressBar.style.backgroundColor = '#4CAF50'; // Green for normal usage
    }
  } else {
    budgetStatus.textContent = 'Please set a budget to start tracking your expenses.';
    budgetProgressBar.style.width = '0%';
  }
}

// Initialize table, chart, and budget status on page load
updateTable();
updateChart();
updateBudgetStatus();
