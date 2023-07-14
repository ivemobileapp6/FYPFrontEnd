import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';
import { collection, addDoc, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';
import BadWords from 'bad-words';

const EnglishTutor = () => {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [currentDefinition, setCurrentDefinition] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const wordsRef = collection(firestore, 'words');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(wordsRef, orderBy('word')), (snapshot) => {
      setWords(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addWord = async (e) => {
    e.preventDefault();

    const wordExists = words.some(entry => entry.word.toLowerCase() === word.toLowerCase());
    if (wordExists) {
       alert("This word already exists.");
       return;
  }

  await addDoc(wordsRef, { word, definition });
  setWord('');
  setDefinition('');
};

  const startPractice = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentDefinition(randomWord.definition);
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    const correctWord = words.find((entry) => entry.definition.toLowerCase() === currentDefinition.toLowerCase());
    if (userAnswer.toLowerCase() === correctWord.word.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect. The correct answer is: ${correctWord.word}`);
    }
  };


  return (
    <Container>
      <h2>English Tutor</h2>
      <Row>
        <Col>
          <h3>Add Word</h3>
          <Form onSubmit={addWord}>
            <Form.Group>
              <Form.Label>Word</Form.Label>
              <Form.Control
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Definition</Form.Label>
              <Form.Control
                type="text"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Word
            </Button>
          </Form>
          <h3>Words List</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Word</th>
                <th>Definition</th>
              </tr>
            </thead>
            <tbody>
              {words.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.word}</td>
                  <td>{entry.definition}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <h3>Practice</h3>
          <Button onClick={startPractice} disabled={words.length === 0}>
            Start Practice
          </Button>
          {currentDefinition && (
            <>
              <Card className="mt-3">
                <Card.Body>
                  <Card.Title>What is the word with the following definition?</Card.Title>
                  <p>{currentDefinition}</p>
                  <Form onSubmit={checkAnswer}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Check Answer
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              {feedback && (
                <div className="mt-3">
                  <h4>Feedback</h4>
                  <p>{feedback}</p>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EnglishTutor;