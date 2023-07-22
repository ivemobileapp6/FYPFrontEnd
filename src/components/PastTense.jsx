import React, { useState } from 'react';

const questions = [
  {
    question: 'Yesterday, he _________ to school on foot.',
    options: ['go', 'went', 'will go'],
    answer: 'went'
  },
  {
    question: 'They _________ at the beach last summer.',
    options: ['swim', 'swam', 'will swim'],
    answer: 'swam'
  },
  {
    question: 'She _________ a letter to her friend.',
    options: ['write', 'wrote', 'will write'],
    answer: 'wrote'
  }
];

function PastTenseExercise
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

export default PastTenseExercise;
