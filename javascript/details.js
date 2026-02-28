import { getUserPhrases, addFavorite } from './storage.js';

const originalEl = document.getElementById("originalPhrase");
const translationEl = document.getElementById("translatedPhrase");
const speakBtn = document.getElementById("speakButton");
const addFavBtn = document.getElementById("addFavoriteButton");

let selectedPhrase = null;

const params = new URLSearchParams(window.location.search);
const phraseId = parseInt(params.get("id"));

window.speak = function() {
    if (!selectedPhrase) return;

    const utterance = new SpeechSynthesisUtterance(selectedPhrase.translation);
    utterance.lang = selectedPhrase.language; 
    speechSynthesis.speak(utterance);
};

async function loadPhrase() {
    try {
        const response = await fetch("phrases.json");
        const apiPhrases = await response.json();
        const userPhrases = getUserPhrases();
        const allPhrases = [...apiPhrases, ...userPhrases];

        selectedPhrase = allPhrases.find(p => p.id === phraseId);
        if (!selectedPhrase) {
            originalEl.textContent = "Phrase not found";
            translationEl.textContent = "";
            speakBtn.style.display = "none";
            addFavBtn.style.display = "none";
            return;
        }

        originalEl.textContent = selectedPhrase.original;
        translationEl.textContent = selectedPhrase.translation;
        
        addFavBtn.onclick = () => {
            addFavorite(selectedPhrase);
            addFavBtn.textContent = "Added!";
            addFavBtn.disabled = true;
        };

    } catch (err) {
        console.error("Error loading phrase:", err);
    }
}


loadPhrase();