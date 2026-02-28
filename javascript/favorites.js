import { getUserPhrases } from "./storage.js";

const favoritesListDiv = document.getElementById('favoritesList');


function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesListDiv.innerHTML = "";

    if (favorites.length === 0) {
        favoritesListDiv.innerHTML = "<p>No favorite phrases yet.</p>";
        return;
    }

    favorites.forEach(fav => {  
        const div = document.createElement("div");
        div.className = "phrase";

        div.innerHTML = `
            <strong>${fav.original}</strong> - ${fav.translation}
            <button class="remove-btn" data-id="${fav.id}">Remove</button>
        `;

        
        div.querySelector("strong").style.cursor = "pointer";
        div.querySelector("strong").addEventListener("click", () => {
            window.location.href = `details.html?id=${fav.id}`;
        });

        favoritesListDiv.appendChild(div);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            removeFavorite(id);
        });
    });
}


function removeFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites(); 
}


loadFavorites();