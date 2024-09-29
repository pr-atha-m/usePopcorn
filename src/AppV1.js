import { useEffect, useState } from "react";
import "./index.css";
import Stars from "./Stars";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Results({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onMovieSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onMovieSelect={onMovieSelect} />
      ))}
    </ul>
  );
}

function Movie({ movie, onMovieSelect }) {
  return (
    <li key={movie.imdbID} onClick={() => onMovieSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMovieList({ watched, handleDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie?.imdbID}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, handleDelete }) {
  return (
    <li key={movie?.imdbID}>
      <img src={movie?.poster} alt={`${movie?.title} poster`} />
      <h3>{movie?.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie?.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie?.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie?.runtime} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={() => handleDelete(movie)}>
        &#10006;
      </button>
    </li>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie?.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie?.userRating));
  const avgRuntime = average(watched.map((movie) => movie?.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

const KEY = "f1c73b57";

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>⭕</span> {message}
    </div>
  );
}

function MovieDetails({ movieId, onMovieSelect, handleWatched, watched }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, onSetRating] = useState();

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);
  const rated = watched.find((movie) => movie.imdbID === movieId)?.userRating;

  const {
    imdbID,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Actors: actors,
    Director: director,
    Plot: plot,
    Released: released,
  } = movieDetails;

  function handleAdd() {
    const newMovie = {
      imdbID,
      title,
      year,
      poster,
      userRating: rating,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };

    console.log(newMovie);
    handleWatched(newMovie);
    onMovieSelect(null);
  }
  console.log(title, year);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        onMovieSelect(null);
      }
    });

    return function () {
      document.removeEventListener("keydown", (e) => {
        if (e.code === "Escape") {
          onMovieSelect(null);
        }
      });
    };
  }, [onMovieSelect]);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}
`
        );
        const data = await res.json();
        setMovieDetails(data);
        console.log(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
      console.log("Clear upp");
    };
  }, [title]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onMovieSelect(null)}>
              &larr;
            </button>
            <img src={poster} alt={`${movieDetails.title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
              </p>
              {imdbRating} IMDb Rating
            </div>
          </header>
          <section>
            {!isWatched ? (
              <div className="rating">
                <Stars maxRating={10} size={25} onSetRating={onSetRating} />
                {rating && (
                  <button className="btn-add" onClick={handleAdd}>
                    + add to list
                  </button>
                )}
              </div>
            ) : (
              <div className="rating" style={{ alignItems: "center" }}>
                <p>You have rated this movie {rated} ⭐</p>
              </div>
            )}

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <div className="loader">Loading... </div>;
}

export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [movieId, setMovieId] = useState(null);

  function handleMovieSelect(id) {
    setMovieId(id === movieId ? null : id);
  }

  function handleWatched(watchedMovie) {
    setWatched((watched) => [...watched, watchedMovie]);
  }

  function handleDelete(watchedMovie) {
    const newWatched = watched.filter((movie) => movie !== watchedMovie);
    console.log(newWatched);
    setWatched(newWatched);
  }

  const controller = new AbortController();

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong while fetching movies");
          }
          const data = await res.json();
          console.log(data);
          if (data.Response === "False") {
            throw new Error(`No movies found`);
          }
          setMovies(data.Search);
          setError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      setMovieId(null);

      if (query.length < 3) {
        setMovies([]);
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!error && !isLoading && (
            <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {movieId ? (
            <MovieDetails
              movieId={movieId}
              setMovieId={setMovieId}
              onMovieSelect={handleMovieSelect}
              handleWatched={handleWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} handleDelete={handleDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
