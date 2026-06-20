// ============================================
// THE STASH — App Logic
// Add Item + Search + Edit system
// ============================================

let currentScreen = 'welcome';
let appState = {
    budget: JSON.parse(JSON.stringify(APP_DATA.budget)),
    groceries: JSON.parse(JSON.stringify(APP_DATA.groceries)),
};

const backBtn = document.getElementById('backBtn');
const itemModal = document.getElementById('itemModal');
const itemForm = document.getElementById('itemForm');
const itemTargetScreen = document.getElementById('itemTargetScreen');
const itemCategory = document.getElementById('itemCategory');
const itemDescription = document.getElementById('itemDescription');
const itemPrice = document.getElementById('itemPrice');

document.addEventListener('DOMContentLoaded', () => {
    loadStateFromStorage();
    displayQuote();
    setupEventListeners();
    injectReceiptTools();
    renderScreen('welcome');
});

function setupEventListeners() {
    document.querySelectorAll('[data-screen]').forEach(btn => {
        btn.addEventListener('click', () => renderScreen(btn.dataset.screen));
    });

    backBtn.addEventListener('click', () => {
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

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-item-btn')) {
            openItemModal(e.target.dataset.screen);
        }

        if (e.target.classList.contains('edit-price-btn')) {
            handleEditPrice(e.target);
        }

        if (e.target.id === 'closeItemModal' || e.target.id === 'cancelItemModal') {
            closeItemModal();
        }

        if (e.target === itemModal) {
            closeItemModal();
        }
    });

    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('receipt-search')) {
            filterReceiptList(e.target.dataset.screen, e.target.value);
        }
    });

    itemForm.addEventListener('submit', handleAddItemSubmit);
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

    const main = document.querySelector('.app-main');
    if (main) main.scrollTop = 0;

    saveStateToStorage();
}

function injectReceiptTools() {
    const receiptScreens = [
        'budgetCombined',
        'budgetMax',
        'budgetCarrie',
        'budgetBukhosi',
        'groceriesHome',
        'groceriesBukhosi'
    ];

    receiptScreens.forEach(screenName => {
        const screen = document.getElementById(screenName + 'Screen');
        if (!screen) return;

        const paper = screen.querySelector('.receipt-paper');
        if (!paper) return;

        if (paper.querySelector('.receipt-tools')) return;

        const tools = document.createElement('div');
        tools.className = 'receipt-tools';
        tools.innerHTML = `
            <input 
                type="text" 
                class="receipt-search" 
                data-screen="${screenName}" 
                placeholder="SEARCH THIS RECEIPT..."
            >
            <button type="button" class="receipt-tool-btn add-item-btn" data-screen="${screenName}">
                NEW ITEM
            </button>
        `;

        const head = paper.querySelector('.receipt-head');
        if (head) {
            head.insertAdjacentElement('afterend', tools);
        }
    });
}

