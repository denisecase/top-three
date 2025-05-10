/**
 * peep_page.js
 * Fetches and renders Markdown content for individual peep pages.
 */

// Detect environment
//const isGithubPages = window.location.hostname === "denisecase.github.io";
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const ROOT = isGithubPages ? "/top-three" : "..";

// Get the current page from URL
const params = new URLSearchParams(window.location.search);
const page = params.get('page') || 'blaze';

// Resolve Paths Correctly**
const mdFile = `${ROOT}/peeps/${page}.md`;
const peepCSSPath = `${ROOT}/styles/peep_page/${page}.css`;
const defaultCSSPath = `${ROOT}/styles/peep_page/all_peep_defaults.css`;

// **Load the Default CSS First**
const defaultLinkTag = document.createElement('link');
defaultLinkTag.rel = 'stylesheet';
defaultLinkTag.href = defaultCSSPath;
document.head.appendChild(defaultLinkTag);

// **Load Peep's Custom CSS Next**
console.log(`Loading custom CSS from: ${peepCSSPath}`);
fetch(peepCSSPath)
  .then(response => {
    if (response.ok) {
      console.log(`Custom CSS found: ${peepCSSPath}`);
      const linkTag = document.createElement('link');
      linkTag.rel = 'stylesheet';
      linkTag.href = peepCSSPath;
      document.head.appendChild(linkTag);
    } else {
      console.warn(`Custom CSS NOT found: ${peepCSSPath}`);
    }
  })
  .catch(err => {
    console.error(`Error loading CSS for ${page}:`, err);
  });

// Load Markdown content
fetch(mdFile)
    .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch ${mdFile}`);
        return response.text();
    })
    .then(markdown => {
        document.getElementById('content').innerHTML = marked.parse(markdown);
    })
    .catch((error) => {
        console.error(error.message);
        document.getElementById('content').innerHTML = `<p>Could not load content for ${page}.md</p>`;
    });

// Set the Page Title
document.getElementById('page-title').innerText = `${page.charAt(0).toUpperCase() + page.slice(1)}'s Top 3`;

// Set GitHub Edit Links
document.getElementById('edit-md-link').href = `https://github.com/denisecase/top-three/blob/main/peeps/${page}.md`;
document.getElementById('edit-css-link').href = `https://github.dev/denisecase/top-three/edit/main/styles/peep_page/${page}.css`;
document.getElementById('edit-home-button-css-link').href = `https://github.dev/denisecase/top-three/edit/main/styles/home_button/${page}.css`;
