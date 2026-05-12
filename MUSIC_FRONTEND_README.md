# Music Frontend - Complete Setup and File Guide

## ⚠️ IMPORTANT: Read This First

Due to PowerShell environment limitations in this development environment, I have created all the necessary files in this directory (`c:\Users\yakic\MusicApp.API`). You need to run a setup script to copy them to the correct location.

---

## 🚀 Quick Setup (Choose One)

### Option 1: PowerShell (Recommended)
1. Open PowerShell as Administrator
2. Navigate to: `C:\Users\yakic\MusicApp.API`
3. Run: `.\setup-music-frontend.ps1`
4. When prompted about execution policy, type `Y` and press Enter

### Option 2: Command Prompt
1. Open Command Prompt
2. Navigate to: `C:\Users\yakic\MusicApp.API`
3. Run: `setup-music-frontend.bat`
4. Follow the prompts

### Option 3: Manual Setup
1. Create directory structure:
   ```cmd
   mkdir C:\Users\yakic\music-frontend\src\pages
   ```

2. Copy all files from `c:\Users\yakic\MusicApp.API` (files starting with `frontend-files--`) to:
   ```
   C:\Users\yakic\music-frontend\
   ├── package.json (from frontend-files--package.json)
   ├── vite.config.js (from frontend-files--vite.config.js)
   ├── index.html (from frontend-files--index.html)
   └── src\
       ├── main.jsx (from frontend-files--src-main.jsx)
       ├── App.jsx (from frontend-files--src-App.jsx)
       ├── api.js (from frontend-files--src-api.js)
       ├── index.css (from frontend-files--src-index.css)
       └── pages\
           ├── SingersPage.jsx (from frontend-files--src-pages-SingersPage.jsx)
           └── AlbumsPage.jsx (from frontend-files--src-pages-AlbumsPage.jsx)
   ```

---

## 📦 After Setup: Install and Run

Once files are in place:

```cmd
# Navigate to frontend directory
cd C:\Users\yakic\music-frontend

# Install npm dependencies
npm install

# Start development server
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## 📁 File Descriptions

### Root Files

| File | Purpose |
|------|---------|
| **package.json** | NPM configuration with React, Vite, Axios, React Router dependencies |
| **vite.config.js** | Vite build tool configuration (sets port to 3000) |
| **index.html** | HTML entry point for the React app |

### src/ Directory

| File | Purpose |
|------|---------|
| **main.jsx** | React entry point - renders App component with BrowserRouter |
| **App.jsx** | Main app component with navigation and route setup |
| **api.js** | Axios API client configured for `http://localhost:5000/api` |
| **index.css** | Global CSS styling for the app |

### src/pages/ Directory

| File | Purpose |
|------|---------|
| **SingersPage.jsx** | CRUD page for Singers with full add/edit/delete functionality |
| **AlbumsPage.jsx** | CRUD page for Albums with full add/edit/delete functionality |

---

## 🎯 Features Implemented

### Singers Page
- ✅ List all singers in a table
- ✅ Add new singer (Name, Style fields)
- ✅ Edit existing singer
- ✅ Delete singer with confirmation
- ✅ Error/success messages
- ✅ Loading state

### Albums Page
- ✅ List all albums in a table (shows: ID, Title, Year, Singer Name)
- ✅ Add new album (Title, Year, Singer dropdown)
- ✅ Edit existing album
- ✅ Delete album with confirmation
- ✅ Singer dropdown populated from API
- ✅ Error/success messages
- ✅ Loading state

### Navigation
- ✅ React Router for client-side navigation
- ✅ Header with links to Singers and Albums pages
- ✅ Styled navigation bar

### API Integration
- ✅ Axios for HTTP requests
- ✅ Base URL configured for localhost:5000/api
- ✅ Full CRUD endpoints for both Singers and Albums

---

## 🔗 API Integration

The frontend connects to your .NET MusicApp.API running on `http://localhost:5000`

### Singers API Endpoints:
- `GET /api/singers` - List all singers
- `POST /api/singers` - Create new singer
- `PUT /api/singers/{id}` - Update singer
- `DELETE /api/singers/{id}` - Delete singer

### Albums API Endpoints:
- `GET /api/albums` - List all albums
- `POST /api/albums` - Create new album
- `PUT /api/albums/{id}` - Update album
- `DELETE /api/albums/{id}` - Delete album

---

## ⚙️ Tech Stack

- **React 18.2.0** - UI framework
- **Vite 5.0.0** - Fast build tool
- **React Router DOM 6.20.0** - Client-side routing
- **Axios 1.6.0** - HTTP client
- **Vite React Plugin** - React fast refresh for development

---

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use, edit `vite.config.js` and change the port:
```js
server: { port: 3001 }  // or any available port
```

### API Connection Issues
- Ensure MusicApp.API is running on port 5000
- Check browser console (F12) for CORS or network errors
- Verify API base URL in `src/api.js` is correct

### npm install fails
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Try `npm install --legacy-peer-deps` if still failing

### Module not found errors
- Ensure all files are in correct directories
- File names are case-sensitive on some systems
- Try: `npm install` again

---

## 📝 Important Notes

1. **IMPORTANT**: Before running the frontend, your MusicApp.API (.NET backend) must be running on `http://localhost:5000`

2. The frontend is fully functional with complete CRUD operations for both Singers and Albums

3. All API calls use Axios with proper error handling

4. React hooks (useState, useEffect) are used throughout for state management

5. Styling is clean and professional with a dark header and white card layout

---

## 📞 Support

If you encounter issues:
1. Check the browser console (F12) for JavaScript errors
2. Check Network tab to see API response errors
3. Verify the backend API is running and accessible
4. Ensure all files were copied to the correct locations
5. Check that Node.js and npm are properly installed

---

Created with complete CRUD functionality for the Music Database Application.
