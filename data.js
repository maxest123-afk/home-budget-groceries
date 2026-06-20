// ============================================
// THE STASH — Data
// Edit this file to update your budget & lists.
// ============================================

const APP_DATA = {
    // ---------------- BUDGET ----------------
    budget: {
        max: [
            { id: 1, category: 'HOME', name: 'BOND', amount: 8924, paid: false },
            { id: 2, category: 'HOME', name: 'WATER', amount: 300, paid: false },
            { id: 3, category: 'HOME', name: 'ELECTRICITY', amount: 500, paid: false },
            { id: 4, category: 'HOME', name: 'LEVIES', amount: 1056.97, paid: false },
            { id: 5, category: 'INSURANCE', name: 'BREZZA INSURANCE', amount: 1341.17, paid: false },
            { id: 6, category: 'INSURANCE', name: 'COYNE INSURANCE', amount: 904.10, paid: false },
            { id: 7, category: 'SUBSCRIPTIONS', name: 'WIFI', amount: 580, paid: false },
            { id: 8, category: 'SUBSCRIPTIONS', name: 'TELKOM', amount: 569, paid: false },
            { id: 9, category: 'SUBSCRIPTIONS', name: 'SHOWMAX', amount: 99, paid: false },
        ],
        carrie: [
            { id: 10, category: 'CARE', name: 'BUKHOSI', amount: 1500, paid: false },
            { id: 11, category: 'CARE', name: 'BUKHOSI CRECHE', amount: 2800, paid: false },
            { id: 12, category: 'TRANSPORT', name: 'BREZZA', amount: 4698.92, paid: false },
            { id: 13, category: 'HOUSEHOLD', name: 'GROCERIES', amount: 3000, paid: false },
            { id: 14, category: 'HOUSEHOLD', name: 'CCT ACCOUNT', amount: 500, paid: false },
            { id: 15, category: 'FUN MONEY', name: 'DATE NIGHT', amount: 100, paid: false },
            { id: 16, category: 'FUN MONEY', name: 'DATE NIGHT', amount: 400, paid: false },
            { id: 17, category: 'FUN MONEY', name: 'GAS', amount: 0, paid: false },
        ],
        bukhosi: [
            { id: 18, category: 'SCHOOL', name: 'SCHOOL FEES', amount: 5000, paid: false },
            { id: 19, category: 'SCHOOL', name: 'ROBOTICS', amount: 200, paid: false },
            { id: 20, category: 'SCHOOL', name: 'SWIMMING LESSONS', amount: 560, paid: false },
            { id: 21, category: 'EXTRAS', name: 'TRANSPORT', amount: 400, paid: false },
            { id: 22, category: 'EXTRAS', name: 'LUNCH MONEY', amount: 300, paid: false },
        ],
    },

    // ---------------- GROCERIES ----------------
    groceries: {
        home: [
            {
                id: 1,
                category: 'PRODUCE',
                items: [
                    { id: 'p1', name: 'Banana', qty: 1, price: 18, total: 18, purchased: false },
                    { id: 'p2', name: 'Apple', qty: 1, price: 25, total: 25, purchased: false },
                    { id: 'p3', name: 'Pear', qty: 1, price: 20, total: 20, purchased: false },
                    { id: 'p4', name: 'Broccoli & Cauliflower', qty: 1, price: 35, total: 35, purchased: false },
                    { id: 'p5', name: 'Mushroom', qty: 1, price: 28, total: 28, purchased: false },
                    { id: 'p6', name: 'Sweet Potato', qty: 1, price: 22, total: 22, purchased: false },
                ]
            },
            {
                id: 2,
                category: 'MEAT',
                items: [
                    { id: 'm1', name: 'Chicken Thighs (3kg)', qty: 1, price: 170, total: 170, purchased: false },
                    { id: 'm2', name: 'Chicken Drumsticks (3kg)', qty: 1, price: 150, total: 150, purchased: false },
                    { id: 'm3', name: 'Chicken Breast', qty: 2, price: 130, total: 260, purchased: false },
                    { id: 'm4', name: 'Fish', qty: 2, price: 170, total: 340, purchased: false },
                    { id: 'm5', name: 'Pork', qty: 1, price: 200, total: 200, purchased: false },
                    { id: 'm6', name: 'Chicken Schnitzel', qty: 1, price: 95, total: 95, purchased: false },
                ]
            },
            {
                id: 3,
                category: 'HEALTH & HOME SUPPLIES',
                items: [
                    { id: 'h1', name: 'Soap', qty: 3, price: 13, total: 39, purchased: false },
                    { id: 'h2', name: 'Toothpaste', qty: 1, price: 100, total: 100, purchased: false },
                    { id: 'h3', name: 'StaySoft', qty: 2, price: 40, total: 80, purchased: false },
                    { id: 'h4', name: 'Washing Powder', qty: 1, price: 120, total: 120, purchased: false },
                    { id: 'h5', name: 'Glass Cleaner', qty: 1, price: 45, total: 45, purchased: false },
                    { id: 'h6', name: 'Domestos', qty: 1, price: 60, total: 60, purchased: false },
                ]
            },
        ],
        bukhosi: [
            {
                id: 1,
                category: 'CHECKERS RUN',
                items: [
                    { id: 'b1', name: 'Chips (Nik Naks)', qty: 2, price: 15, total: 30, purchased: false },
                    { id: 'b2', name: 'Cheddar Snacks', qty: 4, price: 40, total: 160, purchased: false },
                    { id: 'b3', name: 'Juice', qty: 4, price: 45, total: 180, purchased: false },
                    { id: 'b4', name: 'Yoghurt', qty: 4, price: 16, total: 64, purchased: false },
                    { id: 'b5', name: 'Peanut Butter', qty: 1, price: 95, total: 95, purchased: false },
                    { id: 'b6', name: 'Milkshake', qty: 4, price: 17, total: 68, purchased: false },
                    { id: 'b7', name: 'Biscuits', qty: 1, price: 40, total: 40, purchased: false },
                    { id: 'b8', name: 'Chips (Flings)', qty: 1, price: 17, total: 17, purchased: false },
                ]
            },
        ],
    },

    // ---------------- QUOTES ----------------
    // Dry, confident, a little funny. In keeping with "We're good, just ask our moms."
    quotes: [
        "We pay bills. On time. Mostly.",
        "Budgeting: 10% math, 90% pretending you didn't see that DSTV reminder.",
        "Our trolley has commitment issues. We're working on it.",
        "Every rand has a job. Most of them are doing overtime.",
        "We've never once gone over budget. Citation needed.",
        "Outstanding bills build character. So we're very characterful.",
        "It's not a splurge if it was technically on the list.",
        "We track every cent so we can pretend to be shocked later.",
        "Groceries: where good intentions meet the snack aisle.",
        "The budget said no. We heard maybe.",
        "Financial discipline, served with a side of denial.",
        "We don't do impulse buys. We do 'planned spontaneity.'",
        "Relax. The spreadsheet's got this. Probably.",
        "Bukhosi's snack budget could fund a small nation.",
        "We check things off lists for the dopamine. Don't judge.",
        "A paid bill is a beautiful thing. So is sleep, theoretically.",
        "Carrie said groceries. Max heard 'negotiation.'",
        "This app exists because someone forgot to pay water. Twice.",
        "We're good with money. Just ask our moms.",
        "Do budgeting good.",
    ]
};
