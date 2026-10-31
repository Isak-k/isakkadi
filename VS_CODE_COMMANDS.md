# VS Code Commands & Keyboard Shortcuts Quick Reference

## 🎯 Use These Commands in VS Code

### Open Terminal
```
Ctrl + `
```
Run any command below here.

---

## 🚀 Project Commands

### Start Development Server
```bash
npm run dev
```
Visit http://localhost:5173
Press Ctrl+C to stop

### Build for Production
```bash
npm run build
```
Creates optimized build in `dist/` folder

### Preview Build
```bash
npm run preview
```
Test production build locally

### Run Linter
```bash
npm run lint
```
Check code quality

---

## 📝 Git Commands

### Check Status
```bash
git status
```
See what files changed

### Add All Changes
```bash
git add .
```
Stage all modified files

### Commit Changes
```bash
git commit -m "Update: describe your changes"
```
Create a commit with message

### Push to GitHub
```bash
git push origin master
```
Send commits to GitHub
(Vercel auto-deploys after this)

### View Recent Commits
```bash
git log --oneline -n 5
```
See last 5 commits

---

## 📂 File Navigation

### Open File (Quick)
```
Ctrl + P
```
Type filename, press Enter

### Go to Line
```
Ctrl + G
```
Type line number

### Find in File
```
Ctrl + F
```
Search current file

### Replace in File
```
Ctrl + H
```
Find and replace

### Find in All Files
```
Ctrl + Shift + F
```
Search entire project

---

## ✏️ Editing Shortcuts

### Format Document
```
Ctrl + Shift + F
```
Auto-fix code formatting

### Duplicate Line
```
Ctrl + D
```
Copy current line below

### Delete Line
```
Ctrl + Shift + K
```
Remove current line

### Comment/Uncomment
```
Ctrl + /
```
Toggle comment

### Multi-line Select
```
Ctrl + Alt + Up/Down
```
Add cursor to multiple lines

---

## 🔍 Useful Extensions for VS Code

Install these for better productivity:

1. **ES7+ React/Redux/React-Native snippets**
   - Quick React code snippets

2. **Tailwind CSS IntelliSense**
   - Auto-complete Tailwind classes

3. **TypeScript Vue Plugin**
   - Better TypeScript support

4. **Error Lens**
   - Show errors inline

5. **GitLens**
   - Git history and blame

6. **Thunder Client** or **REST Client**
   - Test API endpoints

---

## 🖥️ Most Useful Shortcuts

| Action | Shortcut |
|--------|----------|
| Save file | Ctrl + S |
| Save all | Ctrl + Shift + S |
| Close file | Ctrl + W |
| Undo | Ctrl + Z |
| Redo | Ctrl + Y |
| Select all | Ctrl + A |
| Cut | Ctrl + X |
| Copy | Ctrl + C |
| Paste | Ctrl + V |
| Bold | Ctrl + B |
| Italic | Ctrl + I |

---

## 🐛 Debugging

### Open DevTools in Browser
```
F12
```
Check console for errors

### Toggle Debug Console in VS Code
```
Ctrl + Shift + Y
```
View terminal output

### View Problems Panel
```
Ctrl + Shift + M
```
See TypeScript errors

---

## 📁 File Structure to Know

```
Your project root contains:
├── src/              (Your code)
├── public/           (Static files)
├── functions/        (Cloud Functions)
├── node_modules/     (Dependencies)
├── dist/             (Build output)
├── package.json      (Dependencies list)
├── vite.config.ts    (Build config)
├── tsconfig.json     (TypeScript config)
└── tailwind.config.ts (Design tokens)
```

---

## 🔑 Key Files to Edit

| Purpose | File | Shortcut |
|---------|------|----------|
| Your info | `src/config/navigation.ts` | Ctrl+P, type `navigation` |
| Projects | `src/services/data-service.ts` | Ctrl+P, type `data-service` |
| Home page | `src/pages/Home.tsx` | Ctrl+P, type `Home` |
| About page | `src/pages/About.tsx` | Ctrl+P, type `About` |
| Colors | `tailwind.config.ts` | Ctrl+P, type `tailwind` |

---

## 🚨 Troubleshooting Commands

### Clear node_modules and reinstall
```bash
rm -r node_modules
npm install
```
(Use `rmdir /s node_modules` on Windows if first fails)

### Clean build
```bash
npm run build
```

### Check what ports are running
```bash
netstat -ano | findstr :5173
```
(Windows; adjust port number)

### Kill port 5173 (if stuck)
```bash
lsof -ti:5173 | xargs kill -9
```
(Mac/Linux; Windows: see above)

---

## 💾 Auto-Save Settings

### Enable auto-save in VS Code:
1. File → Preferences → Settings
2. Search: "Auto Save"
3. Select: "afterDelay"
4. Delay: 1000 (1 second)

Now you never lose work!

---

## 🎨 VS Code Theme Recommendations

For a professional look:
- **One Dark Pro** - Popular and clean
- **Dracula** - Dark and readable
- **Nord** - Cool colors, easy on eyes

Install via Extensions (Ctrl+Shift+X)

---

## 📊 View Options

### Split Editor
```
Ctrl + \
```
Side-by-side editing

### Toggle Sidebar
```
Ctrl + B
```
Hide/show file explorer

### Full Screen
```
F11
```
Maximize editor

### Zen Mode
```
Ctrl + K, Z
```
Distraction-free mode (Esc to exit)

---

## 🧠 Pro Tips

1. **Use Ctrl+P constantly** - Fastest file navigation
2. **Use Ctrl+Shift+F for global search** - Find anything project-wide
3. **Format on save** - Keeps code clean automatically
4. **Use Git in terminal** - Easier to understand git actions
5. **Terminal in VS Code** - No need to switch windows
6. **Test locally before pushing** - Catch errors early

---

## 🔄 Typical Workflow

```bash
# 1. Start dev server
npm run dev

# 2. Make edits to files (they auto-reload in browser)
# (Edit files, refresh browser to see changes)

# 3. When satisfied, build to check for errors
npm run build

# 4. If build succeeds, commit and push
git add .
git commit -m "Update: description"
git push origin master

# 5. Vercel auto-deploys
# (Check https://vercel.com/dashboard for status)
```

---

## ✨ That's It!

You now have all the VS Code commands you need. Keep this tab open for quick reference!

Happy coding! 🚀

