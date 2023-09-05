import { useEffect, useState } from "react";
import StarRating from "./starRating";

const KEY = "3044def2";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("breaking");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  console.log("executing....");

  const handleSelected = (selectId) => {
    setSelectedId((pre) => (pre === selectId ? null : selectId));
  };
  const handleBack = () => {
    setSelectedId(null);
    // document.title = "popCorn";
  };

  const handleAddWatchedMovies = (newWatchedMovie) => {
    setWatched((pre) => [...pre, newWatchedMovie]);
  };

  const handleDeleteWatchedMovies = (id) => {
    setWatched((pre) => {
      return pre.filter((item) => {
        return item.imdbID !== id;
      });
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        console.log(res);

        if (!res.ok) throw new Error("Something went wrong with fetch movies ");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (!query) {
      setMovies([]);
      setErrorMsg("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <SearchInput query={query} setQuery={setQuery} />
        <NumberResults movies={movies} />
      </NavBar>
      <Main>
        {isLoading && !errorMsg && <Loader />}
        {!isLoading && !errorMsg ? (
          <Box>
            <MovieList movies={movies} onHandleSelected={handleSelected} />
          </Box>
        ) : (
          errorMsg && <ErrorMessage errorMsg={errorMsg} />
        )}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onHandleBack={handleBack}
              onHandleAddWatchedMovies={handleAddWatchedMovies}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onHandleDeleteWatchedMovies={handleDeleteWatchedMovies}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

const Loader = () => {
  return <p className="loader">Loading...</p>;
};

const ErrorMessage = ({ errorMsg }) => {
  return (
    <p className="error">
      <span>❗️❗️❗️ {errorMsg}</span>
    </p>
  );
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

const Button = ({ isOpen, setIsOpen }) => {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
};

const Main = ({ children }) => {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
};

const MovieDetails = ({
  selectedId,
  onHandleBack,
  onHandleAddWatchedMovies,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userRating, setUserRating] = useState(0);

  console.log("MovieDetails...");

  // cpmputed seen movies
  const isWatched = watched.map((item) => item.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (item) => item.imdbID === selectedId
  )?.userRating;

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

  const handleAdd = (selectedId) => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    onHandleAddWatchedMovies(newWatchedMovie);
    onHandleBack();
  };

  const handleUserRating = (ratingValue) => {
    setUserRating(ratingValue);
  };

  useEffect(() => {
    const callBack = (event) => {
      if (event.code === "Escape") {
        onHandleBack();
        console.log("closing");
      }
    };
    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [onHandleBack]);

  useEffect(() => {
    console.log("000");
    //https://www.omdbapi.com/?apikey=3044def2&i=tt0478970
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetch movie details ");

        const data = await res.json();
        setMovie(data);
        if (data.Response === "False") throw new Error(data.Error);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    console.log("title");
    if (!title) return;
    document.title = `title | ${title}`;
    console.log(`title | ${title}`);
    return () => {
      document.title = `usePopCorn`;
      console.log(`clean up a movie for title ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading && !errorMsg && <Loader />}

      {!isLoading && !errorMsg ? (
        <>
          <header>
            <button className="btn-back" onClick={onHandleBack}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie} movie`} />

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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={40}
                    onHandleUserRating={handleUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => handleAdd(selectedId)}
                    >
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated with movie {watchedUserRating} ⭐️</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>directed by {director}</p>
          </section>
        </>
      ) : (
        errorMsg && <ErrorMessage errorMsg={errorMsg} />
      )}
    </div>
  );
};

const MovieList = ({ movies, onHandleSelected }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.imdbID}
          onHandleSelected={() => onHandleSelected(movie.imdbID)}
        />
      ))}
    </ul>
  );
};

const MovieItem = ({ movie, onHandleSelected }) => {
  return (
    <li onClick={() => onHandleSelected(movie.imdbID)}>
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

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie?.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
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
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedList = ({ watched, onHandleDeleteWatchedMovies }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedListItem
          movie={movie}
          key={movie.imdbID}
          onHandleDeleteWatchedMovies={onHandleDeleteWatchedMovies}
        />
      ))}
    </ul>
  );
};

const WatchedListItem = ({ movie, onHandleDeleteWatchedMovies }) => {
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
          <span>{movie?.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onHandleDeleteWatchedMovies(movie?.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
};

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const NumberResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
};

const SearchInput = ({ query, setQuery }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      // onKeyDown={(e) => {
      //   if (e.keyCode === 13) setQuery(e.target.value);
      // }}
      value={query}
      onChange={(event) => {
        console.log(event.target.value);
        setQuery(event.target.value);
      }}
    />
  );
};
