const API_KEY = "ebf33f183e050fdb06ee9f02b2aaf83d";
let cuurentPage=1;
let lastPage;

const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&page=${cuurentPage}`;

const mainDiv = document.querySelector(".main");

addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();

  // console.log(data);

  data.genres.forEach((ele) => {
    // console.log(ele.id);
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
          totalPage=moviesByGenereData.total_pages;
          // console.log(moviesByGenereData);
          console.log(totalPage)
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
  const previousBtn=document.createElement("button");
  previousBtn.textContent="Prev"
  previousBtn.id="prev";
  const nextBtn=document.createElement("button");
  nextBtn.textContent="next"
  nextBtn.id="next";

  mainDiv.append(previousBtn,nextBtn)

}


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
    const API_KEY = "ebf33f183e050fdb06ee9f02b2aaf83d";
    let currentPage = 1;
    let totalPage = 1;
    let selectedGenreId = null;
    
    const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const mainDiv = document.querySelector(".main");
    
    async function genersByLanguagesFun(id) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${currentPage}`
      );
      const data = await response.json();
      totalPage = data.total_pages;
    
      document.querySelectorAll(".genereMovies").forEach((ele) => ele.remove());
      displayFunction(data.results);
    }
    
    document.addEventListener("DOMContentLoaded", async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
    
      data.genres.forEach((ele) => {
        const genreDiv = document.createElement("div");
        genreDiv.className = "genres";
        genreDiv.innerHTML = `<button class="genre-btn">${ele.name}</button>`;
        document.querySelector(".geners-container").append(genreDiv);
    
        const movieBtn = genreDiv.querySelector(".genre-btn");
        movieBtn.addEventListener("click", () => {
          selectedGenreId = ele.id;
          currentPage = 1;
          genersByLanguagesFun(ele.id);
        });
      });
    });
    
    function displayFunction(data) {
      const container = document.querySelector(".genereMovies-container");
      container.innerHTML = "";
    
      data.forEach((ele) => {
        const genereMovies = document.createElement("div");
        genereMovies.className = "genereMovies";
        genereMovies.innerHTML = `
          <img class="imgs" src="https://image.tmdb.org/t/p/w500/${ele.poster_path}" alt="imgs">
          <p>${ele.title}</p>
          <span>Release Date: ${ele.release_date}</span>
          <span class="age-badge">${ele.adult ? "18+ 🔞" : "All Ages"}</span>
          <button class="now-more-btn">Know More</button>
          <button class="add-watch-list">Add To Watchlist</button>
        `;
        container.append(genereMovies);
      });
    
      // Pagination buttons
      const paginationDiv = document.createElement("div");
      paginationDiv.className = "pagination-controls";
      paginationDiv.innerHTML = `
        <button id="prev" ${currentPage === 1 ? "disabled" : ""}>Prev</button>
        <span>Page ${currentPage} of ${totalPage}</span>
        <button id="next" ${currentPage === totalPage ? "disabled" : ""}>Next</button>
      `;
      mainDiv.append(paginationDiv);
    
      // Add event listeners to dynamically created buttons
      document.getElementById("next").addEventListener("click", () => {
        if (currentPage < totalPage) {
          currentPage++;
          genersByLanguagesFun(selectedGenreId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    
      document.getElementById("prev").addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          genersByLanguagesFun(selectedGenreId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }
    
  }

})
