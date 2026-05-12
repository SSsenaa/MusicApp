#!/usr/bin/env python
import os

# Create the music-frontend directory structure
base_dir = r'C:\Users\yakic\music-frontend'
src_dir = os.path.join(base_dir, 'src')
pages_dir = os.path.join(src_dir, 'pages')

for directory in [base_dir, src_dir, pages_dir]:
    os.makedirs(directory, exist_ok=True)
    print(f"Created: {directory}")

print("Music frontend directory structure created successfully!")
