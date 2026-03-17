export function getUserPhrases() {
    const phrases = JSON.parse(localStorage.getItem("userPhrases")) || [];
    console.log(phrases);
    return phrases;
}


export function addUserPhrase(phrase) {
    const phrases = getUserPhrases();

    
    const nextId = phrases.length ? Math.max(...phrases.map(p => p.id)) + 1 : 10000;
    phrase.id = nextId;

    phrases.push(phrase);
    localStorage.setItem("userPhrases", JSON.stringify(phrases));
}


export function addFavorite(phrase) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find(fav => fav.id === phrase.id)) {
        favorites.push(phrase);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}