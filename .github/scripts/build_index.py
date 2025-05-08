"""
.github/scripts/build_index.py
This script generates an index.html file for the Top 3 project.
"""

from pathlib import Path

# Paths
views_path = Path("views")
styles_path = Path("styles")
output_path = Path("index.html")

# Template for index.html
html_template = """
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Top 3 project" />
    <link rel="icon" href="./favicon_io/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="./favicon_io/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon_io/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon_io/favicon-16x16.png">
    <link rel="manifest" href="./favicon_io//site.webmanifest">
    <title>Top 3</title>
    <link rel="stylesheet" href="index.css" />

    <!-- Link each Peep's Styles -->
    {styles}

    <script src="favorites.js"></script>
    <script src="random-favorite.js" defer></script>
  </head>

  <body>
    <h1>Welcome to our Top Three</h1>
    <div id="random-favorite">Loading a random favorite...</div>

    <div class="button-container">
      {buttons}
    </div>

    <!-- GitHub Icon for Easy Access -->
    <a href="https://github.com/denisecase/top-three" target="_blank" class="github-link">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="Edit on GitHub" class="github-icon" />
    </a>
  </body>
</html>
"""

# Collect all .html and .css files
html_files = list(views_path.glob("*.html"))
css_files = list(styles_path.glob("*.css"))

# Build styles and buttons dynamically
styles = "\n".join([f'<link rel="stylesheet" href="styles/{css_file.name}" />' for css_file in css_files])

buttons = "\n".join([
    f'<a href="views/{html_file.name}" class="{html_file.stem}-button">{html_file.stem.capitalize()}</a>'
    for html_file in html_files
])

# Generate the final HTML
final_html = html_template.format(styles=styles, buttons=buttons)

# Write to index.html
output_path.write_text(final_html)

# Status message
print(f"✅ index.html successfully generated with {len(html_files)} entries!")
