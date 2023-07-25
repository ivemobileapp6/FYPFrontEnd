import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();

function TranscriptText({ docId }) {
  const [transcript, setTranscript] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    const fetchTranscript = async () => {
      const transcriptsCollection = collection(db, "transcripts");
      const transcriptDocs = await getDocs(transcriptsCollection);

      const transcripts = transcriptDocs.docs.map(doc => doc.data());

      const fetchedTranscript = transcripts.find(transcript => transcript.id === docId);

      if (fetchedTranscript) {
        if (fetchedTranscript.transcript) {
          setTranscript(fetchedTranscript.transcript);
        } else {
          console.log("Transcript is undefined");
        }
        if (fetchedTranscript.audioURL) {
          setAudioURL(fetchedTranscript.audioURL);
        } else {
          console.log("Audio URL is undefined");
        }
      } else {
        console.log("Document not found");
      }
    };

    fetchTranscript();
  }, [docId]);

  const checkTranscript = () => {
    setShowTranscript(true);
    if (userInput.trim() === transcript.trim()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }

  return (
    <div>
      {audioURL && <audio src={audioURL} controls />}
      <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button onClick={checkTranscript}>Check</button>
      {showTranscript && (
        <div>
          <p>{transcript}</p>
          <p>{isCorrect ? "Correct!" : "Incorrect, try again."}</p>
        </div>
      )}
    </div>
  );
}

export default TranscriptText;