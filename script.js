let gameList = document.getElementById("gameList");
let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("prev");
let nextPage = null;
let previousPage = null;
let input = document.getElementById("search");
let bigP = document.getElementsByClassName("bigP");
let ratingPlus = document.getElementById("rating+");
let ratingMinus = document.getElementById("rating-");
let metacritics = document.querySelectorAll(".metaC");
let older = document.getElementById("older");
let newer = document.getElementById("newer");



let url = `https://api.rawg.io/api/games?key=${apiKey}`;
console.log(url);

function fetchGames(url){

    fetch(url)
           .then(response => response.json())
       .then(data =>{
            if(data.count > 0){
                nextPage = data.next? data.next : null;
                previousPage = data.previous? data.previous : null;
                console.log(nextPage);
                console.log(previousPage);
                showGames(data.results);
            } else if(nextPage == null){
                nextBtn.style.display = "none";
            } else {
                nextBtn.style.display = "block";
            }if(previousPage == null){
                previousBtn.style.display = "none";
            }else {
                previousBtn.style.display = "block";
            }
        })
            .catch(err => {
                console.log(err);
                gameList.innerHTML = `<h1 class="text-center">No games found</h1>`;
            });
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
            <p class="card-text floatRight info infoRating ">${result.rating}</p>
          </i>
          <p class="card-text align-self-start bigP" ><strong>Metacritic score:</strong><span class="${getMetacriticScore(result.metacritic)} space infoMetacritic"><strong>${result.metacritic}</strong></span> </p>
          <i class="fa-solid fa-calendar red floatRight">  <p class="card-text floatRight info infoRelease ">${result.released}</p></i>
        </div>

        </div>
        `;
        if (result.metacritic === null || result.metacritic === 0) {
            const metacriticMessage = document.createElement("p");
            metacriticMessage.textContent = "Metacritic score not available";
            metacriticMessage.classList.add("card-text", "text-muted");
            gameCard.querySelector(".bigP").innerHTML = metacriticMessage.textContent;
        }
        if(result.released === null){
            const releasedMessage = document.createElement("p");
            releasedMessage.textContent = "Released date not available";
            releasedMessage.classList.add("card-text", "text-muted");
            gameCard.querySelector(".infoRelease").innerHTML = releasedMessage.textContent;
        }
        if(result.rating === null || result.rating === 0){
            const ratingMessage = document.createElement("p");
            ratingMessage.textContent = "Rating not available";
            ratingMessage.classList.add("card-text", "text-muted");
            gameCard.querySelector(".infoRating").innerHTML = ratingMessage.textContent;
        }
            gameList.appendChild(gameCard);
    });
};
fetchGames(url);

nextBtn.addEventListener("click", ()=>{
    if(nextPage){
     fetchGames(nextPage, next);
    }
})

previousBtn.addEventListener("click", ()=>{
    if(previousPage){
        fetchGames(previousPage);
    }
})
function getMetacriticScore(vote){    
        if(vote > 90){
            return "green";
        }else if (vote >= 75){
            return "orange";
        }else{
            return "red"
    }
};





function submit() {
    let input = document.getElementById("search").value;
    let words = input.split(" ");
    let camelCaseInput = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    if(url.search("&search") === -1){
        url = url +`&search=${camelCaseInput}`;
        fetchGames(url);
    } else {
        url = url.replace(/&search=\w+(\,\w+)?/, `&search=${camelCaseInput}`);
        console.log(url);
        fetchGames(url);
    }
}


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

    
metacritics.forEach(meta => meta.addEventListener("click", ()=>{
    let metacriticValue = meta.value;
    if(url.search("&metacritic") === -1){
            url = url + `&metacritic=${metacriticValue},${metacriticValue + 20}`;
            console.log(url);
            fetchGames(url);
        }else{
            url = url.replace(/&metacritic=\d+,\d+/, `&metacritic=${metacriticValue},${metacriticValue + 20}`);
            console.log(url);
        fetchGames(url);}
    }));

newer.addEventListener("click", ()=>{
    if(url.search("&ordering") === -1){
         url = url + "&ordering=-released";
         fetchGames(url)
        } else{
            url = url.replace("&ordering=released", "&ordering=-released");
            console.log(url);
            fetchGames(url);
         }
        })

older.addEventListener("click", ()=>{
    if(url.search("&ordering") === -1){
         url = url + "&ordering=released";
         fetchGames(url)}else{
            url = url.replace("&ordering=-released", "&ordering=released");
            console.log(url);
            fetchGames(url);
         }
        })