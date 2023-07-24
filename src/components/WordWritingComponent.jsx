import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../Firebase'; 
import { auth } from '../Firebase'; // import your auth object

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