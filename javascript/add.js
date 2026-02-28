import { addUserPhrase } from './storage.js';

const form = document.getElementById("addPhraseForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const original = document.getElementById("original").value.trim();
    const translation = document.getElementById("translation").value.trim();
    const category = document.getElementById("category").value;
    const language = document.getElementById("language").value;

    if (!original || !translation) return;

    const newPhrase = { original, translation, category, language };

    addUserPhrase(newPhrase);

    alert("Phrase added successfully!");


    form.reset();
});