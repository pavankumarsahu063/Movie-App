let page=5;

document.getElementById("next").addEventListener("click",()=>{
    page++;
    console.log(page)
})

const API_KEY = "ebf33f183e050fdb06ee9f02b2aaf83d";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&$page=2`;

const mainDiv = document.querySelector(".main");
const inputData = document.getElementById("input");

//Main Page It will Display At Time Of Document
addEventListener("DOMContentLoaded", async (page) => {
  const response = await fetch(apiUrl);
  const data = await response.json();
 
  searchMoviesByTitle(data.results);
  displayFunction(data.results);
});

function searchMoviesByTitle(data) {
  inputData.onkeyup = () => {
    const filterMovie = data.filter((movie) =>
      movie.title.toLowerCase().includes(inputData.value)
    );
    console.log(filterMovie);
    
    displayFunction(filterMovie);

  };
}

function displayFunction(data) {
  mainDiv.innerHTML = "";
  data.forEach((ele) => {
    const moviesDiv = document.createElement("div");
    moviesDiv.className = "movies";
//    <!-- console.log(ele) -->

    moviesDiv.innerHTML = `
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

    mainDiv.append(moviesDiv);


  
  });
 
}
const searchBtn=document.getElementById("search-btn");

searchBtn.addEventListener("click",async ()=>{
  const movieTitle=inputData.value;
   const searchByMovieNameApiUrl=`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieTitle)}`;

   const response=await fetch(searchByMovieNameApiUrl);
   const data=await response.json();

   console.log(data.results)

   if(data.results)
   displayFunction(data.results)

})
