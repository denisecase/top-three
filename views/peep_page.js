/**
 * peep_page.js
 * Fetches and renders Markdown content for individual peep pages.
 */
const params = new URLSearchParams(window.location.search);
const page = params.get('page') || 'blaze';
const mdFile = `../peeps/${page}.md`;

// Set the page title dynamically
document.getElementById('page-title').innerText = `${page.charAt(0).toUpperCase() + page.slice(1)}'s Top 3`;

// Fill the GitHub Edit links dynamically
document.getElementById('edit-md-link').href = `https://github.com/denisecase/top-three/blob/main/peeps/${page}.md`;
document.getElementById('edit-css-link').href = `https://github.com/denisecase/top-three/blob/main/styles/peep_page/${page}.css`;
document.getElementById('edit-home-button-css-link').href = `https://github.com/denisecase/top-three/blob/main/styles/home_button/${page}.css`;

// Load Peep's CSS Dynamically
const peepCSSPath = `../styles/peep_page/${page}.css`;
const linkTag = document.createElement('link');
linkTag.rel = 'stylesheet';
linkTag.href = peepCSSPath;
document.head.appendChild(linkTag);

// Load Markdown content
fetch(mdFile)
    .then(response => response.ok ? response.text() : Promise.reject())
    .then(markdown => {
        document.getElementById('content').innerHTML = marked.parse(markdown);
    })
    .catch(() => {
        document.getElementById('content').innerHTML = `<p>Could not load content for ${page}.md</p>`;
    });
