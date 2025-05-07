from pathlib import Path
import markdown

# Paths
peeps_path = Path("peeps")

# Loop through each Markdown file in the peeps folder
for md_file in peeps_path.glob("*.md"):
    # Read the markdown content
    markdown_content = md_file.read_text()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(markdown_content)

    # Wrap it in a basic HTML template
    full_html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{md_file.stem.capitalize()}'s Top Three</title>
        <link rel="stylesheet" href="{md_file.stem}.css">
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """

    # Write the HTML file back to the same folder
    html_file = md_file.with_suffix('.html')
    html_file.write_text(full_html.strip())

    print(f"Generated {html_file.name}")
