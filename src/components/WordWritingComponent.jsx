import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WordWritingComponent = () => {
  const [words, setWords] = useState([]);
  const [sentence, setSentence] = useState('');
  
  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get('https://random-word-api.herokuapp.com/word?number=10');
      setWords(response.data);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleChange = (event) => {
    setSentence(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://your-api-endpoint/send-to-tutor', { sentence });
      alert('Sentence sent to the tutor!');
      setSentence('');
    } catch (error) {
      console.error('Error sending sentence to tutor:', error);
    }
  };

  return (
    <div>
      <h1>Words from API</h1>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sentence">Write a sentence:</label>
        <input
          type="text"
          id="sentence"
          name="sentence"
          value={sentence}
          onChange={handleChange}
        />
        <button type="submit">Send to Tutor</button>
      </form>
    </div>
  );
};

export default WordWritingComponent;