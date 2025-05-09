/**
 * home_page_button.js
 * Dynamically loads buttons for each markdown file in /peeps/.
 * Links each button to the correct template page and applies custom CSS if it exists.
 */

// Detect if running on GitHub Pages
const isGithubPages = window.location.hostname === "denisecase.github.io";
const ROOT = isGithubPages ? "/top-three" : "";
console.log(`Environment: ${isGithubPages ? "GitHub Pages" : "Localhost"}`);
console.log(`Root Path: ${ROOT}`);

// Hardcoded list of Peep Names
const peeps = [
  "blaze",
  "coach",
  "comet",
  "duchess",
  "dynamo",
  "guardian",
  "kernel",
  "mario",
  "ranger",
  "rocket",
  "skylark",
  "sport",
  "stella",
  "unicorn",
  "willow",
];
console.log("Peep List:", peeps.join(", "));

function loadPeepButtons() {
  console.log("Loading peep buttons...");

  const container = document.getElementById("button-container");
  if (!container) {
    console.error("Button container not found! Check your HTML structure.");
    return;
  } else {
    console.log("Button container found.");
  }

  // Clear the container
  container.innerHTML = "";
  console.log("Button container cleared.");

  // Populate buttons
  peeps.forEach((peep) => {
    console.log(`Creating button for: ${peep}`);
    const button = document.createElement("a");
    button.href = `${ROOT}/views/peep_page_template.html?page=${peep}`;
    button.classList.add(`${peep}-button`);
    button.innerText = peep.charAt(0).toUpperCase() + peep.slice(1);
    container.appendChild(button);

    // Load the Home Button CSS from /styles/home_button/
    const cssPath = `${ROOT}/styles/home_button/${peep}.css`;
    console.log(`Loading CSS from: ${cssPath}`);

    fetch(cssPath)
      .then((res) => {
        if (res.ok) {
          console.log(`CSS found for ${peep}`);
          const linkTag = document.createElement("link");
          linkTag.rel = "stylesheet";
          linkTag.href = cssPath;
          document.head.appendChild(linkTag);
        } else {
          console.warn(`CSS not found for ${peep}. Expected at: ${cssPath}`);
        }
      })
      .catch((err) => {
        console.error(`Error loading CSS for ${peep}:`, err.message);
      });
  });

  console.log("All buttons loaded successfully (if no errors above).");
}

/**
 * Refreshes the random favorite
 */
function refreshFavorite() {
  console.log("Refresh button clicked. Reloading favorites...");
  const randomElement = document.getElementById("random-favorite");
  if (!randomElement) {
    console.error("Random favorite element not found!");
    return;
  }
  randomElement.innerText = "Loading a new favorite...";
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

// Start the process
console.log("Initiating button load process...");
loadPeepButtons();
