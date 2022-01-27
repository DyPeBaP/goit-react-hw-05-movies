import { useEffect, useState, Suspense, lazy } from "react";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  Link,
  Switch,
  Route,
} from "react-router-dom";
import s from "./MoviesDetailPage.module.css";
import { getMoviesById } from "../../services/Api";

const Cast = lazy(() =>
  import("../../components/Cast/Cast" /* webpackChunkName: "cast-view" */)
);
const Reviews = lazy(() =>
  import(
    "../../components/Reviews/Reviews" /* webpackChunkName: "review-view" */
  )
);

const imgUrl = "https://image.tmdb.org/t/p/w500/";

export default function MoviesDetailPage() {
  const params = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMoviesById(params.moviesId).then(setMovie);
  }, [params.moviesId]);
  if (movie === null) {
    return <h1>Not Found</h1>;
  }

  const hamdleGoBack = () => {
    if (location.state?.from) {
      history.push(location.state?.from);
    }
  };

  return (
    <div  className={s.container}>
      <button className={s.button} type="button" onClick={hamdleGoBack}>
        Go Back
      </button>
      <div className={s.poster}>
        <img
          className={s.img}
          src={imgUrl + movie.poster_path}
          alt={movie.title}
        />
        <div className={s.information}>
          <p className={s.title}>{movie.title}</p>
          <h3 className={s.boldText}>Release date:</h3>
          <p className={s.normalText}>{movie.release_date.split("-")[0]}</p>
          <h3 className={s.boldText}>Rating:</h3>
          <p className={s.normalText}>{movie.vote_average}/10</p>
          <h3 className={s.boldText}>Overview:</h3>
          <p className={s.normalText}>{movie.overview}</p>
          <h3 className={s.boldText}>Genres:</h3>
          <p className={s.normalText}>
            {movie.genres.map((obj) => Object.values(obj)[1]).join(", ")}
          </p>
        </div>
      </div>
      <hr />
      <p className={s.normalText}>Additional information:</p>
      <li className={s.link}>
        <Link
          className={s.colorLink}
          to={{
            pathname: `${url}/cast`,
            state: { ...location.state },
          }}
        >
          Cast
        </Link>
      </li>
      <li  className={s.link}>
        <Link
         className={s.colorLink}
          to={{
            pathname: `${url}/reviews`,
            state: { ...location.state },
          }}
        >
          Reviews
        </Link>
      </li>
      <hr />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path={`${path}/cast`} exact>
            <Cast />
          </Route>

          <Route path={`${path}/reviews`} exact>
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
