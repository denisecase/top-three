/**
 * peep_page.js
 * Fetches and renders Markdown content for individual peep pages.
 */
const params = new URLSearchParams(window.location.search);
const page = params.get('page') || 'blaze';
const mdFile = `../peeps/${page}.md`;

// Set the page title dynamically
document.getElementById('page-title').innerText = `${page.charAt(0).toUpperCase() + page.slice(1)}'s Top 3`;

// Build the GitHub Edit link
const githubLink = `https://github.com/denisecase/top-three/blob/main/peeps/${page}.md`;
document.getElementById('edit-link').href = githubLink;
document.getElementById('edit-link').innerText = `Edit ${page.charAt(0).toUpperCase() + page.slice(1)}.md on GitHub`;

// Load Markdown content
fetch(mdFile)
    .then(response => response.ok ? response.text() : Promise.reject())
    .then(markdown => {
        document.getElementById('content').innerHTML = marked.parse(markdown);
    })
    .catch(() => {
        document.getElementById('content').innerHTML = `<p>Could not load content for ${page}.md</p>`;
    });

// Load the custom "Go Home" button style
const cssPath = `../styles/peep_page/${page}.css`;
fetch(cssPath).then(res => {
  if (res.ok) {
    console.log(`Go Home Button CSS found for ${page}`);
    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    linkTag.href = cssPath;
    document.head.appendChild(linkTag);
  } else {
    console.log(`Go Home Button CSS not found for ${page}`);
  }
}).catch(err => {
  console.error(`Error loading CSS for ${page}:`, err);
});
