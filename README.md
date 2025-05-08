# top-three

Learn to code by editing a web site. 

[![Build And Deploy](https://github.com/denisecase/top-three/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/denisecase/top-three/actions/workflows/build-and-deploy.yml)



## Steps

1. Sign up for a GitHub account.
2. Fork the repo. 
3. Edit your page in a web browser.
4. Save your changes and commit your work. 
5. Create a pull request.

I'll pull in your work to the main version and GitHub will regenerate the site with your new information. 

# Languages

- **Markdown** - favorite pages use Markdown, a super-simple way to make text look nice on the web.
- **CSS** - Cascading style sheets are used to add colors and styles
- **HTML** - Used to build the "home" page
- **JS** - Used to modify the "home" page with instructions
- **Python** - Used to automatically update our web set when we change a page.
- 
## GitHub Actions

| Workflow                 | Description                                       |
|---------------------------|---------------------------------------------------|
| **Build Views** | Converts Markdown to HTML and places them in `/views/`. |
| **Build Favorites**     | Generates `favorites.js` from all markdown files. |
| **Build Index**         | Creates `index.html` with links to all pages.     |
| **Deploy to GitHub Pages** | Deploys the generated files to GitHub Pages website. |


## OPTIONAL Local Development: One Time Start 

Run these the first time you work with the project to create and manage your local Python virtual environment. 

```powershell
git pull
py -m venv .venv
.\.venv\Scripts\activate
py -m pip install --upgrade pip 
py -m pip install --upgrade -r requirements.txt 
```
## OPTIONAL Local Development

Run these as needed when working on the Python code. 

```powershell
git pull
.\.venv\Scripts\activate
py -m pip install --upgrade -r requirements.txt 
py .github/scripts/build_all_views.py
py .github/scripts/build_favorites.py
py .github/scripts/build_index.py
```

As needed after making changes

```shell
git add .
git commit -m "describe changes here"
git push -u origin main
```
