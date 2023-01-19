import React, { useState } from 'react';

const SearchForm = ({
  text,
  handleSubmit,
  handleChange
}) => (
  <div className="search">
    <h3>Search</h3>
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        value={text}
        onChange={(e) => handleChange(e.target.value)}>
      </input>
    </form>
  </div>
);

export default SearchForm;