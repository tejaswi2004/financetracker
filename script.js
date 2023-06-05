let transactions = [];

// Function to add a new transaction
function addTransaction(e) {
  e.preventDefault();

  // Get form values
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  // Check if expense is greater than current balance
  if (type === 'expense' && amount > getCurrentBalance()) {
    alert('Invalid transaction: Expense cannot be greater than current balance.');
    document.getElementById('description').value = '';
  document.getElementById('amount').value = '';

    return;
  }

  // Create new transaction object
  const transaction = {
    description,
    amount,
    type
  };

  // Add the transaction to the array
  transactions.push(transaction);

  // Clear form inputs
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';

  // Update the transaction list
  updateTransactionList();

  // Update the balance
  updateBalance();
}

// Function to update the transaction list
function updateTransactionList() {
  const transactionList = document.getElementById('transactionList');
  const fragment = document.createDocumentFragment();

  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    const description = document.createElement('span');
    description.textContent = transaction.description;

    const amount = document.createElement('span');
    amount.textContent = formatCurrency(transaction.amount);
    amount.classList.add('transaction-amount'); // Add CSS class to amount element

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTransaction(transaction));

    listItem.appendChild(description);
    listItem.appendChild(amount);
    listItem.appendChild(deleteButton);

    fragment.appendChild(listItem);
  });

  // Replace the existing transaction list with the new fragment
  transactionList.innerHTML = '';
  transactionList.appendChild(fragment);
}

// Function to delete a transaction
function deleteTransaction(transaction) {
  const index = transactions.indexOf(transaction);
  if (index > -1) {
    transactions.splice(index, 1);
    updateTransactionList();
    updateBalance();
  }
}

// Function to format currency
function formatCurrency(amount) {
  return 'Rs.' + amount.toFixed(2);
}

// Function to calculate the current balance
function getCurrentBalance() {
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
  return totalIncome - totalExpense;
}

// Function to update the balance
function updateBalance() {
  const balance = document.getElementById('balance');
  const currentBalance = getCurrentBalance();
  balance.textContent = formatCurrency(currentBalance);
}

// Add event listener to the form
const transactionForm = document.getElementById('transactionForm');
transactionForm.addEventListener('submit', addTransaction);
