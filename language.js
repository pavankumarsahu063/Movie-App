const movieContainer = document.querySelector(".movie-container");
const apiKey = "ebf33f183e050fdb06ee9f02b2aaf83d";
async function getMovies(languageCode) {
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${languageCode}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  console.log(data);
  movieContainer.innerHTML = "";
  data.results.forEach((movie) => {
    const movies = document.createElement("div");
    movies.className = "movies";
    movies.innerHTML += `
          
           <img class="poster" src="https://image.tmdb.org/t/p/w500${
             movie.poster_path
           }" alt="${movie.title}" />
<h2>${movie.title}</h2>
<p><strong>Original Title:</strong> ${movie.original_title}</p>
<p><strong>Language:</strong> ${movie.original_language.toUpperCase()}</p>
<p><strong>Release Date:</strong> ${movie.release_date}</p>
<p><strong>Rating:</strong> ⭐ ${Math.floor(movie.vote_average*10)/10}</p>
<p>${movie.overview}</p>
          
          `;
    movieContainer.append(movies);
  });
}
