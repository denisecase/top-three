document.addEventListener("DOMContentLoaded", () => {
    fetch('favorites.js')
      .then(() => {
        const random = favorites[Math.floor(Math.random() * favorites.length)];
        document.getElementById("random-favorite").innerText = random;
      })
      .catch(() => {
        document.getElementById("random-favorite").innerText = "Favorite not available.";
      });
  });
  