// ---------- Menus ----------
function renderBudgetMenu() {
    const maxTotal = getTotal(appState.budget.max);
    const carrieTotal = getTotal(appState.budget.carrie);
    const bukhosiTotal = getTotal(appState.budget.bukhosi);
    const combinedTotal = maxTotal + carrieTotal + bukhosiTotal;

    setText('maxTotal', fmt(maxTotal));
    setText('carrieTotal', fmt(carrieTotal));
    setText('bukhositotal', fmt(bukhosiTotal));
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

    if (!items.length) {
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
    row.dataset.search = `${item.category} ${item.name}`.toLowerCase();

    let pill = '';
    let personRef = scope;

    if (scope === 'combined' && item.person) {
        pill = `<span class="person-pill">${item.person}</span>`;
        personRef = item.person;
    }

    row.innerHTML = `
        <span class="receipt-checkbox-wrap">
            <input type="checkbox" class="receipt-checkbox" data-id="${item.id}" data-person="${scope}" ${item.paid ? 'checked' : ''}>
        </span>
        <span class="receipt-item-body">
            <div class="receipt-item-name">${pill}${item.name}</div>
            <div class="receipt-item-meta">${item.category}</div>
        </span>
        <span class="receipt-item-actions">
            <span class="receipt-item-price">${fmt(item.amount)}</span>
            <button type="button" class="edit-price-btn" data-kind="budget" data-scope="${personRef}" data-id="${item.id}">
                EDIT
            </button>
        </span>
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

    if (!categories.length) {
        list.innerHTML = '<div class="receipt-empty">NOTHING HERE YET.</div>';
        return;
    }

    categories.forEach(cat => {
        const catEl = document.createElement('div');
        catEl.className = 'receipt-cat';
        catEl.textContent = cat.category;
        list.appendChild(catEl);

        cat.items.forEach(item => list.appendChild(buildGroceryRow(item, type, cat.category)));
    });

    updateGroceryTotals(type, categories);
}

function buildGroceryRow(item, type, category) {
    const row = document.createElement('div');
    row.className = 'receipt-item' + (item.purchased ? ' checked' : '');
    row.dataset.search = `${category} ${item.name}`.toLowerCase();

    row.innerHTML = `
        <span class="receipt-checkbox-wrap">
            <input type="checkbox" class="receipt-checkbox" data-id="${item.id}" data-type="${type}" ${item.purchased ? 'checked' : ''}>
        </span>
        <span class="receipt-item-body">
            <div class="receipt-item-name">${item.name}</div>
            <div class="receipt-item-meta">${item.qty} × ${fmt(item.price)}</div>
        </span>
        <span class="receipt-item-actions">
            <span class="receipt-item-price">${fmt(item.total)}</span>
            <button type="button" class="edit-price-btn" data-kind="grocery" data-type="${type}" data-id="${item.id}">
                EDIT
            </button>
        </span>
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

// ---------- Add item ----------
function openItemModal(screenName) {
    itemTargetScreen.value = screenName;
    itemCategory.value = '';
    itemDescription.value = '';
    itemPrice.value = '';
    itemModal.classList.remove('hidden');
    itemModal.setAttribute('aria-hidden', 'false');
    itemCategory.focus();
}

function closeItemModal() {
    itemModal.classList.add('hidden');
    itemModal.setAttribute('aria-hidden', 'true');
    itemForm.reset();
}

function handleAddItemSubmit(e) {
    e.preventDefault();

    const screenName = itemTargetScreen.value;
    const category = itemCategory.value.trim();
    const description = itemDescription.value.trim();
    const price = Number(itemPrice.value);

    if (!screenName || !category || !description || Number.isNaN(price)) return;

    if (screenName.startsWith('groceries')) {
        const type = screenName === 'groceriesHome' ? 'home' : 'bukhosi';
        addGroceryItem(type, category, description, price);
    } else if (screenName.startsWith('budget')) {
        addBudgetItem(screenName, category, description, price);
    }

    closeItemModal();
    renderScreen(screenName);
}

function addBudgetItem(screenName, category, description, amount) {
    let target = null;

    if (screenName === 'budgetMax') target = 'max';
    if (screenName === 'budgetCarrie') target = 'carrie';
    if (screenName === 'budgetBukhosi') target = 'bukhosi';

    // safest default for Combined: add to Max so it appears immediately in combined too
    if (screenName === 'budgetCombined') target = 'max';

    if (!target) return;

    const nextId = getNextBudgetId();

    appState.budget[target].push({
        id: nextId,
        category: category.toUpperCase(),
        name: description.toUpperCase(),
        amount: Number(amount),
        paid: false
    });
}

function addGroceryItem(type, category, description, price) {
    const categoryName = category.toUpperCase();
    const nextItemId = getNextGroceryItemId(type);

    let categoryBlock = appState.groceries[type].find(c => c.category === categoryName);

    if (!categoryBlock) {
        const nextCatId = getNextGroceryCategoryId(type);
        categoryBlock = {
            id: nextCatId,
            category: categoryName,
            items: []
        };
        appState.groceries[type].push(categoryBlock);
    }

    categoryBlock.items.push({
        id: nextItemId,
        name: description,
        qty: 1,
        price: Number(price),
        total: Number(price),
        purchased: false
    });
}

// ---------- Search ----------
function filterReceiptList(screenName, query) {
    const section = document.getElementById(screenName + 'Screen');
    if (!section) return;

    const normalized = query.trim().toLowerCase();
    const list = section.querySelector('.receipt-list');
    if (!list) return;

    const items = [...list.querySelectorAll('.receipt-item')];
    const cats = [...list.querySelectorAll('.receipt-cat')];

    if (!normalized) {
        items.forEach(el => el.style.display = '');
        cats.forEach(el => el.style.display = '');
        return;
    }

    items.forEach(el => {
        const match = (el.dataset.search || '').includes(normalized);
        el.style.display = match ? '' : 'none';
    });

    // hide category headers with no visible items after them
    cats.forEach(cat => {
        let next = cat.nextElementSibling;
        let hasVisibleItems = false;

        while (next && !next.classList.contains('receipt-cat')) {
            if (next.classList.contains('receipt-item') && next.style.display !== 'none') {
                hasVisibleItems = true;
                break;
            }
            next = next.nextElementSibling;
        }

        cat.style.display = hasVisibleItems ? '' : 'none';
    });
}

// ---------- Edit price ----------
function handleEditPrice(button) {
    const kind = button.dataset.kind;
    const itemId = button.dataset.id;

    const currentPriceText = button.previousElementSibling?.textContent || '';
    const currentNumber = Number(currentPriceText.replace(/[R,\s]/g, ''));

    const userInput = prompt('Enter new price:', Number.isNaN(currentNumber) ? '' : currentNumber);
    if (userInput === null) return;

    const newPrice = Number(userInput);
    if (Number.isNaN(newPrice)) return;

    if (kind === 'budget') {
        const scope = button.dataset.scope;
        const item = appState.budget[scope]?.find(i => String(i.id) === String(itemId));
        if (!item) return;
        item.amount = newPrice;

        // rerender correct screen
        if (currentScreen === 'budgetCombined') renderCombinedBudget();
        else renderBudgetDetail(scope);

        if (scope === 'max' || scope === 'carrie' || scope === 'bukhosi') {
            renderBudgetMenu();
        }
    }

    if (kind === 'grocery') {
        const type = button.dataset.type;
        let found = null;

        appState.groceries[type].forEach(cat => {
            const item = cat.items.find(i => String(i.id) === String(itemId));
            if (item) found = item;
        });

        if (!found) return;

        found.price = newPrice;
        found.total = found.qty * newPrice;

        renderGroceryDetail(type);
        renderGroceriesMenu();
    }

    saveStateToStorage();
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

function getNextBudgetId() {
    const allIds = [
        ...appState.budget.max,
        ...appState.budget.carrie,
        ...appState.budget.bukhosi
    ].map(i => i.id);
    return allIds.length ? Math.max(...allIds) + 1 : 1;
}

function getNextGroceryCategoryId(type) {
    const ids = appState.groceries[type].map(c => c.id || 0);
    return ids.length ? Math.max(...ids) + 1 : 1;
}

function getNextGroceryItemId(type) {
    const itemIds = [];
    appState.groceries[type].forEach(cat => {
        cat.items.forEach(item => {
            const numeric = parseInt(String(item.id).replace(/[^\d]/g, ''), 10);
            if (!Number.isNaN(numeric)) itemIds.push(numeric);
        });
    });
    return `n${itemIds.length ? Math.max(...itemIds) + 1 : 1}`;
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

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("Service Worker Registered"))
        .catch(err => console.error("SW failed:", err));
}

const scanBtn = document.getElementById("scanBtn");
const scannerDiv = document.getElementById("scanner");

let html5QrCode;

scanBtn.addEventListener("click", () => {
    scannerDiv.style.display = "block";

    html5QrCode = new Html5Qrcode("scanner");

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            html5QrCode.start(
                devices[0].id,
                { fps: 10, qrbox: 250 },
                onScanSuccess
            );
        }
    });
});

function onScanSuccess(decodedText) {
    console.log("Scanned:", decodedText);

    stopScanner();

    // 👉 Now handle product lookup OR just pre-fill
    handleScannedBarcode(decodedText);
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            scannerDiv.style.display = "none";
        });
    }
}

function handleScannedBarcode(barcode) {
    // SIMPLE VERSION (safe + no API issues)

    let description = prompt("Product name (scan detected):");
    let price = prompt("Price:");

    if (!description || !price) return;

    addItem({
        category: "Groceries",
        description: description,
        price: parseFloat(price)
    });
}
