import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

function Movie() {
  const [movie, setMovie] = useState(null);

  const getMovie = () => {
    fetch('https://api.themoviedb.org/3/movie/550?api_key=3c121458c8c65f0e1c4b0e1cc6b1b94a')
      .then((res) => res.json())
      .then((json) => setMovie(json)) // Устанавливаем объект фильма
      .catch((error) => console.error('Error fetching the movie data:', error));
  };

  useEffect(() => {
    getMovie();
  }, []);

  const renderCount = 6;

  console.log(movie);

  return (
    <div>
      {movie &&
        Array.from({ length: renderCount }).map(() => (
          <div key={Date.now() + Math.random()}>
            <img
              style={{ width: '183px', height: '281px', marginLeft: '10px', marginTop: '10px' }}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="title">{movie.original_title}</div>

            <div className="">{`${format(new Date(movie.release_date), 'MMMM dd, yyyy', { locale: enGB })}`}</div>
          </div>
        ))}
    </div>
  );
}

export default Movie;
