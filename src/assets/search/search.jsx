import React, { useState, useEffect, useCallback, useRef } from 'react';

import './search.css';
import { Alert, Input } from 'antd';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

function Search({ onSearch, query = 'return', noResults = false }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      const trimUserRequest = value.replace(/ +/g, ' ').trim();
      onSearch(trimUserRequest);
    }, 500),
    [onSearch]
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <div className="search-container">
      <Input
        className="input-search"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
        ref={inputRef}
      />
      {noResults && <Alert message="По Вашему запросу ничего не найдено" type="info" className="nothing-found" />}
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  noResults: PropTypes.bool.isRequired,
};

export default Search;
