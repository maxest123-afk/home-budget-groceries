// ============================================
// THE STASH — App Logic
// ============================================

let currentScreen = 'welcome';
let appState = {
    budget: JSON.parse(JSON.stringify(APP_DATA.budget)),
    groceries: JSON.parse(JSON.stringify(APP_DATA.groceries)),
};

const backBtn = document.getElementById('backBtn');

document.addEventListener('DOMContentLoaded', () => {
    loadStateFromStorage();
    displayQuote();
    setupEventListeners();
    renderScreen('welcome');
});

function setupEventListeners() {
    document.querySelectorAll('[data-screen]').forEach(btn => {
        btn.addEventListener('click', () => renderScreen(btn.dataset.screen));
    });

    backBtn.addEventListener('click', () => {
        // Detail screens go back to their menu; menus go back to welcome
        const backMap = {
            budgetCombined: 'budget',
            budgetMax: 'budget',
            budgetCarrie: 'budget',
            budgetBukhosi: 'budget',
            groceriesHome: 'groceries',
            groceriesBukhosi: 'groceries',
            budget: 'welcome',
            groceries: 'welcome',
        };
        renderScreen(backMap[currentScreen] || 'welcome');
    });

    document.getElementById('brandHome').addEventListener('click', () => renderScreen('welcome'));
    document.getElementById('newQuoteBtn').addEventListener('click', displayQuote);

    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('receipt-checkbox')) {
            handleCheckboxChange(e.target);
        }
    });
}

function renderScreen(screenName) {
    currentScreen = screenName;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenName + 'Screen');
    if (screen) screen.classList.add('active');

    backBtn.classList.toggle('show', screenName !== 'welcome');

    switch (screenName) {
        case 'budget': renderBudgetMenu(); break;
        case 'groceries': renderGroceriesMenu(); break;
        case 'budgetCombined': renderCombinedBudget(); break;
        case 'budgetMax': renderBudgetDetail('max'); break;
        case 'budgetCarrie': renderBudgetDetail('carrie'); break;
        case 'budgetBukhosi': renderBudgetDetail('bukhosi'); break;
        case 'groceriesHome': renderGroceryDetail('home'); break;
        case 'groceriesBukhosi': renderGroceryDetail('bukhosi'); break;
    }

    document.querySelector('.app-main').scrollTop = 0;
    saveStateToStorage();
}

// ---------- Menus ----------
function renderBudgetMenu() {
    const maxTotal = getTotal(appState.budget.max);
    const carrieTotal = getTotal(appState.budget.carrie);
    const bukhositotal = getTotal(appState.budget.bukhosi);
    const combinedTotal = maxTotal + carrieTotal + bukhositotal;

    setText('maxTotal', fmt(maxTotal));
    setText('carrieTotal', fmt(carrieTotal));
    setText('bukhositotal', fmt(bukhositotal));
    setText('combinedTotal', fmt(combinedTotal));
}

function renderGroceriesMenu() {
    setText('homeGrocTotal', fmt(getGroceryTotal(appState.groceries.home)));
    setText('bukhositgrocTotal', fmt(getGroceryTotal(appState.groceries.bukhosi)));
}

// ---------- Budget detail / combined ----------
function renderCombinedBudget() {
    const all = [
        ...appState.budget.max.map(i => ({ ...i, person: 'max' })),
        ...appState.budget.carrie.map(i => ({ ...i, person: 'carrie' })),
        ...appState.budget.bukhosi.map(i => ({ ...i, person: 'bukhosi' })),
    ];
    renderBudgetList('combinedBudgetList', all, 'combined');
    updateBudgetTotals('combined', all);
}

function renderBudgetDetail(person) {
    const items = appState.budget[person];
    const listId = person + 'BudgetList';
    renderBudgetList(listId, items, person);
    updateBudgetTotals(person, items);
}

function renderBudgetList(listId, items, scope) {
    const list = document.getElementById(listId);
    list.innerHTML = '';

    if (items.length === 0) {
        list.innerHTML = '<div class="receipt-empty">NOTHING HERE YET.</div>';
        return;
    }

    const grouped = {};
    items.forEach(item => {
        (grouped[item.category] = grouped[item.category] || []).push(item);
    });

    Object.entries(grouped).forEach(([category, catItems]) => {
        const catEl = document.createElement('div');
        catEl.className = 'receipt-cat';
        catEl.textContent = category;
        list.appendChild(catEl);

        catItems.forEach(item => list.appendChild(buildBudgetRow(item, scope)));
    });
}

