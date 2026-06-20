# 💰 Home Budget & Groceries App

A modern, mobile-first web app to manage household budgets and shopping lists. Track expenses for Max, Carrie, and Bukhosi, and manage grocery shopping with live totals.

**Live Demo:** Deploy to Vercel for free and access from anywhere!

---

## ✨ Features

✅ **Multi-person Budget Management**
- Separate budgets for Max, Carrie, and Bukhosi
- Combined view for household overview
- Category-based organization
- Mark items as paid with checkboxes
- Live paid/outstanding totals

✅ **Smart Grocery Shopping**
- Categorized shopping lists (Produce, Meat, Dairy, etc.)
- Real-time remaining budget calculation
- Check items off as you shop
- Individual lists for family members

✅ **Modern Design**
- Inspired by Woolies & Bash
- Receipt-style display
- Color-coded people (Blue = Max, Yellow = Carrie, Purple = Bukhosi)
- Mobile-optimized (primary use on smartphone)
- Smooth animations and transitions

✅ **Persistent Storage**
- All checked items saved to browser storage
- State persists even after closing the app
- Works offline

✅ **Daily Motivation**
- Random inspirational quotes on welcome screen
- Click for new quotes

---

## 🚀 Quick Start

### Local Setup

1. **Download the files**
   - Clone or download this repository

2. **Open in browser**
   ```bash
   # Navigate to the project folder
   cd home-budget-groceries
   
   # Option 1: Double-click index.html
   # Option 2: Use VS Code Live Server
   # Option 3: Use Python
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Deploy to Vercel (Recommended for Remote Access)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/home-budget-groceries.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - **Done!** Your app is now live

3. **Access from anywhere**
   - Share the Vercel URL with family
   - Works on any device with a browser
   - Mobile-optimized for phones

---

## 📝 How to Use

### Budget Management

1. **Click Budget** from the home screen
2. **Choose a person:** Max, Carrie, Bukhosi, or Combined
3. **Check off items** as you pay bills
4. **Track totals:**
   - Paid: Amount already paid
   - Outstanding: Still to pay

### Shopping

1. **Click Groceries** from the home screen
2. **Choose your list:** Home or Bukhosi
3. **Check items off** as you put them in your cart
4. **Watch the totals:**
   - Purchased: Amount spent so far
   - Remaining: Budget left to spend

### Data Persistence

✅ All checkmarks are saved automatically
✅ Close and reopen - everything is remembered
✅ Clear browser data to reset (Settings → Clear browsing data)

---

## 🎨 Customization

### Edit Budget Items

Open `data.js` and modify the `budget` object:

```javascript
max: [
    { id: 1, category: 'HOME', name: 'BONDS', amount: 88924, paid: false },
    { id: 2, category: 'HOME', name: 'WATER', amount: 300, paid: false },
    // Add more items...
]
```

**Fields:**
- `id`: Unique number
- `category`: Group for display
- `name`: Item name
- `amount`: Cost in Rands
- `paid`: false = not paid, true = paid

### Edit Grocery Items

Modify the `groceries` object in `data.js`:

```javascript
home: [
    {
        id: 1,
        category: 'PRODUCE',
        items: [
            { id: 'p1', name: 'Bananas', qty: 2, price: 18, total: 36, purchased: false },
            // Add more items...
        ]
    }
]
```

**Fields:**
- `category`: Section header
- `name`: Product name
- `qty`: Quantity
- `price`: Price per unit
- `total`: qty × price
- `purchased`: false = not bought, true = bought

### Change Colors

Edit `styles.css` - look for the `:root` section:

```css
:root {
    --max-color: #3498db;        /* Max's color (blue) */
    --carrie-color: #f1c40f;     /* Carrie's color (yellow) */
    --bukhosi-color: #9b59b6;    /* Bukhosi's color (purple) */
    --primary: #1a5f3e;          /* App primary color (green) */
}
```

### Add/Remove Quotes

Edit the `quotes` array in `data.js`:

```javascript
quotes: [
    "Your custom quote here",
    "Another inspiring message",
]
```

---

## 📱 Mobile Tips

✅ Add to Home Screen (iOS/Android)
- Open in browser
- Tap Share → Add to Home Screen
- Creates app-like experience

✅ Works Offline
- Once loaded, works without internet
- Changes saved locally

✅ Landscape Mode
- Works great in both orientations
- Auto-adapts layout

---

## 🔧 File Structure

```
home-budget-groceries/
├── index.html          # Main HTML structure
├── styles.css          # All styling (modern design)
├── app.js              # Logic & interactivity
├── data.js             # Budget & grocery data (EDIT THIS)
├── README.md           # This file
└── .gitignore          # For Git/GitHub
```

---

## 💡 Creative Features

🎯 **Real-time Totals** - Watch outstanding/remaining decrease as you check items

🎨 **Color-Coded People** - Easy to see who pays what at a glance

📊 **Category Organization** - Bills grouped by type, groceries by section

💾 **Smart Persistence** - Nothing gets lost between sessions

🎲 **Daily Quotes** - Motivation while managing finances

---

## 🐛 Troubleshooting

**Checkmarks not saving?**
- Check if browser allows localStorage
- Try a different browser
- Clear browser cookies and try again

**Totals look wrong?**
- Check `data.js` - verify `total = qty × price` for groceries
- Verify `amount` values for budgets
- No negative numbers or text in amount fields

**App not loading?**
- Make sure all 4 files are in the same folder
- Check browser console for errors (F12)
- Try a different browser

---

## 📧 Support

Have suggestions? Found a bug?
- Edit `data.js` to customize your data
- Check the file comments for guidance
- Test changes in browser (F5 to refresh)

---

## 🚀 Deployment Checklist

Before sharing with family:

- [ ] Updated budget data in `data.js`
- [ ] Updated grocery lists in `data.js`
- [ ] Customized colors in `styles.css` (optional)
- [ ] Tested on mobile phone
- [ ] Deployed to Vercel
- [ ] Shared Vercel link with family

---

## 📄 License

Free to use and modify for personal/family use.

---

**Built with ❤️ for smart household management**

Version 1.0 • Last updated: June 2026
