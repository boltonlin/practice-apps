import React, { useState, useEffect } from 'react';
import AddTermForm from './AddTermForm.jsx';
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
      setFilteredTermList(filteredTermList.filter(term => {
        if (term.word.includes(searchTerm)) return term;
      }));
    } else fetchAllTerms();
    setSearchTerm('');
  }

  const addWord = (term) => {
    soliciter.save(term)
      .then(fetchAllTerms);
  }

  const editTerm = (term) => {
    soliciter.update(term)
      .then(fetchAllTerms);
  }

  const fetchAllTerms = () => {
    soliciter.get()
      .then(results => setFilteredTermList(results.data));
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
      <AddTermForm
        handleSubmit={addWord} />
      <TermList
        terms={filteredTermList}
        handleEdit={editTerm} />
    </div>
  )
}

export default App;