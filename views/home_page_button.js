/**
 * home_page_button.js
 * Dynamically loads buttons for each markdown file in /peeps/.
 * Links each button to the correct template page and applies custom CSS if it exists.
 */

// Detect if running on GitHub Pages
isGithubPages = window.location.hostname === "denisecase.github.io";
const ROOT = isGithubPages ? "/top-three" : "";
console.log(`🌐 Environment Detected: ${isGithubPages ? "GitHub Pages" : "Localhost"}`);
console.log(`🌐 Root Path Set To: ${ROOT}`);

// Start loading buttons
async function loadPeepButtons() {
  console.log("🚀 Starting to load peep buttons...");

  const container = document.getElementById('button-container');
  if (!container) {
    console.error("Button container not found!");
    return;
  } else {
    console.log("Button container found.");
  }

  // Fetch the list of Markdown files from the `/peeps/` directory
  console.log(`📡 Fetching list of Markdown files from: ${ROOT}/peeps/`);
  try {
    const response = await fetch(`${ROOT}/peeps/`);
    if (!response.ok) {
      console.error(`Failed to fetch the directory. Status: ${response.status}`);
      return;
    } else {
      console.log(`Directory fetched successfully. Status: ${response.status}`);
    }

    const text = await response.text();
    console.log("Directory content fetched. Beginning regex parsing...");

    // Use regex to find all .md filenames
    const regex = /href=["'](?:\\|\/)?peeps(?:\\|\/)([^"]+\.md)["']/g;
    let match;
    const peeps = [];

    // Parse the list of .md files
    while ((match = regex.exec(text)) !== null) {
      console.log(`Found Peep Path: ${match[0]}`);
      console.log(`Extracted Name: ${match[1]}`);

      // Parse the name correctly:
      const filename = match[1].replace('.md', '');
      peeps.push(filename);
    }

    console.log(`Peep List Generated: ${peeps.join(", ")}`);
    
    // Clear the container
    container.innerHTML = '';
    console.log("Cleared the button container.");

    // Populate buttons
    peeps.forEach((peep) => {
      console.log(`Creating button for: ${peep}`);
      const button = document.createElement('a');
      button.href = `${ROOT}/views/peep_page_template.html?page=${peep}`;
      button.classList.add(`${peep}-button`);
      button.innerText = peep.charAt(0).toUpperCase() + peep.slice(1);
      container.appendChild(button);
      console.log(`Button added to container for: ${peep}`);

      // Load the Home Button CSS from /styles/home_button/
      const cssPath = `${ROOT}/styles/home_button/${peep}.css`;
      console.log(`Attempting to load CSS from: ${cssPath}`);

      fetch(cssPath).then(res => {
        if (res.ok) {
          console.log(`Home Button CSS found for ${peep}`);
          const linkTag = document.createElement('link');
          linkTag.rel = 'stylesheet';
          linkTag.href = cssPath;
          document.head.appendChild(linkTag);
        } else {
          console.warn(`Home Button CSS not found for ${peep}`);
        }
      }).catch(err => {
        console.error(`Error loading CSS for ${peep}:`, err);
      });
    });

    console.log("All buttons loaded successfully!");
  } catch (err) {
    console.error("Failed to load peep buttons:", err.message);
  }
}

/**
 * Refreshes the random favorite
 */
function refreshFavorite() {
  console.log("Refresh button clicked. Reloading favorites...");
  const randomElement = document.getElementById("random-favorite");
  randomElement.innerText = "Loading a new favorite...";
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

// Start the process
console.log("Initiating button load process...");
loadPeepButtons();
