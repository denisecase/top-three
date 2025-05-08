"""
dev/scripts/build_favorites.py
This script generates a data file, favorites.js, for the Top 3 project.
"""

# Import from Python standard library
import re
from pathlib import Path
import json

# Paths (adjusted for the new location of the script)
project_root = Path(__file__).resolve().parent.parent.parent  # Goes up two levels
peeps_path = project_root / "peeps"
views_path = project_root / "views"
output_file = project_root / "favorites.js"

print(f"Root: {project_root}")
print(f"Peeps: {peeps_path}")
print(f"Views: {views_path}")
print(f"Output file path: {output_file}")

views_path.mkdir(exist_ok=True, parents=True)

favorites_list = []

# Collect all markdown files into a list (not just a generator)
md_files = list(peeps_path.glob("*.md"))

# Check how many files were found
count_files = len(md_files)
print(f"Found {count_files} Markdown files in peeps/.")

# Loop through each Markdown file and extract the bullet points
for md_file in md_files:
    name = md_file.stem.capitalize()   # File name becomes the person's name
    text = md_file.read_text()         # Read the content of the markdown file

    # Use regex to find all headers (e.g., ## Books, ## Hobbies)
    headers = re.findall(r"^\s*##\s+(.*)", text, re.MULTILINE)
    
    # Use regex to find all bullet points (lines that start with - or *)
    bullets = re.findall(r"^\s*[-*]\s+(.*)", text, re.MULTILINE)

    # Map headers to their corresponding items
    category_map = {}
    header_index = 0

    for index, bullet in enumerate(bullets):
        # If there are headers, map them to each bullet point
        if headers:
            # Cycle headers every 3 items
            category = headers[min(header_index, len(headers) - 1)]
            if category not in category_map:
                category_map[category] = []
            category_map[category].append(bullet.strip())

            # Only increment the header index every 3 items
            if (index + 1) % 3 == 0:
                header_index += 1

    # Append to favorites list with category information
    for category, items in category_map.items():
        for item in items:
            favorites_list.append(f"One of {name}'s favorite {category.lower().strip()} is {item}")

# Convert the list of favorites to JSON format for JS
favorites_js = "const favorites = " + json.dumps(favorites_list, indent=2) + ";"

# Write the output to favorites.js in the root folder
output_file.write_text(favorites_js)

# Output the status to the console
count_items: int = len(favorites_list)
print(f"Generated favorites.js with {count_items} items.")
