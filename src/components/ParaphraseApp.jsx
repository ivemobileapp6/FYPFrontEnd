import React, { useState } from 'react';

const ParaphraseApp = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleParaphrase = async () => {
    const paraphrasedText = await paraphraseText(inputText);
    setOutputText(paraphrasedText);
  };

  return (
    <div className="ParaphraseApp">
      <h2>Paraphrasing Tool</h2>
      <div className="input-section">
        <h3>Enter Text:</h3>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text to paraphrase"
          rows="6"
          cols="50"
        />
      </div>
      <button onClick={handleParaphrase}>Paraphrase</button>
      <div className="output-section">
        <h3>Paraphrased Text:</h3>
        <textarea
          value={outputText}
          readOnly
          placeholder="Paraphrased text will appear here"
          rows="6"
          cols="50"
        />
      </div>
    </div>
  );
};

export default ParaphraseApp;

async function paraphraseText(text) {
  const myHeaders = new Headers();
  myHeaders.append("apikey", "RiMZf9yjNPwtfLylQQ9AH7G7CypPROK3");

  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders,
    body: text,
  };

  try {
    const response = await fetch("https://api.apilayer.com/paraphraser", requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error('error', error);
    return 'An error occurred while paraphrasing the text.';
  }
}