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
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Firebase'; 

const SortableItem = SortableElement(({ value }) => <li>{value}</li>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

const SentenceReorder = () => {
  const [items, setItems] = useState([]);
  const [originalSentence, setOriginalSentence] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
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

    fetchReviews();
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

  const handleSubmit = () => {
    const assembledSentence = items.join(' ');

    if (assembledSentence === originalSentence) {
      alert('Correct!');
    } else {
      alert('Incorrect, try again.');
    }
  };

  return (
    <div>
      <SortableList items={items} onSortEnd={onSortEnd} pressDelay={200} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SentenceReorder;