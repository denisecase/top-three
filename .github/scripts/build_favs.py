import re
from pathlib import Path
import json

peeps_path = Path("peeps")
favorites_list = []

for md_file in peeps_path.glob("*.md"):
    name = md_file.stem.capitalize()
    text = md_file.read_text()
    bullets = re.findall(r"^\s*[-*]\s+(.*)", text, re.MULTILINE)
    for item in bullets[:3]:
        favorites_list.append(f"{name}'s favorite: {item}")

favorites_js = "const favorites = " + json.dumps(favorites_list, indent=2) + ";"
Path("favorites.js").write_text(favorites_js)
