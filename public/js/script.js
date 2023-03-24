const purchaseTableBody = document.querySelector('table tbody');
const totalPurchasesElement = document.querySelector('#totalPurchases');
const totalExpensesElement = document.querySelector('#totalExpenses');
const balanceElement = document.querySelector('#balance');
const form = document.querySelector('form');

let purchases = [];

function addPurchase(event) {
  event.preventDefault();

  const buyerName = document.querySelector('#buyerName').value;
  const productName = document.querySelector('#productName').value;
  const quantity = parseInt(document.querySelector('#quantity').value);
  const price = parseFloat(document.querySelector('#price').value);

  const purchase = {
    date: new Date().toLocaleDateString(),
    buyerName,
    productName,
    quantity,
    price,
    total: quantity * price
  };

  purchases.push(purchase);

  displayPurchases();
  updateTotals();
  resetForm();
}

function displayPurchases() {
  purchaseTableBody.innerHTML = '';

  for (const purchase of purchases) {
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = purchase.date;
    row.appendChild(dateCell);

    const buyerNameCell = document.createElement('td');
    buyerNameCell.textContent = purchase.buyerName;
    row.appendChild(buyerNameCell);

    const productNameCell = document.createElement('td');
    productNameCell.textContent = purchase.productName;
    row.appendChild(productNameCell);

    const quantityCell = document.createElement('td');
    quantityCell.textContent = purchase.quantity;
    row.appendChild(quantityCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = purchase.price.toFixed(2);
    row.appendChild(priceCell);

    const totalCell = document.createElement('td');
    totalCell.textContent = purchase.total.toFixed(2);
    row.appendChild(totalCell);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', () => deletePurchase(purchase));
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    purchaseTableBody.appendChild(row);
  }
}





function deletePurchase(purchaseToDelete) {
  purchases = purchases.filter(purchase => purchase !== purchaseToDelete);
  displayPurchases();
  updateTotals();
}

function updateTotals() {
  const totalPurchases = purchases.reduce((acc, purchase) => acc + purchase.quantity, 0);
  totalPurchasesElement.textContent = totalPurchases;

  const totalExpenses = purchases.reduce((acc, purchase) => acc + purchase.total, 0);
  totalExpensesElement.textContent = totalExpenses.toFixed(2);

  const balance = totalPurchases - totalExpenses;
  balanceElement.textContent = balance.toFixed(2);
}

function resetForm() {
  form.reset();
}

form.addEventListener('submit', addPurchase);
