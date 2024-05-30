let gameList = document.getElementById("gameList");
const url = `https://api.rawg.io/api/games?key=${apiKey}`;

function fetchGames(url){

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            if(data.count > 0){
                showGames(data.results);
            }

        }) 
}

function showGames(results){
    gameList.innerHTML = "";

    results.forEach(result => {
        const gameCard = document.createElement("div");
        gameList.classList.add("d-flex", "justify-content-around", "flex-wrap")
        gameCard.classList.add("card", "col-lg-5", "col-sm-11");

        gameCard.innerHTML = `
        <img src="${result.background_image}" class="card-img-top" alt="${result.name} card image">
        <div class="card-body">
          <h5 class="card-title">${result.name}</h5>
          <p class="card-text">${result.rating}</p>
          <div class="d-flex justify-content-center">
            <a href="games.html" class="btn btn-primary center">Go somewhere</a>
        `;
            gameList.appendChild(gameCard);
    });
}
fetchGames(url);