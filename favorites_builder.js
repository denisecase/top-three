/**
 * favorites_builder.js
 * Dynamically generates the favorites array from Markdown files and provides a function to get a random entry.
 */

console.log("build_favorites.js is running...");

if (typeof isGithubPages === "undefined") {
  window.isGithubPages = window.location.hostname === "denisecase.github.io";
  window.ROOT = isGithubPages ? "/top-three" : ".";
  console.log(`Environment: ${isGithubPages ? "GitHub Pages" : "Localhost"}`);
  console.log(`Root Path: ${ROOT}`);
}

const favorites = [];

async function build_favorites() {
  console.log("Starting to build favorites...");

  for (const peep of peeps) {
    const path = `${ROOT}/peeps/${peep}.md`;
    console.log(`Fetching from path: ${path}`);

    const response = await fetch(path);
    if (response.ok) {
      console.log(`Markdown loaded for ${peep}`);
      const markdown = await response.text();

      // Use regex to find all headers (## Books, ## Adventures, etc.)
      const headers = markdown.match(/^##\s+(.*)/gm) || [];
      const bullets = markdown.match(/^\s*[-*]\s+(.*)/gm) || [];

      let headerIndex = 0;

      for (let i = 0; i < bullets.length; i++) {
        const category = headers[headerIndex] ? headers[headerIndex].replace("## ", "") : "Unknown";
        favorites.push(`One of ${peep.charAt(0).toUpperCase() + peep.slice(1)}'s favorite ${category.toLowerCase()} is ${bullets[i].replace(/[-*]\s*/, "")}`);

        // Cycle headers every 3 items
        if ((i + 1) % 3 === 0) {
          headerIndex = (headerIndex + 1) % headers.length;
        }
      }
    } else {
      console.warn(`Could not load markdown for ${peep} from path ${path}`);
    }
  }

  console.log("Favorites List Generated:", favorites);

  // Initially render a random favorite to the page
  displayRandomFavorite();
}

function getRandomFavorite() {
  if (favorites.length > 0) {
    return favorites[Math.floor(Math.random() * favorites.length)];
  } else {
    console.warn("Favorites list is empty.");
    return "No favorites available.";
  }
}

function displayRandomFavorite() {
  const container = document.getElementById('random-favorite');
  if (container) {
    container.textContent = getRandomFavorite();
  } else {
    console.warn("Container for random favorite not found.");
  }
}

// Make the refreshFavorite function globally available
window.refreshFavorite = displayRandomFavorite;

// Call the build process
build_favorites();