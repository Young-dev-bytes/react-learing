import { useState } from "react";
import { useEffect } from "react";

const KEY = "3044def2";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  console.log("useMovies", movies);
  useEffect(() => {
    console.log("useMovies - effect");
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        console.log("res", res);
        if (!res.ok) throw new Error("fetch movies went wrong ❗️");
        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error + "❗️");
        console.log("data", data);
        setMovies(data.Search);
        setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setErrorMsg("");
      setMovies([]);
      return;
    }
    // callBack?.();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, errorMsg };
}
