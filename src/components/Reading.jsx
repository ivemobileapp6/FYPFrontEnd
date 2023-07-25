import React, { useState } from 'react';
import axios from 'axios';

const Reading = () => {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [definitions, setDefinitions] = useState([]);

  const handleExtraction = async () => {
    try {
      const response = await axios.post(
        'https://api.edenai.run/v2/text/keyword_extraction',
        {
          providers: 'ibm',
          text: text,
          language: 'en',
        },
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmUzMjIwNjAtYzZhNy00YThkLTgwMWEtYjFiYmVhNmI5MzA3IiwidHlwZSI6ImFwaV90b2tlbiJ9.OU-gaK1PvHflethqdlEq-k4pyj3deWoFLcxzkbzi0OM',
          },
        }
      );
      setKeywords(response.data.ibm.items);
      setDefinitions([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleWordDoubleClick = async (word) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setDefinitions(response.data[0]?.meanings || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Keyword Extraction</h2>
      <div style={{ marginBottom: '20px' }}>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text"
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontFamily: 'inherit',
          }}
        />
      </div>
      <button onClick={handleExtraction}>Extract Keywords</button>
      {keywords.length > 0 && (
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          <h3>Keywords:</h3>
          <p>
            {text.split(' ').map((word, index) => {
              const isKeyword = keywords.some(
                (item) => item.keyword.toLowerCase() === word.toLowerCase()
              );
              return (
                <span
                  key={index}
                  style={{
                    backgroundColor: isKeyword ? 'yellow' : 'transparent',
                  }}
                  onDoubleClick={() => handleWordDoubleClick(word)}
                >
                  {word}{' '}
                </span>
              );
            })}
          </p>
        </div>
      )}
      {definitions.length > 0 && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>Definitions:</h3>
          {definitions.map((meaning, index) => (
            <div key={index}>
              <p>
                <strong>{meaning.partOfSpeech}:</strong>
              </p>
              <ul>
                {meaning.definitions.map((definition, idx) => (
                  <li key={idx}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reading;