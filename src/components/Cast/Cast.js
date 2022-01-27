import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMoviesCast } from "../../services/Api";
import PropTypes from "prop-types";
import s from "./Cast.module.css";

export default function Cast() {
  const params = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getMoviesCast(params.moviesId).then(setCast);
  }, [params.moviesId]);

  return (
    <div>
      {cast && cast.length !== 0 ? (
        <ul className={s.list}>
          {cast.cast.map(({ cast_id, name, character, profile_path }) => {
            return (
              <li key={cast_id} className={s.item}>
                <div className={s.card}>
                  {profile_path && (
                    <img
                      className={s.img}
                      src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                      alt={name}
                    />
                  )}
                  <h3 className={s.boldText}>Actor:</h3>
                  <p className={s.normalText}>{name.toUpperCase()}</p>
                  <h3 className={s.boldText}>Character:</h3>
                  <p className={s.normalText}>{character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h4>Nothing Found</h4>
      )}
      ;
    </div>
  );
}

Cast.prototype = {
  params: PropTypes.string,
  cast: PropTypes.shape({
    cast_id: PropTypes.number.isRequired,
    name: PropTypes.string,
    character: PropTypes.string,
    profile_path: PropTypes.string,
  }),
};
