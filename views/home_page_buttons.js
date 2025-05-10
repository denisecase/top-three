/**
 * views/home_page_buttons.js
 * Dynamically loads buttons for each markdown file in /peeps/.
 * Links each button to the correct template page and applies custom CSS if it exists.
 */

// Detect environment
const isGithubPages = window.location.hostname === "denisecase.github.io";
const ROOT = isGithubPages ? "/top-three" : ".";
console.log(`Environment Detected: ${isGithubPages ? "GitHub Pages" : "Localhost"}`);
console.log(`Root Path Set To: ${ROOT}`);

// Get the button container
const container = document.getElementById('button-container');
if (!container) {
  console.error("Button container not found. Aborting button load.");
}

// Clear existing buttons (if any)
container.innerHTML = '';

/**
 * Dynamically load buttons for each peep
 */
function loadPeepButtons() {
  console.log("Starting button load process...");

  // Loop through the list of peeps
  window.peeps.forEach((peep) => {
    console.log(`Adding button for: ${peep}`);

    // Create the button
    const button = document.createElement('a');
    button.href = `${ROOT}/views/peep_page_template.html?page=${peep}`;
    button.classList.add(`${peep}-button`);
    button.innerText = peep.charAt(0).toUpperCase() + peep.slice(1);

    // Attach the button to the container
    container.appendChild(button);

    // Load the Home Button CSS from /styles/home_button/
    const cssPath = `${ROOT}/styles/home_button/${peep}.css`;
    console.log(`Fetching CSS for: ${peep} → ${cssPath}`);

    // Attempt to load the CSS for this button
    fetch(cssPath)
      .then(res => {
        if (res.ok) {
          console.log(`Home Button CSS found for ${peep}`);
          const linkTag = document.createElement('link');
          linkTag.rel = 'stylesheet';
          linkTag.href = cssPath;
          document.head.appendChild(linkTag);
        } else {
          console.warn(`Home Button CSS not found for ${peep}`);
        }
      })
      .catch(err => {
        console.error(`Error loading CSS for ${peep}:`, err);
      });
  });

  console.log("Button load process complete.");
}

// Call the function
loadPeepButtons();
