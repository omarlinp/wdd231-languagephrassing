import { getUserPhrases } from './storage.js';

let phrases = []; 

const categorySelect = document.getElementById('category');
const languageSelect = document.getElementById('language');
const phraseListDiv = document.getElementById('phraseList');


async function loadPhrasesData() {
    try {
        const response = await fetch("phrases.json");
        const apiPhrases = await response.json();
        const userPhrases = getUserPhrases(); 
        phrases = [...apiPhrases, ...userPhrases];
        renderPhrases();
    } catch (error) {
        phraseListDiv.innerHTML = "<p>Error loading phrases data.</p>";
        console.error(error);
    }
}


function renderPhrases() {
    const category = categorySelect.value;
    const filtered = phrases.filter(p => p.category === category);

    phraseListDiv.innerHTML = "";
    if (filtered.length === 0) {
        phraseListDiv.innerHTML = "<p>No phrases found for this category.</p>";
        return;
    }

    filtered.forEach(p => {
        const div = document.createElement('div');
        div.className = "phrase"; 
        div.textContent = `${p.original} → ${p.translation}`;

        
        div.onclick = () => {
            window.location.href = `details.html?id=${p.id}`;
        };

        phraseListDiv.appendChild(div);
    });
}


categorySelect.addEventListener("change", renderPhrases);


languageSelect.addEventListener("change", () => {
    
});


loadPhrasesData();