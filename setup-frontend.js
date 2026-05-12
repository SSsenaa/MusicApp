const fs = require('fs');
const path = require('path');

// Create the music-frontend directory structure
const baseDir = path.join('C:\\Users\\yakic\\music-frontend');
const srcDir = path.join(baseDir, 'src');
const pagesDir = path.join(srcDir, 'pages');

// Create directories
[baseDir, srcDir, pagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});

console.log('Music frontend directory structure created successfully!');
