// import React, { useCallback, useEffect, useState } from 'react';
//
// import { Spin, Alert, Pagination } from 'antd';
// import TabPane from 'antd/es/tabs/TabPane';
// import { Tabs } from 'react-tabs';
//
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
//   const guestSession = async () => {
//     try {
//       const res = await fetch(`${URL}authentication/guest_session/new?api_key=${API_KEY}`);
//       const json = await res.json();
//       setGuestSessionId(json.guest_session_id);
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };
//
//   const getRatedMovies = async (pageNumber) => {
//     try {
//       const res = await fetch(
//         `${URL}guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}language=en-US$page=${pageNumber}`
//       );
//       const json = await res.json();
//       setRatedMovies(json.results);
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
//     setLoading(true);
//     getMovies(searchQuery, currentPage);
//   }, [searchQuery, currentPage]);
//
//   useEffect(() => {
//     guestSession();
//   }, []);
//
//   useEffect(() => {
//     if (guestSessionId) {
//       getRatedMovies();
//     }
//   }, [getRatedMovies, guestSessionId]);
//
//   const handleSwitchPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//
//   const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
//   const noResults = !loading && !errorMessage && filteredMovies.length === 0 && searchQuery.length > 0;
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
//   return (
//     <div>
//       <Tabs>
//         <TabPane tab="Search" key="1">
//           <Search onSearch={handleSearch} query={searchQuery} noResults={noResults} />
//           <Movie movies={movies} />
//           <Pagination
//             current={currentPage}
//             total={totalResults}
//             onChange={handleSwitchPage}
//             // pageSize={20}
//             style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}
//           />
//         </TabPane>
//         <TabPane tab="Rated" key="2">
//           <Movie movies={ratedMovies} />
//         </TabPane>
//       </Tabs>
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
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [guestSessionId, setGuestSessionId] = useState(null);

  const getMovies = async (query = 'return', pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${URL}search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${pageNumber}`
      );
      const json = await res.json();
      setMovies(json.results);
      setTotalResults(json.total_results);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getRatedMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&language=en-US`);
      const json = await res.json();
      setRatedMovies(json.results || []);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const guestSession = async () => {
    try {
      const res = await fetch(`${URL}authentication/guest_session/new?api_key=${API_KEY}`);
      const json = await res.json();
      if (json.success) {
        setGuestSessionId(json.guest_session_id);
      } else {
        throw new Error('Failed to create guest session');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    guestSession();
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      getMovies(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (guestSessionId) {
      getRatedMovies();
    }
  }, [guestSessionId]);

  const handleSwitchPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const noResults = !loading && !errorMessage && filteredMovies.length === 0 && searchQuery.length > 0;

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
          <Movie movies={movies || []} />
          <Pagination
            current={currentPage}
            total={totalResults}
            onChange={handleSwitchPage}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: <Movie movies={ratedMovies || []} />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
}

export default App;