function buildBudgetRow(item, scope) {
    const row = document.createElement('div');
    row.className = 'receipt-item' + (item.paid ? ' checked' : '');

    let pill = '';
    if (scope === 'combined' && item.person) {
        pill = `<span class="person-pill">${item.person}</span>`;
    }

    row.innerHTML = `
        <span class="receipt-checkbox-wrap">
            <input type="checkbox" class="receipt-checkbox" data-id="${item.id}" data-person="${scope}" ${item.paid ? 'checked' : ''}>
        </span>
        <span class="receipt-item-body">
            <div class="receipt-item-name">${pill}${item.name}</div>
            <div class="receipt-item-meta">${item.category}</div>
        </span>
        <span class="receipt-item-price">${fmt(item.amount)}</span>
    `;
    return row;
}

function updateBudgetTotals(scope, items) {
    const total = items.reduce((s, i) => s + i.amount, 0);
    const paid = items.filter(i => i.paid).reduce((s, i) => s + i.amount, 0);
    const outstanding = total - paid;

    setText(scope + 'Paid', fmt(paid));
    setText(scope + 'Outstanding', fmt(outstanding));
}

// ---------- Groceries ----------
function renderGroceryDetail(type) {
    const categories = appState.groceries[type];
    const listId = type === 'home' ? 'homeGroceriesList' : 'bukhosGroceriesList';
    const list = document.getElementById(listId);
    list.innerHTML = '';

    categories.forEach(cat => {
        const catEl = document.createElement('div');
        catEl.className = 'receipt-cat';
        catEl.textContent = cat.category;
        list.appendChild(catEl);

        cat.items.forEach(item => list.appendChild(buildGroceryRow(item, type)));
    });

    updateGroceryTotals(type, categories);
}

function buildGroceryRow(item, type) {
    const row = document.createElement('div');
    row.className = 'receipt-item' + (item.purchased ? ' checked' : '');

    row.innerHTML = `
        <span class="receipt-checkbox-wrap">
            <input type="checkbox" class="receipt-checkbox" data-id="${item.id}" data-type="${type}" ${item.purchased ? 'checked' : ''}>
        </span>
        <span class="receipt-item-body">
            <div class="receipt-item-name">${item.name}</div>
            <div class="receipt-item-meta">${item.qty} &times; ${fmt(item.price)}</div>
        </span>
        <span class="receipt-item-price">${fmt(item.total)}</span>
    `;
    return row;
}

function updateGroceryTotals(type, categories) {
    const total = getGroceryTotal(categories);
    const purchased = categories.reduce((sum, cat) =>
        sum + cat.items.filter(i => i.purchased).reduce((s, i) => s + i.total, 0), 0);
    const remaining = total - purchased;

    const purchasedId = type === 'home' ? 'homePurchased' : 'bukhosGrocPurchased';
    const remainingId = type === 'home' ? 'homeRemaining' : 'bukhosGrocRemaining';

    setText(purchasedId, fmt(purchased));
    setText(remainingId, fmt(remaining));
}

// ---------- Checkbox handling ----------
function handleCheckboxChange(checkbox) {
    const id = checkbox.dataset.id;
    const person = checkbox.dataset.person;
    const type = checkbox.dataset.type;

    if (person) {
        if (person === 'combined') {
            const all = [...appState.budget.max, ...appState.budget.carrie, ...appState.budget.bukhosi];
            const item = all.find(i => i.id == id);
            if (item) item.paid = checkbox.checked;

            checkbox.closest('.receipt-item').classList.toggle('checked', checkbox.checked);
            updateBudgetTotals('combined', all);
        } else {
            const item = appState.budget[person].find(i => i.id == id);
            if (item) item.paid = checkbox.checked;

            checkbox.closest('.receipt-item').classList.toggle('checked', checkbox.checked);
            updateBudgetTotals(person, appState.budget[person]);
        }
    } else if (type) {
        const categories = appState.groceries[type];
        for (const cat of categories) {
            const item = cat.items.find(i => i.id === id);
            if (item) {
                item.purchased = checkbox.checked;
                break;
            }
        }
        checkbox.closest('.receipt-item').classList.toggle('checked', checkbox.checked);
        updateGroceryTotals(type, categories);
    }

    saveStateToStorage();
}

// ---------- Quotes ----------
function displayQuote() {
    const quote = APP_DATA.quotes[Math.floor(Math.random() * APP_DATA.quotes.length)];
    const el = document.getElementById('dailyQuote');
    if (el) el.textContent = `"${quote}"`;
}

// ---------- Helpers ----------
function getTotal(items) {
    return items.reduce((sum, item) => sum + item.amount, 0);
}

function getGroceryTotal(categories) {
    return categories.reduce((sum, cat) =>
        sum + cat.items.reduce((s, i) => s + i.total, 0), 0);
}

function fmt(amount) {
    return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// ---------- Storage ----------
function saveStateToStorage() {
    localStorage.setItem('thestash_state', JSON.stringify(appState));
}

function loadStateFromStorage() {
    const stored = localStorage.getItem('thestash_state');
    if (stored) {
        try {
            appState = JSON.parse(stored);
        } catch (e) {
            console.error('Could not load saved state:', e);
        }
    }
}
