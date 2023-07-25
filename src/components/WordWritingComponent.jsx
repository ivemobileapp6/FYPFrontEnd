import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../Firebase'; 
import { auth } from '../Firebase'; // import your auth object

const WordWritingComponent = () => {
  const [words, setWords] = useState([]);
  const [sentence, setSentence] = useState('');
  const [wordSettings, setWordSettings] = useState({
    count: 20,
    length: null,
    letter: '',
  });

  useEffect(() => {
    fetchWords();
  }, [wordSettings]);

const fetchWords = async () => {
  const { count, length, letter } = wordSettings;
  let apiUrl = `https://random-word-api.vercel.app/api?words=${count}`;
  if (length) {
    apiUrl += `&length=${length}`;
  }
  if (letter) {
    apiUrl += `&letter=${letter}`;
  }
  try {
    const response = await axios.get(apiUrl);
    setWords(response.data);
  } catch (error) {
    console.error('Error fetching words:', error);
  }
};

  const handleChange = (event) => {
    setSentence(event.target.value);
  };

  const handleWordSettingsChange = (event) => {
    setWordSettings({ ...wordSettings, [event.target.name]: event.target.value });
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  const sentenceWords = sentence.toLowerCase().split(' ');
  

  const someWordsUsed = sentenceWords.some(word => words.includes(word));

  if (!someWordsUsed) {
    alert('Please use at least one word from the list.');
    return;
  }

  try {
    // Save the sentence in Firestore
    await addDoc(collection(firestore, 'reviews'), {
      content: sentence,
      createdAt: serverTimestamp(),
      userId: auth.currentUser.uid, // get the user ID from the auth object
      username: auth.currentUser.displayName // get the user's display name from the auth object
    });
    alert('Sentence submitted successfully as a review!');
    setSentence('');
  } catch (error) {
    console.error('Error saving as a review:', error);
  }
};

  return (
    <div>
      <h1>Words from API</h1>
      <div>
        <label htmlFor="wordCount">Word Count:</label>
        <input
          type="number"
          id="wordCount"
          name="count"
          value={wordSettings.count}
          onChange={handleWordSettingsChange}
        />
        <label htmlFor="wordLength">Word Length:</label>
        <input
          type="number"
          id="wordLength"
          name="length"
          value={wordSettings.length}
          onChange={handleWordSettingsChange}
        />
        <label htmlFor="wordLetter">Starting Letter:</label>
        <input
          type="text"
          id="wordLetter"
          name="letter"
          value={wordSettings.letter}
          onChange={handleWordSettingsChange}
        />
        <button onClick={fetchWords}>Update Words</button>
      </div>
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
        <button type="submit">Submit as Review</button>
      </form>
    </div>
  );
};

export default WordWritingComponent;