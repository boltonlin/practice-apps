import React from 'react';
import Term from './Term.jsx';

const TermList = ({
  terms,
  handleEdit
}) => (
  <ul>
    {terms.map(term => (
      <Term
        term={term}
        key={term._id}
        handleEdit={handleEdit} />
    ))}
  </ul>
);{}

export default TermList;