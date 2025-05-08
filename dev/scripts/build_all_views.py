"""
dev/scripts/build_all_views.py
This script generates the views - HTML pages for each Markdown file - in the peeps folder.
"""

# Import from Python standard library
from pathlib import Path

# Import third-party libraries (see requirements.txt)
import markdown

# Paths (adjusted for the new location of the script)
project_root = Path(__file__).resolve().parent.parent.parent  # Goes up two levels
peeps_path = project_root / "peeps"
views_path = project_root / "views"
views_path.mkdir(exist_ok=True, parents=True)

print(f"Root: {project_root}")
print(f"Peeps: {peeps_path}")
print(f"Views: {views_path}")

# GitHub base URL
github_base_url = "https://github.com/denisecase/top-three/blob/main/peeps"

# Loop through each Markdown file
for md_file in peeps_path.glob("*.md"):
    name = md_file.stem.capitalize()
    content = markdown.markdown(md_file.read_text())
    
    # HTML Template
    full_html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{name}'s Top Three</title>
        <link rel="stylesheet" href="../styles/{md_file.stem}.css">
        <style>
            body {{
                font-family: Arial, sans-serif;
                margin: 20px;
            }}
            .edit-link {{
                margin-top: 20px;
                display: block;
                text-decoration: none;
                color: #0366d6;
                font-size: 1.1rem;
            }}
            .edit-link:hover {{
                text-decoration: underline;
            }}
        </style>
    </head>
    <body>
        {content}
        
        <!-- Edit Link -->
        <a 
            href="{github_base_url}/{md_file.name}" 
            target="_blank" 
            class="edit-link">
            Edit {name}.md on GitHub
        </a>
    </body>
    </html>
    """
    
    # Write to views folder
    output_file = views_path / f"{md_file.stem}.html"
    output_file.write_text(full_html)
    print(f"Generated {output_file.name}")
