import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router";
import Header from "./components/Header/Header";

const HomePage = lazy(() =>
  import("./views/HomePage/HomePage" /* webpackChunkName: "home-page"  */)
);

const MoviesDetailPage = lazy(() =>
  import(
    "./views/MoviesDetailPage/MoviesDetailPage" /* webpackChunkName: "movies-detail-page"  */
  )
);

const MoviesPage = lazy(() =>
  import("./views/MoviesPage/MoviesPage" /* webpackChunkName: "movies-page"  */)
);

export default function App() {
  return (
    <div>
      <Header />
      <hr />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:moviesId">
            <MoviesDetailPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

//=========================================================
// netlify.toml
// [build]
// publish = "build"

// [[redirects]]
// from = "/*"
// to = "/index.html"
// status = 200
//=========================================================
