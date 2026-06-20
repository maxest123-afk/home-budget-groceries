# 🚀 Deploy to Vercel - Step by Step Guide

This guide will help you deploy your Home Budget & Groceries app to Vercel for free, so you can access it from anywhere!

---

## ✅ What You'll Need

- GitHub account (free at github.com)
- Vercel account (free at vercel.com)
- VS Code or any text editor
- Your files (you have them!)

---

## 📋 Step 1: Prepare Your Files

1. Create a new folder on your computer:
   ```
   home-budget-groceries/
   ```

2. Place these files in the folder:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `data.js`
   - `README.md`
   - `.gitignore`
   - `vercel.json`

3. **Customize your data** (important!)
   - Open `data.js` in VS Code
   - Update budget items with YOUR actual data
   - Update grocery lists with YOUR items
   - Save the file

---

## 📤 Step 2: Push to GitHub

### 2.1 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Sign in (create account if needed)
3. Click **+** (top right) → **New repository**
4. Name: `home-budget-groceries`
5. Description: "Home Budget & Groceries App"
6. Choose **Public** (to deploy to Vercel)
7. Click **Create repository**
8. Copy the repository URL (you'll need it)

### 2.2 Upload Files Using GitHub Web

**Easiest Method - No Command Line:**

1. Go to your new repository
2. Click **Add file** → **Upload files**
3. Drag and drop your 7 files into the box
4. Write commit message: "Initial commit"
5. Click **Commit changes**

**Done!** Your files are now on GitHub.

### Alternative: Using Git Command Line (Skip if you used web upload)

If you want to use VS Code's Git integration:

1. Open VS Code
2. Open your `home-budget-groceries` folder
3. Press Ctrl+` (backtick) to open terminal
4. Run these commands:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/home-budget-groceries.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🌐 Step 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign up (free - use GitHub to sign up)
3. Click **New Project**
4. Click **Import Git Repository**
5. Paste your repository URL or select from list
6. Click **Import**

### 3.2 Deploy

1. Keep all settings default
2. Click **Deploy**
3. Wait ~30 seconds for deployment
4. You'll see **Congratulations!** message
5. Copy your deployment URL (looks like: `home-budget-groceries-xyz.vercel.app`)

**You're live!** 🎉

---

## 📱 Step 4: Access & Share

### View Your App

1. Visit your Vercel URL in any browser
2. Test on your phone by scanning QR code (shown on Vercel dashboard)
3. Test budget and grocery features
4. Make sure checkboxes save data

### Share with Family

1. Copy your Vercel URL
2. Send to Max, Carrie, Bukhosi
3. They can open on their phones
4. Bookmarks it for easy access

**Pro Tip:** Add to Home Screen
- Open link on phone
- Tap Share → Add to Home Screen
- Creates app icon for quick access

---

## 🔄 Update Your App

When you want to make changes:

### Using GitHub Web (Easiest)

1. Go to your GitHub repository
2. Click on the file to edit (`data.js`, etc.)
3. Click **Edit** (pencil icon)
4. Make your changes
5. Click **Commit changes**
6. Vercel automatically redeploys in ~30 seconds

### Using VS Code

1. Edit files locally
2. Save files
3. Open VS Code terminal (Ctrl+`)
4. Run:
   ```bash
   git add .
   git commit -m "Updated budget data"
   git push
   ```
5. Vercel redeploys automatically

---

## 🛠️ Troubleshooting

### App won't load
- Check browser console (F12) for errors
- Try a different browser
- Wait 1 minute and refresh

### Changes not appearing
- Hard refresh (Ctrl+F5)
- Clear browser cache
- Check that you pushed to GitHub
- Wait for Vercel deployment (shows under Deployments)

### Checkboxes don't save
- Browser localStorage issue
- Try different browser
- Check browser privacy settings

---

## 🎯 Customization After Deployment

You can make changes anytime:

### Change Budget Data
1. Go to GitHub → home-budget-groceries repo
2. Click `data.js`
3. Click Edit (pencil icon)
4. Update amounts, names, categories
5. Click Commit changes
6. Wait 30 seconds
7. Refresh app in browser

### Change Colors
1. Click `styles.css`
2. Find `:root` section at top
3. Change color codes
4. Commit
5. Refresh app

### Change Quotes
1. Click `data.js`
2. Find `quotes:` array
3. Add/remove quotes
4. Commit
5. Refresh app

---

## 📊 Domain Name (Optional)

Want a custom domain? Vercel makes it easy:

1. Go to Vercel dashboard
2. Select your project
3. Click **Settings**
4. Go to **Domains**
5. Add your custom domain
6. Follow DNS instructions

---

## 🔒 Privacy & Security

✅ Your data stays in the browser (localStorage only)
✅ Nothing sent to any server
✅ Only Vercel hosts the files
✅ Your phone displays everything
✅ Offline capable

---

## 💡 Tips for Success

1. **Test before sharing** - Make sure checkboxes work
2. **Add correct data** - Budget amounts should be accurate
3. **Use on mobile** - App is designed for phones
4. **Bookmark the link** - Easier to access daily
5. **Screenshot the link** - Share with family as image

---

## 🆘 Need Help?

### Vercel Issues
- Check Vercel dashboard → Deployments
- Look for error messages
- Try redeploying from dashboard

### GitHub Issues
- Make sure files are committed
- Check repository is public
- Try uploading files again

### App Issues
- Clear browser data
- Try different browser
- Check `data.js` for syntax errors

---

## 🎉 Success Checklist

- [ ] Files created locally
- [ ] Data.js customized with YOUR data
- [ ] GitHub repository created
- [ ] Files pushed to GitHub
- [ ] Vercel project created
- [ ] App deployed successfully
- [ ] Tested on phone
- [ ] Shared with family
- [ ] Added to Home Screen

**Congratulations!** You now have a hosted app that the whole family can use! 🎊

---

## 📚 Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [GitHub Docs](https://docs.github.com)
- [VS Code Guide](https://code.visualstudio.com/docs)

---

**Version 1.0 • Last Updated: June 2026**
