// import React, { useCallback, useEffect, useState } from 'react';
//
// import { Spin, Alert, Pagination, Tabs } from 'antd';
// import Movie from './assets/movie/movie';
// import Search from './assets/search/search';
//
// const URL = 'https://api.themoviedb.org/3/';
// const API_KEY = '3c121458c8c65f0e1c4b0e1cc6b1b94a';
//
// function App() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [guestSessionId, setGuestSessionId] = useState(null);
//   const [ratedMovies, setRatedMovies] = useState([]);
//
//   useEffect(() => {
//     const createGuestSession = async () => {
//       try {
//         const res = await fetch(`${URL}authentication/guest_session/new?api_key=${API_KEY}`);
//
//         if (!res.ok) {
//           throw new Error(`Ошибка: ${res.statusText}`);
//         }
//
//         const data = await res.json();
//         setGuestSessionId(data.guest_session_id);
//         localStorage.setItem('guestSessionId', data.guest_session_id);
//       } catch (error) {
//         setErrorMessage(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const storedSessionId = localStorage.getItem('guestSessionId');
//     if (storedSessionId) {
//       setGuestSessionId(storedSessionId);
//       setLoading(false); // Сразу убираем загрузку, так как guestSessionId уже есть
//     } else {
//       createGuestSession();
//     }
//   }, []);
//
//   const getMovies = async (query = 'return', pageNumber = 1) => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${URL}search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${pageNumber}`
//       );
//       const json = await res.json();
//       setMovies(json.results);
//       setTotalResults(json.total_results);
//     } catch (error) {
//       setErrorMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleSearch = useCallback((query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   }, []);
//
//   useEffect(() => {
//     if (searchQuery !== '') {
//       getMovies(searchQuery, currentPage);
//     }
//   }, [searchQuery, currentPage]);
//
//   const updateRatedMovies = (newRatedMovies) => {
//     const ratedMoviesList = movies.filter((movie) => newRatedMovies[movie.id] != null);
//
//     setRatedMovies((prevRatedMovies) => {
//       const ratedMovieIds = new Set(prevRatedMovies.map((movie) => movie.id));
//       const newMovies = ratedMoviesList.filter((movie) => !ratedMovieIds.has(movie.id));
//       return [...prevRatedMovies, ...newMovies];
//     });
//   };
//
//   useEffect(() => {
//     const savedRatings = JSON.parse(localStorage.getItem('ratedMovies')) || {};
//
//     const ratedMoviesList = movies.filter((movie) => savedRatings[movie.id] != null);
//     setRatedMovies(ratedMoviesList);
//   }, [movies]);
//
//   const handleSwitchPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//
//   const noResults = !loading && !errorMessage && movies.length === 0 && totalResults > 0;
//
//   if (loading) {
//     return (
//       <div>
//         <Spin
//           size="large"
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginTop: '40px',
//           }}
//         />
//       </div>
//     );
//   }
//
//   if (errorMessage) {
//     return (
//       <Alert
//         message="Ошибка загрузки. Обновите страницу"
//         type="error"
//         size="large"
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginTop: '40px',
//         }}
//       />
//     );
//   }
//
//   const items = [
//     {
//       key: '1',
//       label: 'Search',
//       children: (
//         <>
//           <Search onSearch={handleSearch} query={searchQuery} noResults={noResults} />
//           <Movie movies={movies} onRate={updateRatedMovies} />
//           <Pagination
//             current={currentPage}
//             pageSize={20}
//             total={totalResults}
//             onChange={handleSwitchPage}
//             style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
//           />
//         </>
//       ),
//     },
//     {
//       key: '2',
//       label: 'Rated',
//       children: <Movie movies={ratedMovies} />,
//     },
//   ];
//
//   return (
//     <div>
//       <Tabs defaultActiveKey="1" centered items={items} />
//     </div>
//   );
// }
//
// export default App;

