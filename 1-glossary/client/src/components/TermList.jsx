import React from 'react';
import Term from './Term.jsx';

const TermList = ({
  terms,
  handleEdit,
  handleDelete
}) => (
  <ul>
    {terms.map(term => (
      <Term
        term={term}
        key={term._id}
        handleEdit={handleEdit}
        handleDelete={handleDelete} />
    ))}
  </ul>
);{}

export default TermList;