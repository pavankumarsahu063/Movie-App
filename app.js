let currentPage=1;
let totalPage;
const API_KEY = "ebf33f183e050fdb06ee9f02b2aaf83d";
const mainDiv = document.querySelector(".main");
const inputData = document.getElementById("input");


const mainPageDomLoaded=async (page) => {
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
//  console.log(data)
//  console.log(data.total_results)
 totalPage=data.total_results;
//  console.log(totalPage)
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
                 
    const addWatchListBtn= moviesDiv.querySelector(".add-watch-list");   
    addWatchListBtn.addEventListener("click",()=>{
      let watchlist=JSON.parse(localStorage.getItem("watchlist")) || [];
      const exists= watchlist.find(movie=>movie===ele.id);
      if(!exists){
        watchlist.push(ele.id);
        localStorage.setItem("watchlist",JSON.stringify(watchlist));
        setTimeout(()=>{
          document.querySelector(".modal").style.display="block";
        },1000)
      }
      else{
        document.querySelector(".modal-heading").textContent="Opps!"
        document.querySelector(".message").textContent="This Movie Already In Whislist";
        document.querySelector(".modal").style.display="block";
      }
    })


  });
}

//modal 
window.addEventListener("click",(e)=>{
  if (e.target ==  document.querySelector(".modal")) {
    document.querySelector(".modal").style.display = "none";
  }
  

})

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
  window.scrollTo({ top:30, behavior: "smooth" });
});

document.getElementById("prev").addEventListener("click",()=>{
  if(currentPage>1){
    currentPage--;
    mainPageDomLoaded();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

})