/**
 * home_page_button.js
 * Dynamically loads buttons for each markdown file in /peeps/.
 * Links each button to the correct template page and applies custom CSS if it exists.
 */

//  the root path dynamically
const isGithubPages = window.location.hostname === "denisecase.github.io";
const ROOT = isGithubPages ? "/top-three" : "";

async function loadPeepButtons() {
  const container = document.getElementById('button-container');

  // Fetch the list of Markdown files from your GitHub Pages directory
  const response = await fetch(`${ROOT}/peeps/`);
  const text = await response.text();

  // Use regex to find all .md filenames
  const regex = /href=["'](?:\\|\/)?peeps(?:\\|\/)([^"]+\.md)["']/g;
  let match;
  const peeps = [];

  while ((match = regex.exec(text)) !== null) {
    console.log(`Found Peep Path: ${match[0]}`);
    console.log(`Extracted Name: ${match[1]}`);

    // Parse the name correctly:
    const filename = match[1].replace('.md', '');
    peeps.push(filename);
  }

  // Clear the container
  container.innerHTML = '';

  // Populate buttons
  peeps.forEach((peep) => {
    const button = document.createElement('a');
    button.href = `views/peep_page_template.html?page=${peep}`;
    button.classList.add(`${peep}-button`);
    button.innerText = peep.charAt(0).toUpperCase() + peep.slice(1);

    container.appendChild(button);

    // Load the Home Button CSS from /styles/home_button/
    const cssPath = `${ROOT}/styles/home_button/${peep}.css`;
    fetch(cssPath).then(res => {
      if (res.ok) {
        console.log(`Home Button CSS found for ${peep}`);
        const linkTag = document.createElement('link');
        linkTag.rel = 'stylesheet';
        linkTag.href = cssPath;
        document.head.appendChild(linkTag);
      } else {
        console.log(`Home Button CSS not found for ${peep}`);
      }
    }).catch(err => {
      console.error(`Error loading CSS for ${peep}:`, err);
    });
  });
}

/**
 * Refreshes the random favorite
 */
function refreshFavorite() {
  const randomElement = document.getElementById("random-favorite");
  randomElement.innerText = "Loading a new favorite...";
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

loadPeepButtons();
