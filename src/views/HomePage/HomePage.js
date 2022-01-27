import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import getTrendingMovies from "../../services/Api";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    return getTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <MoviesList movies={movies}/>
    </div>
  );
}
