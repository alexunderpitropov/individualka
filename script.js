/**
 * Массив для хранения всех транзакций.
 * @type {Array<Object>}
 */
let transactions = [];

/**
 * Обрабатывает отправку формы для добавления новой транзакции.
 * @param {Event} event - Событие отправки формы.
 */
function addTransaction(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const fullDescription = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const descriptionWords = fullDescription.split(" ");
    const shortDescription = descriptionWords.slice(0, 4).join(" ");

    const transaction = {
        id: transactions.length + 1,
        date,
        amount,
        category,
        description: shortDescription,
        fullDescription
    };

    transactions.push(transaction);
    appendTransactionToTable(transaction);
    calculateTotal();
}

/**
 * Добавляет переданную транзакцию в таблицу на странице.
 * @param {Object} transaction - Объект транзакции для добавления в таблицу.
 */
function appendTransactionToTable(transaction) {
    const tableBody = document.querySelector('#transactionTable tbody');
    const row = tableBody.insertRow();

    const amountClass = transaction.amount >= 0 ? 'positive' : 'negative';
    row.classList.add(amountClass);

    const deleteButton = `<button onclick="deleteTransaction(${transaction.id})">Удалить</button>`;

    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description}</td>
        <td>${deleteButton}</td>
    `;

    row.addEventListener('click', () => showTransactionDetails(transaction));
}

/**
 * Удаляет транзакцию по её ID и обновляет таблицу и общую сумму.
 * @param {number} id - ID транзакции, которую необходимо удалить.
 */
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    const tableBody = document.querySelector('#transactionTable tbody');
    tableBody.innerHTML = '';
    transactions.forEach(appendTransactionToTable);
    calculateTotal();
}

/**
 * Рассчитывает и отображает общую сумму всех транзакций.
 */
function calculateTotal() {
    const total = transactions.reduce((acc, t) => acc + t.amount, 0);
    const totalAmount = document.getElementById('totalAmount');
    totalAmount.innerText = `Итого: ${total.toFixed(2)}`;
}

/**
 * Отображает подробное описание транзакции.
 * @param {Object} transaction - Объект транзакции для отображения подробностей.
 */
function showTransactionDetails(transaction) {
    const detailsContainer = document.getElementById('detailedDescription');
    detailsContainer.innerHTML = `
        <p>ID: ${transaction.id}</p>
        <p>Дата: ${transaction.date}</p>
        <p>Сумма: ${transaction.amount}</p>
        <p>Категория: ${transaction.category}</p>
        <p>Описание: ${transaction.fullDescription}</p>
    `;
}

// Добавляем обработчик события для отправки формы
document.getElementById('transactionForm').addEventListener('submit', addTransaction);
