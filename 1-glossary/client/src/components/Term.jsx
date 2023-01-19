import React from 'react';

const Term = ({
  term
}) => (
  <li>
    <h2 className="word">{term.word}</h2>
    <h3 className="parts-of-speech">{term.partOfSpeech}</h3>
    <div className="definitions">
      {term.definitions.map((definition, index) => (
        <div className="definition" key={index}>
        <strong>{index + 1}: </strong>
        <span className="definition-text">{definition}</span>
        </div>
      ))}
    </div>
  </li>
);

export default Term;