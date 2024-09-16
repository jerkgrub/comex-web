import React from 'react';
import QuestionContainer from './QuestionContainer';

const FormPage = ({ formStep, formData, handleAnswerChange }) => {
  const step = formStep;

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">{step.title}</h2>
      <p className="text-gray-600 mb-6">{step.description}</p>

      {step.questions.map((question) => (
        <QuestionContainer
          key={question.id}
          question={question}
          value={formData[question.id]}
          onChange={handleAnswerChange}
        />
      ))}
    </div>
  );
};

export default FormPage;