import React, { useCallback, useEffect, useState } from 'react';

import { Spin, Alert } from 'antd';

import Movie from './assets/movie/movie';
import Search from './assets/search/search';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getMovies = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3c121458c8c65f0e1c4b0e1cc6b1b94a&query=${query}&include_adult=false&language=en-US&page=1`
      );
      const json = await res.json();
      setMovies(json.results);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  useEffect(() => {
    getMovies(searchQuery);
  }, [searchQuery]);

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const noResults = !loading && !errorMessage && filteredMovies.length === 0 && searchQuery.length > 0;

  return (
    <div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        <div>
          <Spin
            size="large"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '40px',
            }}
          />
        </div>
      ) : errorMessage ? (
        <Alert message="Error Text" type="error" />
      ) : (
        <>
          <Search onSearch={handleSearch} query={searchQuery} noResults={noResults} />
          <Movie movies={filteredMovies} />
        </>
      )}
    </div>
  );
}

export default App;
