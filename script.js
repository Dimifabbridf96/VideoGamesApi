let gameList = document.getElementById("gameList");
let nextBtn = document.getElementById("next");
let nextPage = null;

const url = `https://api.rawg.io/api/games?key=${apiKey}`;

function fetchGames(url){

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            if(data.count > 0){
                nextPage = data.next ? data.next : null;
                showGames(data.results);
            }

        }) 
}

function showGames(results){
    gameList.innerHTML = "";

    results.forEach(result => {
        const gameCard = document.createElement("div");
        gameList.classList.add("d-flex", "justify-content-around", "flex-wrap", "black")
        gameCard.classList.add("card", "col-lg-3","col-md-6", "col-sm-11", "games");

        gameCard.innerHTML = `
        <img src="${result.background_image}" class="card-img-top gameHeight " alt="${result.name} card image">
        <div class="card-body">
          <h5 class="card-title">${result.name}</h5>
          <div class="d-flex flex-column align-items-end">
          <i class="fa-solid fa-star  yellow">
            <p class="card-text floatRight info ">${result.rating}</p>
          </i><br>
          <i class="fa-solid fa-calendar red floatRight">  <p class="card-text floatRight info ">${result.released}</p></i>
        </div>
        </div>
        `;
            gameList.appendChild(gameCard);
    });
};
fetchGames(url);

nextBtn.addEventListener("click", ()=>{
    if(nextPage){
        fetchGames(nextPage);
    }
})
