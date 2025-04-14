

let currentPage=1;
let totalPage;
const API_KEY = "ebf33f183e050fdb06ee9f02b2aaf83d";
const mainDiv = document.querySelector(".main");
const inputData = document.getElementById("input");


const mainPageDomLoaded=async (page) => {
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
 console.log(data)
//  const filteredResults = data.results.map(each => ({
//   backdropPath:each.backdrop_path,
//   genreId:each.genre_ids
//  })) 
 console.log(filteredResults)
 console.log(data.total_results)
 totalPage=data.total_results;
 console.log(totalPage)
  searchMoviesByTitle(data.results);
  displayFunction(data.results);
}
//Main Page It will Display At Time Of Document

addEventListener("DOMContentLoaded",mainPageDomLoaded() );
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
// localStorage.setItem("moviId",ele.id)
    moviesDiv.innerHTML = `
            <img class="imgs" src="https://image.tmdb.org/t/p/w500/${
              ele.poster_path
            }" alt="imgs">
             <p>${ele.title}</p>
             <span>Relase Date: ${ele.release_date}</span>
                 <span class="age-badge">${
                   ele.adult ? "18+ 🔞" : "All Ages"
                 }</span>
                 <span class="papularity">Rating: ⭐${Math.floor(ele.vote_average*10)/10}</span>
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
   console.log(data)
   if(data.results)
   displayFunction(data.results)
})




document.getElementById("next").addEventListener("click",()=>{
  if(currentPage<= totalPage){
  currentPage++;}
  mainPageDomLoaded();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("prev").addEventListener("click",()=>{
  if(currentPage>1){
    currentPage--;
    mainPageDomLoaded();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

})