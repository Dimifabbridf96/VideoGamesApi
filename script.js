let gameList = document.getElementById("gameList");
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("prev");
let nextPage = null;
let previousPage = null;
let input = document.getElementById("search");
let bigP = document.getElementsByClassName("bigP");
let ratingPlus = document.getElementById("rating+");
let ratingMinus = document.getElementById("rating-");


let url = `https://api.rawg.io/api/games?key=${apiKey}`;

function fetchGames(url){

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            if(data.count > 0){
                nextPage = data.next ? data.next : null;
                previousPage = data.previous ? data.previous : null;
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
          <h5 class="card-title gameName">${result.name}</h5>
          <div class="d-flex flex-column align-items-end justify-content-around ">
          <i class="fa-solid fa-star yellow rating">
            <p class="card-text floatRight info ">${result.rating}</p>
          </i>
          <p class="card-text align-self-start bigP" ><strong>Metacritic score:</strong><span class="${getMetacriticScore(result.metacritic)} space" class="metacritic" ><strong>${result.metacritic}</strong></span> </p>
          <i class="fa-solid fa-calendar red floatRight released">  <p class="card-text floatRight info ">${result.released}</p></i>
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

previousBtn.addEventListener("click", ()=>{
    if(previousPage){
        fetchGames(previousPage);
    }
})
function getMetacriticScore(vote){
    if(vote === null){
        let bigP= document.querySelectorAll(".bigP")
         bigP.forEach(bigP => bigP.classList.add("hidden"));
         return "hidden";
    }
    else if(vote > 90){
        return "green";
    }else if (vote >= 75){
        return "orange";
    }else{
        return "red"
    }
};



function submit(){
    let input = document.getElementById("search").value;
    let camelCaseInput = input.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
    console.log(camelCaseInput);
    url = url +`&search=${camelCaseInput}`
    fetchGames(url);
};


input.addEventListener("keypress", event => {
    if(event.key === "Enter"){
        event.preventDefault();
        submit();
    }
});

ratingPlus.addEventListener("click", ()=>{
    if(url.search("&ordering") === -1){
         url = url + "&ordering=-rating";
         fetchGames(url)}else{
            url = url.replace("&ordering=rating", "&ordering=-rating");
            console.log(url);
            fetchGames(url);
         }
        })

ratingMinus.addEventListener("click", ()=>{
    if(url.search("&ordering") === -1){
         url = url + "&ordering=rating";
         fetchGames(url)}else{
            url = url.replace("&ordering=-rating", "&ordering=rating");
            console.log(url);
            fetchGames(url);
         }
        })
