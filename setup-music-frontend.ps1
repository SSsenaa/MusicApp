# Music Frontend Setup Script
# Run this script in PowerShell to set up the React/Vite frontend

# Create directory structure
$basePath = "C:\Users\yakic\music-frontend"
$srcPath = "$basePath\src"
$pagesPath = "$srcPath\pages"

Write-Host "Creating directory structure..."
New-Item -ItemType Directory -Path $pagesPath -Force | Out-Null
Write-Host "✓ Directories created"

# Source paths for the files in MusicApp.API
$sourceDir = "C:\Users\yakic\MusicApp.API"

# Copy files to music-frontend root
@{
  "$sourceDir\frontend-files--package.json" = "$basePath\package.json"
  "$sourceDir\frontend-files--vite.config.js" = "$basePath\vite.config.js"
  "$sourceDir\frontend-files--index.html" = "$basePath\index.html"
} | ForEach-Object {
  foreach ($item in $_.GetEnumerator()) {
    Copy-Item -Path $item.Key -Destination $item.Value -Force
    Write-Host "✓ Copied $(Split-Path $item.Key -Leaf) → $(Split-Path $item.Value -Leaf)"
  }
}

# Copy src files
@{
  "$sourceDir\frontend-files--src-main.jsx" = "$srcPath\main.jsx"
  "$sourceDir\frontend-files--src-App.jsx" = "$srcPath\App.jsx"
  "$sourceDir\frontend-files--src-api.js" = "$srcPath\api.js"
  "$sourceDir\frontend-files--src-index.css" = "$srcPath\index.css"
} | ForEach-Object {
  foreach ($item in $_.GetEnumerator()) {
    Copy-Item -Path $item.Key -Destination $item.Value -Force
    Write-Host "✓ Copied $(Split-Path $item.Key -Leaf) → src\$(Split-Path $item.Value -Leaf)"
  }
}

# Copy pages files
@{
  "$sourceDir\frontend-files--src-pages-SingersPage.jsx" = "$pagesPath\SingersPage.jsx"
  "$sourceDir\frontend-files--src-pages-AlbumsPage.jsx" = "$pagesPath\AlbumsPage.jsx"
} | ForEach-Object {
  foreach ($item in $_.GetEnumerator()) {
    Copy-Item -Path $item.Key -Destination $item.Value -Force
    Write-Host "✓ Copied $(Split-Path $item.Key -Leaf) → src\pages\$(Split-Path $item.Value -Leaf)"
  }
}

Write-Host ""
Write-Host "✓ Setup complete!"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Navigate to the music-frontend directory:"
Write-Host "   cd C:\Users\yakic\music-frontend"
Write-Host ""
Write-Host "2. Install dependencies:"
Write-Host "   npm install"
Write-Host ""
Write-Host "3. Start the development server:"
Write-Host "   npm run dev"
Write-Host ""
Write-Host "4. Open browser to http://localhost:3000"
