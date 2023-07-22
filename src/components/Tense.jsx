// import React, { useState } from 'react';

// const questions = [
//   {
//     question: 'He always _________ to school on foot.',
//     options: ['go', 'goes', 'going'],
//     answer: 'goes'
//   },
//   {
//     question: 'I _________ coffee every morning.',
//     options: ['drinks', 'drink', 'drinking'],
//     answer: 'drink'
//   },
//   // Add the rest of your questions here
// ];

// function PresentTenseExercise() {
//   const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(''));

//   const handleAnswerChange = (questionIndex, selectedOption) => {
//     setSelectedAnswers(prev => {
//       const newAnswers = [...prev];
//       newAnswers[questionIndex] = selectedOption;
//       return newAnswers;
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const correctAnswers = questions.map(q => q.answer);
//     const isCorrect = selectedAnswers.every((answer, index) => answer === correctAnswers[index]);

//     alert(isCorrect ? 'All answers are correct!' : 'Some answers are incorrect. Try again.');
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         {questions.map((question, index) => (
//           <div key={index}>
//             <p>{question.question}</p>
//             {question.options.map((option, i) => (
//               <label key={i}>
//                 <input 
//                   type="radio" 
//                   value={option} 
//                   checked={selectedAnswers[index] === option}
//                   onChange={() => handleAnswerChange(index, option)}
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         ))}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default PresentTenseExercise;

import React, { useState } from 'react';

const questions = [
  {
    question: 'He always _________ to school on foot.',
    options: ['go', 'goes', 'going'],
    answer: 'goes'
  },
  {
    question: 'I _________ coffee every morning.',
    options: ['drinks', 'drink', 'drinking'],
    answer: 'drink'
  },
  {
    question: 'The dog _________ the ball.',
    options: ['chase', 'chases', 'chasing'],
    answer: 'chases'
  },
  {
    question: 'They _________ in a big city.',
    options: ['live', 'lives', 'living'],
    answer: 'live'
  },
  {
    question: 'She _________ beautiful dresses.',
    options: ['makes', 'make', 'making'],
    answer: 'makes'
  },
  {
    question: 'We _________ the game every Friday.',
    options: ['plays', 'play', 'playing'],
    answer: 'play'
  }
];

function PresentTenseExercise
  () {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = selectedOption;
      return newAnswers;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            {question.options.map((option, i) => (
              <label key={i}>
                <input 
                  type="radio" 
                  value={option} 
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                {option}
              </label>
            ))}
            {submitted && selectedAnswers[index] !== question.answer && (
              <p style={{ color: 'red' }}>
                Incorrect. The correct answer is: {question.answer}
              </p>
            )}
            {submitted && selectedAnswers[index] === question.answer && (
              <p style={{ color: 'green' }}>Correct!</p>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PresentTenseExercise;
