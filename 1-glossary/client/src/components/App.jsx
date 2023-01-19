import React, { useState, useEffect } from 'react';
import AddWordForm from './AddWordForm.jsx';
import SearchForm from './SearchForm.jsx';
import TermList from './TermList.jsx';

const App = ({
  soliciter
}) => {

  const [filteredTermList, setFilteredTermList] = useState([]);

  useEffect(() => {
    soliciter.get()
      .then(results => {
        setFilteredTermList(results.data);
      });
  }, []);

  return (
    <div>
      <h1>Glossary</h1>
      <TermList terms={filteredTermList} />
    </div>
  )
}

export default App;