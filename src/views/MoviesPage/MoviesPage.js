import { useState, useEffect } from "react";
import { getMoviesByQuery } from "../../services/Api";
import { useHistory } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";
import s from "./MoviesPage.module.css"

export default function MoviesPage() {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (history.location?.search !== "") {
      const prevQuery = history.location?.search.split("=")[1];
      getMoviesByQuery(prevQuery).then(setMovies);
      setQuery(prevQuery);
    }
  }, [history.location?.search]);

  function handleSubmit(e) {
    e.preventDefault();
    getMoviesByQuery(query).then(setMovies);

    history.push({ ...history.location, search: `?query=${query}` });
  }

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className={s.input}
        />
        <button className={s.button} type="submit">Search</button>
      </form>
      <MoviesList movies={movies} />
    </div>
  );
}
