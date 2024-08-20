import React, { useCallback, useEffect, useState } from 'react';

import { Spin, Alert, Pagination, Tabs } from 'antd';

import GenreContext from './assets/genres/genres';
import Movie from './assets/movie/movie';
import Search from './assets/search/search';

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '3c121458c8c65f0e1c4b0e1cc6b1b94a';

function App() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('return');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [, setGuestSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState({});
  const [currentRatedPage, setCurrentRatedPage] = useState(1);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await fetch(`${URL}genre/movie/list?api_key=${API_KEY}`);
        const json = await res.json();
        setGenres(json.genres);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, []);

  const createGuestSession = async () => {
    try {
      const res = await fetch(`${URL}authentication/guest_session/new?api_key=${API_KEY}`);
      if (!res.ok) {
        const errorText = `Ошибка: ${res.statusText}`;
        setErrorMessage(errorText);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setGuestSessionId(data.guest_session_id);
      localStorage.setItem('guestSessionId', data.guest_session_id);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedSessionId = localStorage.getItem('guestSessionId');
    if (storedSessionId) {
      setGuestSessionId(storedSessionId);
      setLoading(false);
    } else {
      createGuestSession();
    }
  }, []);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('ratedMovies')) || {};
    setRatedMovies(savedRatings);
  }, []);

  const getMovies = async (query = 'return', pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${URL}search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${pageNumber}`
      );
      const json = await res.json();
      setMovies(json.results);
      setAllMovies((prevMovies) => [
        ...prevMovies.filter((movie) => !json.results.some((resMovie) => resMovie.id === movie.id)),
        ...json.results,
      ]);
      setTotalResults(json.total_results);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      if (searchQuery) {
        await getMovies(searchQuery, currentPage);
      }
    };

    fetchInitialMovies();
  }, [searchQuery, currentPage]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      getMovies(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  const updateRatedMovies = (movieId, value) => {
    const newRatedMovies = { ...ratedMovies, [movieId]: value };
    setRatedMovies(newRatedMovies);
    localStorage.setItem('ratedMovies', JSON.stringify(newRatedMovies));
  };

  const handleSwitchPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSwitchRatedPage = (pageNumber) => {
    setCurrentRatedPage(pageNumber);
  };

  const ratedMoviesList = Object.keys(ratedMovies)
    .map((id) => allMovies.find((movie) => movie.id === parseInt(id, 10)))
    .filter((movie) => movie !== undefined);

  const ratedMoviesPerPage = 20;
  const startRatedIndex = (currentRatedPage - 1) * ratedMoviesPerPage;
  const endRatedIndex = startRatedIndex + ratedMoviesPerPage;
  const displayedRatedMovies = ratedMoviesList.slice(startRatedIndex, endRatedIndex);
  const totalRatedResults = ratedMoviesList.length;

  const noResults = !loading && !errorMessage && movies.length === 0 && totalResults === 0;

  if (loading) {
    return (
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
    );
  }

  if (errorMessage) {
    return (
      <Alert
        message="Ошибка загрузки. Обновите страницу"
        type="error"
        size="large"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      />
    );
  }

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <Search onSearch={handleSearch} query={searchQuery} noResults={noResults} />
          <Movie movies={movies} onRate={updateRatedMovies} ratedMovies={ratedMovies} />
          <Pagination
            current={currentPage}
            pageSize={20}
            showSizeChanger={false}
            total={totalResults}
            onChange={handleSwitchPage}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <div>
          <Movie movies={displayedRatedMovies} ratedMovies={ratedMovies} />
          <Pagination
            current={currentRatedPage}
            showSizeChanger={false}
            pageSize={ratedMoviesPerPage}
            total={totalRatedResults}
            onChange={handleSwitchRatedPage}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
          />
        </div>
      ),
    },
  ];

  return (
    <GenreContext.Provider value={genres}>
      <div>
        <Tabs defaultActiveKey="1" centered items={items} />
      </div>
    </GenreContext.Provider>
  );
}

export default App;
