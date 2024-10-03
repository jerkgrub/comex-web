
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormSubmitted = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">Form Submitted!</h1>
        <p className="text-lg mb-6">Your community engagement credit form has been successfully submitted.</p>
        
        {/* Button to go back to engagement appraisals */}
        <button
          onClick={() => navigate('/client/engagement-appraisals')}
          className="btn bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
        >
          Back to Engagement Appraisals
        </button>
      </div>
    </div>
  );
};

export default FormSubmitted;