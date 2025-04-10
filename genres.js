const API_KEY = "ebf33f183e050fdb06ee9f02b2aaf83d";
const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`;

const mainDiv = document.querySelector(".main");

addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(data);

  data.genres.forEach((ele) => {
    console.log(ele.id);
    const genreDiv = document.createElement("div");
    genreDiv.className = "genres";

    genreDiv.innerHTML = `
            <button class="genre-btn">${ele.name}</button>
            
        `;
    document.querySelector(".geners-container").append(genreDiv);

    const genereBtn = genreDiv.querySelectorAll(".genre-btn");
    genereBtn.forEach((movie) => {
      const genreId = movie.id;
      console.log(genreId);

      movie.addEventListener(
        "click",
        async function fetchingMovieByGenre() {
          const moviesByGenereResponse = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${ele.id}&page=5`
          );

          const moviesByGenereData = await moviesByGenereResponse.json();

          console.log(moviesByGenereData);
          document.querySelectorAll(".genereMovies").forEach(ele=>ele.remove())
          displayFunction(moviesByGenereData.results);
        }
      );
    });
  });
});

function displayFunction(data) {
  data.forEach((ele) => {
    const genereMovies = document.createElement("div");
    genereMovies.className = "genereMovies";
    genereMovies.innerHTML += `
         <img class="imgs" src="https://image.tmdb.org/t/p/w500/${
           ele.poster_path
         }" alt="imgs">
             <p>${ele.title}</p>
             <span>Relase Date: ${ele.release_date}</span>
                 <span class="age-badge">${
                   ele.adult ? "18+ 🔞" : "All Ages"
                 }</span>
            <button class="now-more-btn">Know More</button>
            <button class="add-watch-list">Add To Watchlist</button>
        
    `;
    document.querySelector(".genereMovies-container").append(genereMovies);
  });
}
