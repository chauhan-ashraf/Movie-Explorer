const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movieBox = document.querySelector("#movieBox");
const searchBtn = document.querySelector("#search");

const getMovies = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  showMovies(data.results);
};

const showMovies = (data) => {
  movieBox.innerHTML = ""; //To Empty the data
  data.forEach((item) => {
    console.log(data);
    const rating = Math.floor(item.vote_average);
    const overView = item.overview;
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
    <div class="container">
    <div class="box-1">
      <img
        src="${IMGPATH + item.poster_path}"
        alt=""
      />
      <p>${item.title}</p>
      <h5>Release Date: <span>${item.release_date}</span></h5>
      <h5>Rating: <Span>${rating}</Span></h5>
      <h5 class="overview">Overview: <Span>${overView}</Span></h5>
    </div>
 `;
    movieBox.appendChild(box);
  });
};

searchBtn.addEventListener("keyup", function (event) {
  console.log(event.target.value);
  if (event.target.value != "") {
    getMovies(SEARCHAPI + event.target.value); // To Search the movies
  } else {
    getMovies(APIURL); // Popular Movies
  }
});

getMovies(APIURL);
