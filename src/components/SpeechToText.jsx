// SpeechToText.js
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { firestore } from '../Firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
// import './SpeechToText.module.css';

const SpeechToText = () => {
  const [sentences, setSentences] = useState([]);
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const [userSentence, setUserSentence] = useState('');
  const [savedSentence, setSavedSentence] = useState('');

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  useEffect(() => {
    if (textToCopy) {
      setCopied(true);
    }
  }, [textToCopy]);

  useEffect(() => {
    const fetchSentences = async () => {
      const sentencesCollection = collection(firestore, 'sentences');
      const sentencesQuery = query(sentencesCollection, orderBy('text'));
      const unsubscribe = onSnapshot(sentencesQuery, (querySnapshot) => {
        const fetchedSentences = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
        }));
        setSentences(fetchedSentences);
      });

      return () => {
        unsubscribe();
      };
    };

    fetchSentences();
  }, []);

  const handleCopyClick = () => {
    setTextToCopy(transcript);
  };

  const handleUserSentenceChange = (e) => {
    setUserSentence(e.target.value);
  };

  const handleSaveSentence = async () => {
    const isSaved = await saveSentenceToDatabase(userSentence);
    if (isSaved) {
      setSavedSentence(userSentence);
      setUserSentence('');
    }
  };

  return (
    <div className="speech-to-text">
      <h2>Speech to Text Converter</h2>


      <div className="input-section">
        <label htmlFor="userSentence">Enter a sentence:</label>
        <input
          type="text"
          id="userSentence"
          value={userSentence}
          onChange={handleUserSentenceChange}
          placeholder="Type your sentence here"
        />
        <button onClick={handleSaveSentence} className="save-btn">Save Sentence</button>
        <p>Saved Sentence: {savedSentence}</p>
      </div>

      <div className="main-content">{transcript}</div>

      <div className="btn-section">
        <button onClick={handleCopyClick} className="btn">{isCopied ? 'Copied!' : 'Copy to clipboard'}</button>
        <button onClick={startListening} className="btn">Start Listening</button>
        <button onClick={SpeechRecognition.stopListening} className="btn">Stop Listening</button>
      </div>

      <div className="sentences-list">
        <h3>All sentences in the database:</h3>
        <ul>
          {sentences.map((sentence) => (
            <li key={sentence.id}>{sentence.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpeechToText;

async function saveSentenceToDatabase(sentence) {
  try {
    const sentencesCollection = collection(firestore, 'sentences');
    await addDoc(sentencesCollection, { text: sentence });
    console.log(`Saved sentence: ${sentence}`);
    return true;
  } catch (error) {
    console.error(`Error saving sentence: ${error}`);
    return false;
  }
}