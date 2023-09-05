import { useEffect, useRef, useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import StarRating from "./starRating";
import "./index.css";

const average = (arr) =>
  arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "3044def2";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /* custom hooks **/
  const { movies, isLoading, errorMsg } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  const handleSelectedId = (inSelectedId) => {
    setSelectedId((pre) => (pre === inSelectedId ? null : inSelectedId));
  };

  function handleCloseMovieDetails() {
    setSelectedId(null);
  }

  const handleAddWatchedMovie = (watchedMovie) => {
    setWatched((pre) => [watchedMovie, ...pre]);
  };

  const handleDeleteWatchedMovie = (deleteId) => {
    setWatched((pre) => pre.filter((item) => item.imdbID !== deleteId));
  };

  console.log("app");
  console.log(movies);
  console.log("during render", watched);

  useEffect(() => {
    console.log("after initial render");
  }, []);

  useEffect(() => {
    console.log("after every render");
  });

  useEffect(() => {
    console.log("D");
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumberResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && errorMsg && <ErrorMsg errorMsg={errorMsg} />}
          {!errorMsg && (
            <MoviesList movies={movies} onHandleSelectedId={handleSelectedId} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onHandleCloseMovieDetails={handleCloseMovieDetails}
              onHandleAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMoviesListSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onHandleDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const MovieDetails = ({
  selectedId,
  onHandleCloseMovieDetails,
  onHandleAddWatchedMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userRating, setUserRating] = useState(null);

  const countRef = useRef(0);

  const isWatched = watched.map((item) => item.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (item) => item.imdbID === selectedId
  )?.userRating;
  console.log("selectedId", selectedId);
  console.log("movie", movie);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  useEffect(() => {
    const func = (e) => {
      if (e.code === "Escape") {
        onHandleCloseMovieDetails();
        console.log("closing");
      }
    };
    document.addEventListener("keydown", func);

    return () => {
      document.removeEventListener("keydown", func);
    };
  }, [onHandleCloseMovieDetails]);

  useEffect(() => {
    console.log("every render details");
  });

  useEffect(() => {
    console.log("initial details");
  }, []);

  useEffect(() => {
    // fetch movie details
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        console.log(res);
        if (!res.ok) throw new Error("fetch details went wrong ❗️");
        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovie(data);
      } catch (error) {
        console.log(error.message);
        setErrorMsg(error.message + "❗️");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Released: released,
    Director: director,
    Genre: genre,
  } = movie;

  const isTop = imdbRating > 8;

  console.log("isTop", isTop);

  console.log("title", title);
  useEffect(() => {
    console.log("==");
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  const handleSetUserRating = (rating) => {
    setUserRating(rating);
  };

  const handleWatchedMovie = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      runtime: Number(runtime.split(" ").at(0)),
      countRatingDecisions: countRef.current,
    };

    onHandleAddWatchedMovie(newWatchedMovie);
    onHandleCloseMovieDetails();
  };

  console.log("imdbRating", Number(imdbRating));

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : errorMsg ? (
        <ErrorMsg errorMsg={errorMsg} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onHandleCloseMovieDetails}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title} movie`} />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>You rated with movie {watchedUserRating} ⭐️</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onHandleSetUserRating={handleSetUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleWatchedMovie}>
                      + add list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

const NavBar = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    const callBack = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", callBack);
    return () => document.removeEventListener("keydown", callBack);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      value={query}
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

const NumberResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
};

const MoviesList = ({ movies, onHandleSelectedId }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesListItem
          movie={movie}
          key={movie.imdbID}
          onHandleSelectedId={onHandleSelectedId}
        />
      ))}
    </ul>
  );
};

const MoviesListItem = ({ movie, onHandleSelectedId }) => {
  return (
    <li onClick={() => onHandleSelectedId(movie.imdbID)}>
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
};

const Button = ({ isOpen, setIsOpen }) => {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
};

const WatchedMoviesListSummary = ({ watched }) => {
  console.log("watched", watched);
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));
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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched, onHandleDeleteWatchedMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMoviesListItem
          movie={movie}
          key={movie.imdbID}
          onHandleDeleteWatchedMovie={onHandleDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
};

const WatchedMoviesListItem = ({ movie, onHandleDeleteWatchedMovie }) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onHandleDeleteWatchedMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
};

const Loader = () => {
  return <p className="loader">Loading...</p>;
};

const ErrorMsg = ({ errorMsg }) => {
  return (
    <p className="error">
      <span>{errorMsg}</span>
    </p>
  );
};
