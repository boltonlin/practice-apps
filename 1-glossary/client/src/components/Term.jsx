import React, { useState, useEffect } from 'react';

const Term = ({
  term,
  handleEdit,
  handleDelete
}) => {

  const [status, setStatus] = useState(false);
  const [changes, setChanges] = useState({
    _id: term._id,
    word: term.word,
    partOfSpeech: term.partOfSpeech,
    definitions: [...term.definitions] /* YOU CANNOT JUST SET THE ARRAY */
  });

  const handleChanges = (e, property, index) => {
    let copy = {...changes};
    if (index !== undefined) {
      copy[property][index] = e.target.value;
    } else {
      copy[property] = e.target.value;
    }
    setChanges(copy);
  }

  const addDefinitionButton = (index) => {
    if (index === changes.definitions.length - 1 || !changes.definitions.length) {
      return (
        <button type="button" onClick={addDefinition}>➕</button>
      )
    }
  }

  const addDefinition = () => {
    let copy = {...changes};
    copy.definitions.push('');
    setChanges(copy);
  }

  const deleteDefinition = (index) => {
    let copy = {...changes};
    copy.definitions.splice(index, 1);
    setChanges(copy);
  }

  const deleteTerm = () => {
    handleDelete(term._id);
  }

  const saveChanges = () => {
    handleEdit(changes);
    setStatus(false);
  }

  const revert = () => {
    setChanges(term);
    setStatus(false);
  }

  return (
    <li>
      <div className="term">
      {status?
        <>
        <input
          type="text" className="word-edit"
          value={changes.word}
          onChange={(e) => handleChanges(e, 'word')}></input>
        <input
          type="text" className="pos-edit"
          value={changes.partOfSpeech}
          onChange={(e) => handleChanges(e, 'partOfSpeech')}></input>
        <div className="definitions">
          {changes.definitions.map((definition, index) => (
            <div className="definition" key={index}>
            <strong>{index + 1}: </strong>
            <input
              type="text" className="definition-edit"
              value={changes.definitions[index]}
              onChange={(e) => handleChanges(e, 'definitions', index)}></input>
            <button type="button" onClick={(e) => deleteDefinition(index)}>❌</button>
            {addDefinitionButton(index)}
            </div>
          ))}
          {addDefinitionButton()}
        </div>
        <div className="control-panel">
          <button type="button" onClick={saveChanges}>💾</button>
          <button type="button" onClick={revert}>🔙</button>
          <button type="button" onClick={deleteTerm}>❌</button>
        </div>
        </>
      :
        <>
        <h2 className="word">{changes.word}</h2>
        <h3 className="parts-of-speech">{changes.partOfSpeech}</h3>
        <div className="definitions">
          {changes.definitions.map((definition, index) => (
            <div className="definition" key={index}>
            <strong>{index + 1}: </strong>
            <span className="definition-text">{definition}</span>
            </div>
          ))}
        </div>
        <div className="control-panel">
          <button type="button" onClick={() => setStatus(true)}>📝</button>
        </div>
        </>}
      </div>
    </li>
  );
}



export default Term;