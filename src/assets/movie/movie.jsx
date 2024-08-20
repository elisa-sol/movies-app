import React, { useState, useEffect, useContext } from 'react';

import { Rate } from 'antd';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import './movie.css';
import PropTypes from 'prop-types';

import GenreContext from '../genres/genres';

function Movie({ movies, onRate, ratedMovies }) {
  const [localRatedMovies, setLocalRatedMovies] = useState(ratedMovies || {});
  const genres = useContext(GenreContext);

  useEffect(() => {
    setLocalRatedMovies(ratedMovies || {});
  }, [ratedMovies]);

  const handleRateChange = (movieId, value) => {
    const newRatedMovies = { ...localRatedMovies, [movieId]: value };
    setLocalRatedMovies(newRatedMovies);
    if (onRate) onRate(movieId, value);
  };

  const truncate = (str, max = 23) => {
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

  const getGenreNames = (genreIds) => {
    const genreMap = genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
    return Array.isArray(genreIds) ? genreIds.map((id) => genreMap[id] || 'Unknown') : [];
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

        const genreNames = Array.isArray(movie.genre_ids) ? getGenreNames(movie.genre_ids) : [];

        return (
          <div className="movie-card" key={movie.id}>
            <img
              className="movie-img"
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : './noposter.png'}
              alt={movie.title}
            />
            <div className="movie-container">
              <div className="movie-title">{movie.original_title}</div>
              <div className="movie-genres">
                {genreNames.length > 0 ? (
                  genreNames.map((genre, index) => (
                    <span key={index} className="movie-genre">
                      {genre}
                    </span>
                  ))
                ) : (
                  <span />
                )}
              </div>
              <div className="movie-date">{formattedDate}</div>
            </div>
            <div className="movie-truncate">{truncate(movie.overview)}</div>
            <Rate
              className="stars"
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
      genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired, // Добавьте genre_ids
    })
  ).isRequired,
  // eslint-disable-next-line react/require-default-props
  onRate: PropTypes.func,
  ratedMovies: PropTypes.shape({
    [PropTypes.number]: PropTypes.number,
  }).isRequired,
};

export default Movie;
