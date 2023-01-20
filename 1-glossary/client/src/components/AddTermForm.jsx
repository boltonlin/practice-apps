import React, { useState, useEffect } from 'react';

const AddTermForm = ({
  handleSubmit
}) => {

  const [status, setStatus] = useState(false);
  const [word, setWord] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [numDefsToAdd, setNumDefsToAdd] = useState(1);

  const handleDefinitionChange = (e, index) => {
    let copy = [...definitions];
    copy[index] = e.target.value;
    setDefinitions(copy);
  }

  const removeField = (index) => {
    let copy = [...definitions];
    copy.splice(index, 1);
    setDefinitions(copy);
  }

  const makeTermAndSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ word, partOfSpeech, definitions });
    setStatus(false);
  }

  useEffect(() => {
    setWord('');
    setPartOfSpeech('');
    setNumDefsToAdd(1);
    setDefinitions(['']);
  }, [status]);

  useEffect(() => {
    setDefinitions([...definitions, '']);
  }, [numDefsToAdd]);

  return (
    <div className="add-term-container">
      <button onClick={() => setStatus(!status)}>{status ? 'Close' : 'Add Word'}</button>
      {status ?
        <form id="add-term-form" onSubmit={makeTermAndSubmit}>
          <div className="add-term-word">
            <p>Word</p>
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}></input>
          </div>
          <div className="add-term-pos">
            <p>Part of Speech</p>
            <input
              value={partOfSpeech}
              onChange={(e) => setPartOfSpeech(e.target.value)}></input>
          </div>
          {definitions.map((definition, i) => {
            return (
              <div className="add-term-definition" key={i}>
              <p>Definition {numDefsToAdd > 1 ? (i + 1) : ''}</p>
              <input
                index={i}
                value={definitions[i]}
                onChange={(e) => handleDefinitionChange(e, i)}></input>
              <button type="button" onClick={() => removeField(i)}>❌</button>
              </div>
            );
          })}
          <button type="button" onClick={() => setNumDefsToAdd(numDefsToAdd + 1)}>Add a definition</button> <br />
          <button form="add-term-form" onClick={makeTermAndSubmit}>Add this term</button>
        </form>
      : null}
    </div>
  );
}

export default AddTermForm;

// this is how you DON'T do it

// const renderRows = () => {
//   let rows = [];
//   for (let i = 0; i < numDefsToAdd; i++) {
//     rows.push(
//       <div className="add-term-definition" key={i}>
//       <p>Definition {numDefsToAdd > 1 ? (i + 1) : ''}</p>
//       <input
//         value={definitions[i]}
//         index={i}
//         onChange={handleDefinitionChange}></input>
//       </div>
//     );
//   }
//   return rows;
// }
