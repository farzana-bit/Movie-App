//ff947e1a7fcf47fce89d39c0bb91d738

//Data fecthing from Api


//Features need to add

//Lazy loading
//Pagination



const url ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff947e1a7fcf47fce89d39c0bb91d738&page=1'

const searchUrl ='https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=ff947e1a7fcf47fce89d39c0bb91d738&query='



const imagePath = 'https://image.tmdb.org/t/p/w1280'

getMovies(url);


//API Request

async function getMovies(url){
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      renderMovies(data.results);
}


//JavaScript Selectors

const main = document.querySelector('.main');
const form = document.querySelector('form');
const input = document.querySelector('#search');
const page = document.querySelector('.pagination')


//Render Functions

function renderMovies(movies){
      main.innerHTML = '';
      
      movies.forEach((movie) => {
            const movieTitle = movie.title;
            const movieRating = movie.vote_average;
            const moviePoster = movie.poster_path;
            const movieOverview = movie.overview;

            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            movieDiv.innerHTML = ` 
                  <img src="${imagePath + moviePoster}" alt="${movieTitle}" loading="lazy"/>
                  <div class="movie-info">
                  <h3>${movieTitle}</h3>
                  <span class="${getScoreClass(movieRating)}">${movieRating}</span>
                  </div>
                  <div class="overview">
                  <h3>Overview</h3>
                  ${movieOverview}
                  </div>
          `
          main.appendChild(movieDiv);
      })
} 


function getScoreClass(score) {
      if(score >= 8){
            return 'green';
      }else if(score >= 5){
            return 'orange';
      }else{
            return 'red'
      }
}

form.addEventListener('submit', (event) => {
      event.preventDefault();
       const searchValue = input.value.trim(); 
       if(searchValue && searchValue !== ''){
             getMovies(searchUrl + searchValue);
             searchValue = '';
       }else {
             window.location.reload();
       }
})



//     page.pagination({
//         dataSource: [1, 2, 3, 4, 5, 6, 7, ...  50],
//         pageSize: 5,
//         pageRange: null,
//         showPageNumbers: true,
//         callback: function(data, pagination) {
//             // template method of yourself
//             var html = template(data);
//             dataContainer.html(html);
//         }
//     })

