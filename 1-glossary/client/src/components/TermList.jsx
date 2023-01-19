import React from 'react';
import Term from './Term.jsx';

const TermList = ({
  terms
}) => (
  <ul>
    {terms.map(term => (
      <Term term={term} key={term._id} />
    ))}
  </ul>
);{}

export default TermList;