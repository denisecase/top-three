# top-three

Learn to code by editing a web site. 

## Steps

1. Sign up for a GitHub account.
2. Fork the repo. 
3. Edit your page in a web browser.
4. Save your changes and commit your work. 
5. Create a pull request.

I'll pull in your work to the main version and GitHub will regenerate the site with your new information. 

# Languages

- Markdown - favorite pages use Markdown, a super-simple way to make text look nice on the web.
- CSS - Cascading style sheets are used to add colors and styles
- HTML - Used to build the "home" page
- JS - Used to modify the "home" page with instructions
- Python - Used to automatically update our web set when we change a page.

## Local Development 

You don't need this usually. These are just so I can test the Python instructions on my local machine. 

```shell
py -m venv .venv
.\.venv\Scripts\activate
py -m pip install --upgrade pip 
py -m pip install --upgrade -r requirements.txt 
py .github/scripts/build_favs.py
py .github/scripts/build_pages.py
py .github/scripts/build_index.py

```