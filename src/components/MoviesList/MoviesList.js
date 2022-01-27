import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import s from "./MoviesList.module.css";

export default function MoviesList({ movies }) {
  const location = useLocation();
  const imgUrl = "https://image.tmdb.org/t/p/w500/";
  console.log(movies);
  return (
    <ul className={s.list}>
      {movies.map(({ id, original_title, poster_path }) => {
        return (
          <li key={id} className={s.item}>
            <div className={s.card}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    from:
                      location.pathname === "/"
                        ? "/"
                        : "/movies" + location.search,
                  },
                }}
              >
                {/* <h3>{ original_title}</h3> */}
                <img
                  className={s.img}
                  src={imgUrl + poster_path}
                  alt={original_title}
                />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

MoviesList.prototype = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string,
      poster_path: PropTypes.string,
    })
  ),
  location: PropTypes.object.isRequired,
};