// import React, { useCallback, useEffect, useState } from 'react';
// import { Spin, Alert, Pagination, Tabs } from 'antd';
// import Movie from './assets/movie/movie';
// import Search from './assets/search/search';
//
// const URL = 'https://api.themoviedb.org/3/';
// const API_KEY = '3c121458c8c65f0e1c4b0e1cc6b1b94a';
//
// function App() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [guestSessionId, setGuestSessionId] = useState(null);
//   const [ratedMovies, setRatedMovies] = useState({});
//
//   useEffect(() => {
//     const createGuestSession = async () => {
//       try {
//         const res = await fetch(`${URL}authentication/guest_session/new?api_key=${API_KEY}`);
//         if (!res.ok) {
//           throw new Error(`Ошибка: ${res.statusText}`);
//         }
//         const data = await res.json();
//         setGuestSessionId(data.guest_session_id);
//         localStorage.setItem('guestSessionId', data.guest_session_id);
//       } catch (error) {
//         setErrorMessage(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     const storedSessionId = localStorage.getItem('guestSessionId');
//     if (storedSessionId) {
//       setGuestSessionId(storedSessionId);
//       setLoading(false);
//     } else {
//       createGuestSession();
//     }
//   }, []);
//
//   useEffect(() => {
//     const savedRatings = JSON.parse(localStorage.getItem('ratedMovies')) || {};
//     setRatedMovies(savedRatings);
//   }, []);
//
//   const getMovies = async (query = 'return', pageNumber = 1) => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${URL}search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${pageNumber}`
//       );
//       const json = await res.json();
//       setMovies(json.results);
//       setTotalResults(json.total_results);
//     } catch (error) {
//       setErrorMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const handleSearch = useCallback((query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   }, []);
//
//   useEffect(() => {
//     if (searchQuery !== '') {
//       getMovies(searchQuery, currentPage);
//     }
//   }, [searchQuery, currentPage]);
//
//   const updateRatedMovies = (movieId, value) => {
//     const newRatedMovies = { ...ratedMovies, [movieId]: value };
//     setRatedMovies(newRatedMovies);
//     localStorage.setItem('ratedMovies', JSON.stringify(newRatedMovies));
//   };
//
//   useEffect(() => {
//     const savedRatings = JSON.parse(localStorage.getItem('ratedMovies')) || {};
//     setRatedMovies(savedRatings);
//   }, [movies]);
//
//   const handleSwitchPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//
//   const noResults = !loading && !errorMessage && movies.length === 0 && totalResults > 0;
//
//   if (loading) {
//     return (
//       <div>
//         <Spin
//           size="large"
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginTop: '40px',
//           }}
//         />
//       </div>
//     );
//   }
//
//   if (errorMessage) {
//     return (
//       <Alert
//         message="Ошибка загрузки. Обновите страницу"
//         type="error"
//         size="large"
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginTop: '40px',
//         }}
//       />
//     );
//   }
//
//   const ratedMoviesList = Object.keys(ratedMovies)
//     .map((id) => movies.find((movie) => movie.id === parseInt(id)))
//     .filter((movie) => movie !== undefined);
//
//   const items = [
//     {
//       key: '1',
//       label: 'Search',
//       children: (
//         <>
//           <Search onSearch={handleSearch} query={searchQuery} noResults={noResults} />
//           <Movie movies={movies} onRate={updateRatedMovies} ratedMovies={ratedMovies} />
//           <Pagination
//             current={currentPage}
//             pageSize={20}
//             total={totalResults}
//             onChange={handleSwitchPage}
//             style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
//           />
//         </>
//       ),
//     },
//     {
//       key: '2',
//       label: 'Rated',
//       children: <Movie movies={ratedMoviesList} ratedMovies={ratedMovies} />,
//     },
//   ];
//
//   return (
//     <div>
//       <Tabs defaultActiveKey="1" centered items={items} />
//     </div>
//   );
// }
//
// export default App;

import React, { useCallback, useEffect, useState } from 'react';
import { Spin, Alert, Pagination, Tabs } from 'antd';
import Movie from './assets/movie/movie';
import Search from './assets/search/search';

const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '3c121458c8c65f0e1c4b0e1cc6b1b94a';

function App() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [guestSessionId, setGuestSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState({});

  useEffect(() => {
    const createGuestSession = async () => {
      try {
        const res = await fetch(`${URL}authentication/guest_session/new?api_key=${API_KEY}`);
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.statusText}`);
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

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('ratedMovies')) || {};
    setRatedMovies(savedRatings);
  }, [movies]);

  const handleSwitchPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const noResults = !loading && !errorMessage && movies.length === 0 && totalResults > 0;

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

  const ratedMoviesList = Object.keys(ratedMovies)
    .map((id) => allMovies.find((movie) => movie.id === parseInt(id)))
    .filter((movie) => movie !== undefined);

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
      children: <Movie movies={ratedMoviesList} ratedMovies={ratedMovies} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
}

export default App;
