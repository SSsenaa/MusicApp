# Music Frontend Setup Instructions

This document contains instructions for setting up the React/Vite-based Music Database Application frontend.

## Prerequisites
- Node.js and npm must be installed on your system
- PowerShell, Command Prompt, or any terminal/shell

## Setup Steps

### Step 1: Create Directory Structure
Run these commands in your terminal/command prompt:

```cmd
mkdir C:\Users\yakic\music-frontend
mkdir C:\Users\yakic\music-frontend\src
mkdir C:\Users\yakic\music-frontend\src\pages
```

Or use PowerShell:
```powershell
New-Item -Type Directory -Path "C:\Users\yakic\music-frontend\src\pages" -Force
```

### Step 2: Copy Files
Copy all the following files to their respective locations:
- package.json → C:\Users\yakic\music-frontend\
- vite.config.js → C:\Users\yakic\music-frontend\
- index.html → C:\Users\yakic\music-frontend\
- src\main.jsx → C:\Users\yakic\music-frontend\src\
- src\App.jsx → C:\Users\yakic\music-frontend\src\
- src\api.js → C:\Users\yakic\music-frontend\src\
- src\index.css → C:\Users\yakic\music-frontend\src\
- src\pages\SingersPage.jsx → C:\Users\yakic\music-frontend\src\pages\
- src\pages\AlbumsPage.jsx → C:\Users\yakic\music-frontend\src\pages\

### Step 3: Install Dependencies
Navigate to the music-frontend directory and run:
```cmd
cd C:\Users\yakic\music-frontend
npm install
```

### Step 4: Start Development Server
```cmd
npm run dev
```

The app will be available at http://localhost:3000

## API Configuration
- Backend API is expected at: http://localhost:5000/api
- Make sure your .NET MusicApp.API is running before starting the frontend
