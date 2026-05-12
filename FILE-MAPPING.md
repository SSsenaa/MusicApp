# Frontend Files Structure and Deployment Guide

## 📍 Current Location of All Files
```
C:\Users\yakic\MusicApp.API\
```

## 🎯 Target Location After Setup
```
C:\Users\yakic\music-frontend\
```

---

## 📋 File Mapping Guide

### Step 1: Setup Scripts
Run ONE of these from `C:\Users\yakic\MusicApp.API\`:

| Script | Type | Command |
|--------|------|---------|
| `setup-music-frontend.ps1` | PowerShell | `.\setup-music-frontend.ps1` |
| `setup-music-frontend.bat` | Command Prompt | `setup-music-frontend.bat` |

These scripts will automatically copy all files to the correct locations.

---

## 📦 Complete File List

### Source Files (in MusicApp.API) → Destination (in music-frontend)

```
Root Directory Files:
┌─ frontend-files--package.json
│  └─ → music-frontend/package.json
│
├─ frontend-files--vite.config.js
│  └─ → music-frontend/vite.config.js
│
└─ frontend-files--index.html
   └─ → music-frontend/index.html

Source Files (src/):
┌─ frontend-files--src-main.jsx
│  └─ → music-frontend/src/main.jsx
│
├─ frontend-files--src-App.jsx
│  └─ → music-frontend/src/App.jsx
│
├─ frontend-files--src-api.js
│  └─ → music-frontend/src/api.js
│
└─ frontend-files--src-index.css
   └─ → music-frontend/src/index.css

Pages Files (src/pages/):
┌─ frontend-files--src-pages-SingersPage.jsx
│  └─ → music-frontend/src/pages/SingersPage.jsx
│
└─ frontend-files--src-pages-AlbumsPage.jsx
   └─ → music-frontend/src/pages/AlbumsPage.jsx
```

---

## 📁 Final Directory Structure

After running setup and npm install:

```
C:\Users\yakic\music-frontend\
├── node_modules/                      (created by npm install)
├── dist/                              (created by npm run build)
├── package.json                       ✅ (copied)
├── package-lock.json                  (created by npm install)
├── vite.config.js                     ✅ (copied)
├── index.html                         ✅ (copied)
│
└── src/
    ├── main.jsx                       ✅ (copied)
    ├── App.jsx                        ✅ (copied)
    ├── api.js                         ✅ (copied)
    ├── index.css                      ✅ (copied)
    │
    └── pages/
        ├── SingersPage.jsx            ✅ (copied)
        └── AlbumsPage.jsx             ✅ (copied)
```

---

## 🔄 Complete Setup Process

### 1️⃣ Run Setup Script
```bash
# PowerShell
cd C:\Users\yakic\MusicApp.API
.\setup-music-frontend.ps1

# OR Command Prompt
cd C:\Users\yakic\MusicApp.API
setup-music-frontend.bat
```

✅ This will:
- Create directory structure
- Copy all 9 frontend files
- Display confirmation message

### 2️⃣ Install Dependencies
```bash
cd C:\Users\yakic\music-frontend
npm install
```

✅ This will:
- Create node_modules/
- Download React, Vite, Axios, React Router
- Create package-lock.json

### 3️⃣ Start Development Server
```bash
npm run dev
```

✅ This will:
- Start Vite dev server on port 3000
- Display: "Local: http://localhost:3000"
- Watch for file changes

### 4️⃣ Access the Application
```
Open Browser: http://localhost:3000
```

---

## 📝 File Contents Summary

### Configuration Files
| File | Lines | Purpose |
|------|-------|---------|
| package.json | 20 | NPM dependencies and scripts |
| vite.config.js | 7 | Vite build configuration |
| index.html | 11 | HTML entry point |
| src/index.css | 107 | Global styling |

### React Components
| File | Lines | Purpose |
|------|-------|---------|
| src/main.jsx | 11 | React app entry, Router setup |
| src/App.jsx | 22 | Main app, routing, navigation |
| src/api.js | 13 | Axios client with endpoints |
| src/pages/SingersPage.jsx | 191 | Singers CRUD page |
| src/pages/AlbumsPage.jsx | 236 | Albums CRUD page |

---

## 🚀 Commands Reference

```bash
# Setup and Installation
npm install                 # Install dependencies
npm run dev                # Start development server
npm run build              # Build for production
npm run preview            # Preview production build

# Navigation
http://localhost:3000      # Frontend URL
http://localhost:5000/api  # Backend API (must be running)
```

---

## 🔍 Verification Checklist

After setup, verify:

- [ ] Directory `C:\Users\yakic\music-frontend\` exists
- [ ] All 9 files are in correct subdirectories
- [ ] `node_modules\` folder exists
- [ ] `npm run dev` starts without errors
- [ ] Browser opens to `http://localhost:3000`
- [ ] Backend API is accessible at `http://localhost:5000/api`
- [ ] Singers page loads with no console errors
- [ ] Albums page loads with no console errors

---

## 💡 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Setup script won't run | Use Command Prompt version (.bat) instead |
| npm install fails | Delete node_modules, try again with --legacy-peer-deps |
| Port 3000 in use | Change port in vite.config.js, then restart |
| API not connecting | Ensure MusicApp.API is running on port 5000 |
| Module errors | Verify all files copied to correct locations |
| Files not found | Re-run setup script to ensure all files copied |

---

## 📊 What Gets Created

```
Packages Installed:
├── react@18.2.0
├── react-dom@18.2.0
├── react-router-dom@6.20.0
├── axios@1.6.0
├── vite@5.0.0
└── @vitejs/plugin-react@4.2.0

Total Dependencies: 6 main, 2 dev

NPM Scripts Available:
├── npm run dev      → Start dev server
├── npm run build    → Build for production
└── npm run preview  → Preview build
```

---

## 🎓 Features by File

### SingersPage.jsx
- GET all singers
- POST new singer
- PUT update singer
- DELETE singer with confirmation
- Edit form with inline editing
- Error/success messages

### AlbumsPage.jsx
- GET all albums
- POST new album
- PUT update album
- DELETE album with confirmation
- Singer dropdown from API
- Edit form with inline editing
- Error/success messages

### Navigation (App.jsx)
- Links to both pages
- Client-side routing with React Router
- Styled header with app logo

---

## ✅ All Files Created Successfully

**Total Files Created:** 9 component files + 6 documentation files

**Status:** ✨ **READY FOR DEPLOYMENT**

**Next Action:** Run the setup script and follow the 4-step process above!

---

*For more details, see: 00-START-HERE.md or MUSIC_FRONTEND_README.md*
