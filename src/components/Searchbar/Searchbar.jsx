import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../../styles.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = useCallback(event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (searchQuery.trim() === '') {
        alert('Enter something');
        return;
      }

      onSubmit(searchQuery);
    },
    [searchQuery, onSubmit]
  );

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
          value={searchQuery}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
