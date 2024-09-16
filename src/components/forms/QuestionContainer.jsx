import React from 'react';

const QuestionContainer = ({ question, onChange, value }) => {
  return (
    <div className="mb-4">
      <p className="text-lg font-medium mb-2">{question.questionText}</p>
      {question.type === 'radio' && (
        <div>
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center mb-2">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={value === option}
                onChange={() => onChange(question.id, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;