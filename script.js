let gameList = document.getElementsByClassName("gameList");
const url = `https://api.rawg.io/api/games?key=${apiKey}`

document.addEventListener("load", fetchGames());

function fetchGames(url){
    fetch(url)
    .then(result => result.json());
}
fetchGames(url);