import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import './movie.css';

function Movie() {
  const [movie, setMovie] = useState(null);

  const getMovie = () => {
    fetch('https://api.themoviedb.org/3/movie/550?api_key=3c121458c8c65f0e1c4b0e1cc6b1b94a')
      .then((res) => res.json())
      .then((json) => setMovie(json))
      .catch((error) => console.error('Error fetching the movie data:', error));
  };

  const truncate = (str, max = 40) => {
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';

    return array.slice(0, max).join(' ') + ellipsis;
  };

  useEffect(() => {
    getMovie();
  }, []);

  const renderCount = 6;

  console.log(movie);

  return (
    <div className="movie">
      {movie &&
        Array.from({ length: renderCount }).map(() => (
          <div className="movie-card" key={Date.now() + Math.random()}>
            <img
              className="movie-img"
              // style={{ width: '183px', height: '281px', marginLeft: '10px', marginTop: '10px' }}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="movie-container">
              <div className="movie-title">{movie.original_title}</div>

              <div className="movie-date">{`${format(new Date(movie.release_date), 'MMMM dd, yyyy', { locale: enGB })}`}</div>

              <div className="movie-genres">{movie.genres.map((genre) => genre.name)}</div>

              <div className="movie-truncate">{truncate(movie.overview)}</div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Movie;
