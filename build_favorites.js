/**
 * build_favorites.js
 * Dynamically generates the favorites array from Markdown files.
 */
const peeps = [
    "blaze", "comet", "coach", "duchess", "dynamo", "guardian", 
    "kernel", "mario", "ranger", "rocket", "skylark", "sport", 
    "stella", "unicorn", "willow"
  ];
  
  const favorites = [];
  
  async function build_favorites() {
    for (const peep of peeps) {
      const response = await fetch(`peeps/${peep}.md`);
      if (response.ok) {
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
        console.warn(`Could not load markdown for ${peep}`);
      }
    }
  
    // Log it to confirm it's building correctly
    console.log("Favorites List Generated:", favorites);
  
    // If you want to render it to the page
    const container = document.getElementById('random-favorite');
    if (container && favorites.length > 0) {
      container.textContent = favorites[Math.floor(Math.random() * favorites.length)];
    }
  }
  
  build_favorites();
  