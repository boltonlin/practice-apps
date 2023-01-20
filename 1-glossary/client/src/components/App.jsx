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
    return soliciter.save(term)
      .then(fetchAllTerms);
  }

  const editTerm = (term) => {
    return soliciter.update(term)
      .then((results) => {
        console.log(results);
        return fetchAllTerms();
      });
  }

  const deleteTerm = (_id) => {
    return soliciter.removeTerm(_id)
      .then(fetchAllTerms);
  }

  const fetchAllTerms = () => {
    return soliciter.get()
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
        handleEdit={editTerm}
        handleDelete={deleteTerm} />
    </div>
  )
}

export default App;