// import React, { useState } from 'react';
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// import { arrayMoveImmutable } from 'array-move';

// const SortableItem = SortableElement(({ value, deleteItem }) => (
//   <div>
//     <li>{value}</li>
//     <button onClick={deleteItem}>Delete</button>
//   </div>
// ));

// const SortableList = SortableContainer(({ items, deleteItem }) => {
//   return (
//     <ul>
//       {items.map((value, index) => (
//         <SortableItem key={`item-${index}`} index={index} value={value} deleteItem={() => deleteItem(index)} />
//       ))}
//     </ul>
//   );
// });

// const SentenceReorder = ({ initialSentence = '' }) => {
//   const initialWords = initialSentence.split(' ');
//   const [items, setItems] = useState([...initialWords]);
//   const [newWord, setNewWord] = useState('');
//   const [isStudentMode, setIsStudentMode] = useState(false);
//   const [correctOrder, setCorrectOrder] = useState([...initialWords]);

//   const onSortEnd = ({ oldIndex, newIndex }) => {
//     setItems(arrayMoveImmutable(items, oldIndex, newIndex));
//   };

//   const addWord = () => {
//     setItems([...items, newWord]);
//     setCorrectOrder([...items, newWord]);
//     setNewWord('');
//   };

//   const deleteItem = (index) => {
//     const newItems = [...items];
//     newItems.splice(index, 1);
//     setItems(newItems);
//     setCorrectOrder(newItems);
//   };

//   const handleSubmit = () => {
//     if (JSON.stringify(items) === JSON.stringify(correctOrder)) {
//       alert('Correct!');
//     } else {
//       alert('Incorrect, try again.');
//     }
//   };

//   const switchMode = () => {
//     setIsStudentMode(!isStudentMode);
//     setItems([...correctOrder]);
//   };

//   return (
//     <div>
//       {!isStudentMode && (
//         <div>
//           <input type="text" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
//           <button onClick={addWord}>Add Word</button>
//           <button onClick={switchMode}>Switch to Student Mode</button>
//         </div>
//       )}
//       {isStudentMode && <button onClick={switchMode}>Switch to Teacher Mode</button>}
//       <SortableList items={items} onSortEnd={onSortEnd} deleteItem={deleteItem} />
//       {isStudentMode && <button onClick={handleSubmit}>Submit</button>}
//     </div>
//   );
// };

// export default SentenceReorder;

// import React, { useState, useEffect } from 'react';
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
// import { arrayMoveImmutable } from 'array-move';
// import { collection, getDocs } from 'firebase/firestore';
// import { firestore } from '../Firebase'; // import your Firebase configuration

// const SortableItem = SortableElement(({ value, deleteItem }) => (
//   <div>
//     <li>{value}</li>
//     <button onClick={deleteItem}>Delete</button>
//   </div>
// ));

// const SortableList = SortableContainer(({ items, deleteItem }) => {
//   return (
//     <ul>
//       {items.map((value, index) => (
//         <SortableItem key={`item-${index}`} index={index} value={value} deleteItem={() => deleteItem(index)} />
//       ))}
//     </ul>
//   );
// });

// const SentenceReorder = () => {
//   const [items, setItems] = useState([]);
//   const [correctOrder, setCorrectOrder] = useState([]);
//   const [isStudentMode, setIsStudentMode] = useState(false);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       const reviewsCollection = collection(firestore, 'reviews');
//       const reviewDocs = await getDocs(reviewsCollection);
//       const reviews = reviewDocs.docs.map(doc => doc.data());

//       // Get the first review and split its content into sentences
//       const sentences = reviews[0].content.split('.').filter(sentence => sentence.trim() !== '');
//       setItems(sentences);
//       setCorrectOrder(sentences);
//     };

//     fetchReviews();
//   }, []);

//   const onSortEnd = ({ oldIndex, newIndex }) => {
//     setItems(arrayMoveImmutable(items, oldIndex, newIndex));
//   };

//   const deleteItem = (index) => {
//     const newItems = [...items];
//     newItems.splice(index, 1);
//     setItems(newItems);
//     setCorrectOrder(newItems);
//   };

//   const handleSubmit = () => {
//     if (JSON.stringify(items) === JSON.stringify(correctOrder)) {
//       alert('Correct!');
//     } else {
//       alert('Incorrect, try again.');
//     }
//   };

//   const switchMode = () => {
//     setIsStudentMode(!isStudentMode);
//     setItems([...correctOrder]);
//   };

//   return (
//     <div>
//       {isStudentMode && <button onClick={switchMode}>Switch to Teacher Mode</button>}
//       {!isStudentMode && <button onClick={switchMode}>Switch to Student Mode</button>}
//       <SortableList items={items} onSortEnd={onSortEnd} deleteItem={deleteItem} />
//       {isStudentMode && <button onClick={handleSubmit}>Submit</button>}
//     </div>
//   );
// };

// export default SentenceReorder;
import React, { useState, useEffect } from 'react';
import { List, Button, Alert, Typography } from 'antd';
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Import addDoc
import { firestore } from '../Firebase';
import { auth } from '../Firebase'; 

const { Title } = Typography;
const SentenceReorder = () => {
  const [items, setItems] = useState([]);
  const [originalSentence, setOriginalSentence] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    const reviewsCollection = collection(firestore, 'reviews');
    const reviewDocs = await getDocs(reviewsCollection);
    const reviews = reviewDocs.docs.map(doc => doc.data());

    // Get all sentences from the reviews
    const sentences = reviews.flatMap(review => review.content.replace(/(<([^>]+)>)/gi, '').split('.').filter(sentence => sentence.trim() !== ''));
    
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    const words = randomSentence.split(" ");
    const shuffledWords = words.sort(() => Math.random() - 0.5);

    setItems(shuffledWords);
    setOriginalSentence(randomSentence);
  };

  const handleClick = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
  };

  const handleSubmit = () => {
    const assembledSentence = items.join(' ');

    if (assembledSentence === originalSentence) {
      setCorrect(correct + 1);
      alert('Correct!');
      setItems([]);
    } else {
      alert('Incorrect, try again.');
    }
    setAttempts(attempts + 1);
  };

  const handleNextQuestion = () => {
    fetchQuestion();
  };

  
const handleFinish = async () => {
  // Extract the username from the auth object
  const username = auth.currentUser ? auth.currentUser.displayName : "Anonymous";

  const result = {
    correct,
    attempts,
    username // Include the username in the result object
  };

  const resultsCollection = collection(firestore, 'results');
  try {
    await addDoc(resultsCollection, result);
    alert(`Quiz finished. You got ${correct} out of ${attempts} correct. Results have been uploaded to Firebase.`);
  } catch (e) {
    console.error("Error uploading document: ", e);
  }
};
  return (
    <div>
      <Title level={2}>Sentence Reorder</Title>
      <List
        bordered
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item onClick={() => handleClick(index)}>
            {item}
          </List.Item>
        )}
      />
      <Button type="primary" onClick={handleSubmit} style={{ margin: '10px 0' }}>Submit</Button>
      {attempts > 0 && attempts < 5 && <Button onClick={handleNextQuestion}>Next Question</Button>}
      {attempts >= 5 && <Button type="danger" onClick={handleFinish}>Finish</Button>}
      {correct > 0 && <Alert message={`You have ${correct} correct answers out of ${attempts} attempts.`} type="success" showIcon />}
    </div>
  );
};

export default SentenceReorder;