import React, { useEffect, useState } from 'react';

import { Spin, Alert } from 'antd';

import Movie from './assets/movie/movie';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const getMovies = () => {
    fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=3c121458c8c65f0e1c4b0e1cc6b1b94a&query=return&include_adult=false&language=en-US&page=1'
    )
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        <div>
          <Spin size="large" />
        </div>
      ) : errorMessage ? (
        <Alert message="Error Text" type="error" />
      ) : (
        <Movie movies={movies} />
      )}
    </div>
  );
}

export default App;
