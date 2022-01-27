import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMoviesReview } from "../../services/Api";
import s from "./Reviews.module.css";
import PropTypes from "prop-types";

export default function Reviews() {
  const params = useParams();
  const [reviews, setReview] = useState(null);

  useEffect(() => {
    getMoviesReview(params.moviesId).then(setReview);
  }, [params.moviesId]);

  return (
    <div>
      {reviews && reviews.length !== 0 ? (
        <ul>
          {reviews.results.map(
            ({
              id,
              author,
              author_details: { avatar_path },
              created_at,
              content,
            }) => {
              return (
                <li key={id} className={s.link}>
                  {avatar_path && (
                    <img
                      className={s.img}
                      src={`https://image.tmdb.org/t/p/original/${avatar_path}`}
                      alt={author}
                    />
                  )}
                  <h4 className={s.boldText}>Author:</h4>
                  <p className={s.normalText}>{author.toUpperCase()}</p>
                  <h4 className={s.boldText}>Created:</h4>
                  <p className={s.normalText}>{created_at.split("T")[0]}</p>
                  <p className={s.textContent}>{content}</p>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <h4>Nothing Found</h4>
      )}
    </div>
  );
}

Reviews.prototype = {
  params: PropTypes.string,
  reviews: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string,
    avatar_path: PropTypes.string,
    created_at: PropTypes.string,
  }),
};
