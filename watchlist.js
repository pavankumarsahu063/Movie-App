const API_KEY = "ebf33f183e050fdb06ee9f02b2aaf83d";
const watchListContainer = document.querySelector(".watchlist-container");
addEventListener("load", async () => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  console.log(watchlist);

if (watchlist.length === 0) {
document.querySelector(".modal").style.display = "block";
}

  watchlist.forEach(async (movieId) => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    const movieContainer = document.createElement("div");
    movieContainer.className = "movie-container";
    movieContainer.innerHTML += `
            <img class="imgs" src="https://image.tmdb.org/t/p/w500/${
              data.poster_path
            }" alt="${data.title}">
            <h2>${data.title}</h2>
            <p>Runtime: ${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m</p>
           <p>Release Date: ${data.release_date}</p>
               <p>Rating: ⭐ ${Math.floor(data.vote_average * 10) / 10}</p>

               <button class="remove-btn">Remove</button>
               <button>Watch Trailer</button>
        `;

    watchListContainer.appendChild(movieContainer);


    movieContainer.querySelector(".remove-btn").addEventListener("click",()=>{
       let watchlist=JSON.parse(localStorage.getItem("watchlist")) || [];
       watchlist=watchlist.filter(movieId=>movieId!==data.id);
       console.log(watchlist)
       localStorage.setItem("watchlist",JSON.stringify(watchlist));
       location.reload()
       window.scrollTo({ top: 0, behavior: "smooth" });
    })


    
  });
});


