let gameList = document.getElementsByClassName("gameList");
const url = `https://api.rawg.io/api/games?key=${apiKey}`

function fetchGames(url){

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            if(data.results && data.count > 0){
                console.log(data.count);
                console.log(data.results);
                showGames(data.results);
            }

        }) 
}
fetchGames(url);