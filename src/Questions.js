import React, { useState } from 'react';

const Questions = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleInfo = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const UpArrow = () => <span style={{ color: 'white' }}>&#9650;</span>;
  const DownArrow = () => <span style={{ color: 'white' }}>&#9660;</span>;

  return (
    <div className="mb-3">
      {questions.map((question, index) => (
        <div key={index}>
          <div className="d-flex align-items-center justify-content-between">
            <h3>{question.question}</h3>
            <button
              className="btn btn-primary"
              onClick={() => toggleInfo(index)}
            >
              {openIndex === index ? <UpArrow /> : <DownArrow />}
            </button>
          </div>
          {openIndex === index && (
            <div className="border border-primary p-3 mt-3">
              <p>{question.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Questions;
