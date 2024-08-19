import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import './movie.css';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

function Movie({ movies, onRate, ratedMovies }) {
  const [localRatedMovies, setLocalRatedMovies] = useState(ratedMovies || {});

  useEffect(() => {
    setLocalRatedMovies(ratedMovies || {});
  }, [ratedMovies]);

  const handleRateChange = (movieId, value) => {
    const newRatedMovies = { ...localRatedMovies, [movieId]: value };
    setLocalRatedMovies(newRatedMovies);
    if (onRate) onRate(movieId, value);
  };

  const truncate = (str, max = 25) => {
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';
    return array.slice(0, max).join(' ') + ellipsis;
  };

  const getRatingColor = (rating) => {
    if (rating <= 3) return '#E90000';
    if (rating <= 5) return '#E97E00';
    if (rating <= 7) return '#E9D100';
    return '#66E900';
  };

  return (
    <div className="movie">
      {movies.map((movie) => {
        const releaseDate = new Date(movie.release_date);
        const formattedDate = Number.isNaN(releaseDate.getTime())
          ? ''
          : format(releaseDate, 'MMMM dd, yyyy', { locale: enUS });

        const rating = movie.vote_average;
        const ratingColor = getRatingColor(rating);
        const userRating = localRatedMovies[movie.id] || 0;

        return (
          <div className="movie-card" key={movie.id}>
            <img className="movie-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />

            <div className="movie-container">
              <div className="movie-title">{movie.original_title}</div>
              <div className="movie-date">{formattedDate}</div>
              <div className="movie-truncate">{truncate(movie.overview)}</div>
            </div>
            <Rate
              className="rate"
              allowHalf
              count={10}
              value={userRating}
              onChange={(value) => handleRateChange(movie.id, value)}
              style={{ display: 'block', marginTop: 'auto', fontSize: '15px' }}
            />

            <div className="rating" style={{ borderColor: ratingColor }}>
              {rating.toFixed(1)}
            </div>
          </div>
        );
      })}
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
      vote_average: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRate: PropTypes.func,
  ratedMovies: PropTypes.object,
};

export default Movie;
