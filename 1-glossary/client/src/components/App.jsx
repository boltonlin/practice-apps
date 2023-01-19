import React, { useState, useEffect } from 'react';
import AddWordForm from './AddWordForm.jsx';
import SearchForm from './SearchForm.jsx';
import TermList from './TermList.jsx';

const App = ({
  soliciter
}) => {

  const [filteredTermList, setFilteredTermList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const search = (event) => {
    event.preventDefault();
    if (searchTerm.length) {
      setFilteredTermList(filteredTermList.filter((term) => {
        if (term.word.includes(searchTerm)) return term;
      }));
    } else fetchAllTerms();
    setSearchTerm('');
  }

  const fetchAllTerms = () => {
    soliciter.get()
      .then(results => {
        setFilteredTermList(results.data);
      });
  }

  useEffect(() => {
    fetchAllTerms();
  }, []);

  return (
    <div>
      <h1>Glossary</h1>
      <SearchForm
        text={searchTerm}
        handleSubmit={search}
        handleChange={setSearchTerm} />
      <TermList terms={filteredTermList} />
    </div>
  )
}

export default App;