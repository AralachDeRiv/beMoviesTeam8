const apiKey = "c369327376b690b2f04d17dd5a689778";
const authorizationJeton =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzY5MzI3Mzc2YjY5MGIyZjA0ZDE3ZGQ1YTY4OTc3OCIsInN1YiI6IjY2NmZlNDEwNDNmY2NkYzVlNGQxZDNhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TmUYwFz5jIaebH7Os1vUIJheb-TucmkeIvD2E0XuqsU";
const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${authorizationJeton}`,
    accept: "application/json",
  },
};

// return a list of movies
const searchMovie = async (userInput) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${userInput}&include_adult=false&language=en-US&page=1`;
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const JSONresponse = await response.json();
      return JSONresponse.results;
    }
    console.log("Network error");
  } catch (err) {
    console.log(err.message);
  }
};

const getPoster = (movie) => {
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const posterPath = movie.poster_path;
  return imgUrl + posterPath;
};

const getTitle = (movie) => {
  return movie.original_title;
};

const getYearOfRelease = (movie) => {
  const releaseDate = movie.release_date;
  const year = releaseDate.split("-")[0];
  return year;
};

const getVoteAverage = (movie) => {
  return movie.vote_average.toFixed(1);
};

const getOverview = (movie) => {
  return movie.overview;
};

const getCastingFromMovie = async (movie) => {
  const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US&append_to_response=credits`;
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const JSONresponse = await response.json();
      const casting = JSONresponse.credits.cast.map((person) => person.name);
      return casting;
    }
    console.log("Network error");
  } catch (err) {
    console.log(err.message);
  }
};

const getGenresListID = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );
    if (response.ok) {
      const JSONresponse = await response.json();
      return JSONresponse.genres;
    }
    console.log("Network error");
  } catch (err) {
    console.log(err);
  }
};

// return a list of the genres of a movie
const getGenresOfMovie = async (movie) => {
  const genresList = await getGenresListID();
  const movieGenresId = movie.genre_ids;
  const genresOfMovie = genresList
    .filter((genre) => movieGenresId.includes(genre.id))
    .map((genre) => genre.name);
  return genresOfMovie;
};

const genres = {
  comedyID: 35,
  actionID: 28,
  dramaID: 18,
  fantasyID: 14,
  animationID: 16,
  romanceID: 10749,
};

// returl a list of movies by genre
const getFilmByGenre = async (genreID) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28'${genreID}`;
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const JSONresponse = await response.json();
      return JSONresponse.results;
    }
    console.log("Network error");
  } catch (err) {
    console.log(err.message);
  }
};

const getLatestReleases = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const JSONresponse = await response.json();
      return JSONresponse.results;
    }
  } catch (err) {
    console.log(err.message);
  }
};

getLatestReleases()
  .then((x) => getOverview(x[0]))
  .then((x) => console.log(x));
