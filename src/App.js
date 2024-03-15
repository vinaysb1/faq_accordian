import React, { useState, useEffect } from 'react';
import Questions from './Questions';

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:2000/questions');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAddQuestion = async () => {
    try {
      const response = await fetch('http://localhost:2000/addquestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add question');
      }
      // After successfully adding the question, fetch the updated list of questions
      await fetchQuestions();
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Accordion of FAQ's</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Pass questions as a prop, not question */}
          <Questions questions={questions} />
          <div className="mt-3">
            <h3>Add New Question:</h3>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Question"
            />
            <input
              type="text"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Answer"
            />
            <button className="btn btn-primary ml-2" onClick={handleAddQuestion}>
              Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
