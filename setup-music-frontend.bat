@echo off
REM Music Frontend Setup Script for Command Prompt
REM This script sets up the React/Vite frontend

setlocal enabledelayedexpansion

echo Creating directory structure...
set "basePath=C:\Users\yakic\music-frontend"
set "srcPath=%basePath%\src"
set "pagesPath=%srcPath%\pages"

mkdir "!basePath!" 2>nul
mkdir "!srcPath!" 2>nul
mkdir "!pagesPath!" 2>nul
echo Directory structure created

REM Copy files
set "sourceDir=C:\Users\yakic\MusicApp.API"

echo.
echo Copying files to music-frontend...

REM Copy root files
copy /Y "!sourceDir!\frontend-files--package.json" "!basePath!\package.json" >nul
echo + package.json

copy /Y "!sourceDir!\frontend-files--vite.config.js" "!basePath!\vite.config.js" >nul
echo + vite.config.js

copy /Y "!sourceDir!\frontend-files--index.html" "!basePath!\index.html" >nul
echo + index.html

REM Copy src files
copy /Y "!sourceDir!\frontend-files--src-main.jsx" "!srcPath!\main.jsx" >nul
echo + src\main.jsx

copy /Y "!sourceDir!\frontend-files--src-App.jsx" "!srcPath!\App.jsx" >nul
echo + src\App.jsx

copy /Y "!sourceDir!\frontend-files--src-api.js" "!srcPath!\api.js" >nul
echo + src\api.js

copy /Y "!sourceDir!\frontend-files--src-index.css" "!srcPath!\index.css" >nul
echo + src\index.css

REM Copy pages files
copy /Y "!sourceDir!\frontend-files--src-pages-SingersPage.jsx" "!pagesPath!\SingersPage.jsx" >nul
echo + src\pages\SingersPage.jsx

copy /Y "!sourceDir!\frontend-files--src-pages-AlbumsPage.jsx" "!pagesPath!\AlbumsPage.jsx" >nul
echo + src\pages\AlbumsPage.jsx

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Navigate to music-frontend:
echo    cd C:\Users\yakic\music-frontend
echo.
echo 2. Install dependencies:
echo    npm install
echo.
echo 3. Start development server:
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
pause
