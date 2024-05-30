let gameList = document.getElementsByClassName("gameList");
const url = `https://api.rawg.io/api/games?key=${apiKey}`

function fetchGames(url){

    fetch(url)
        .then(response => response.json())
        .then(data =>{console.log(data)

        }) 
}
fetchGames(url);