const API_KEY = "ebf33f183e050fdb06ee9f02b2aaf83d";
let currentPage=1;
let totalPage;
let currentSelectGenre;

const genereApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`;
const mainDiv = document.querySelector(".main");


//Function For Fetching The Movies According to the genre
async function fetchingMovieByGenre(genreId) {
  console.log(`Genre Id In Function ${genreId}`)
  currentSelectGenre=genreId;
  //Movies By Genetre
  const moviesByGenereResponse = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${currentPage}`
  );

  const moviesByGenereData = await moviesByGenereResponse.json();
  totalPage=moviesByGenereData.total_pages;
  // console.log(moviesByGenereData);
  console.log(totalPage)
  document.querySelectorAll(".genereMovies").forEach(ele=>ele.remove())  //to remove previous cards
  displayFunction(moviesByGenereData.results);
  document.querySelector(".btn").style.display="block";


} 


// Function for display akk the genre 
addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(genereApiUrl);
  const data = await response.json();
  // console.log(data)
  data.genres.forEach((ele) => {
    // console.log(ele.id);
    genreId=ele.id;
    const genreDiv = document.createElement("div");
    genreDiv.className = "genres";
    genreDiv.innerHTML = `
            <button class="genre-btn">${ele.name}</button>
            
        `;
    document.querySelector(".geners-container").append(genreDiv);
    const genereBtn = genreDiv.querySelectorAll(".genre-btn");
    genereBtn.forEach((movie) => {
      // const genreId = movie.id;
      // console.log(genreId);
      movie.addEventListener(
        "click",()=> {
          currentPage=1;
          fetchingMovieByGenre(ele.id)
        }
      );
    });
  });
});

//Function for displaying Movies
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

//Paging
document.getElementById("next").addEventListener("click",()=>{
  if(currentPage<= totalPage){
  currentPage++;}
  fetchingMovieByGenre(currentSelectGenre);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchingMovieByGenre(currentSelectGenre);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
