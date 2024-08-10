import React from 'react';

import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import './movie.css';
import PropTypes from 'prop-types';

function Movie({ movies }) {
  const truncate = (str, max = 30) => {
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';

    return array.slice(0, max).join(' ') + ellipsis;
  };

  const renderCount = 6;

  return (
    <div className="movie">
      {movies.slice(0, renderCount).map((movie) => (
        <div className="movie-card" key={movie.id}>
          <img className="movie-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          <div className="movie-container">
            <div className="movie-title">{movie.original_title}</div>
            <div className="movie-date">{format(new Date(movie.release_date), 'MMMM dd, yyyy', { locale: enUS })}</div>
            <div className="movie-truncate">{truncate(movie.overview)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

Movie.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      overview: PropTypes.string,
    })
  ).isRequired,
};
export default Movie;
