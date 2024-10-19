import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../../../api'; // Import your Axios instance
import useFetchUserData from './../../../../components/hooks/useFetchUserData'; // Import your custom hook
import FormNavigation from '../../../../components/forms/FormNavigation';
import { ClipLoader } from 'react-spinners'; // Import a spinner component

const EngagementAppraisalPage = () => {
  const { title } = useParams(); // Get the title from URL parameters (this will be used as the type)
  const { user, loading } = useFetchUserData(); // Fetch user data including userId
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading
  const [formData, setFormData] = useState({
    title: '', // Matches backend field
    isVoluntary: '', // Matches backend field
    beneficiaries: '', // Matches backend field
    startDate: '', // Matches backend field
    endDate: '', // Matches backend field
    totalHoursRendered: '', // Matches backend field
    supportingDocuments: null, // Matches backend field
    facultyReflection: '' // Matches backend field
  });
  const [errors, setErrors] = useState({}); // New state for form errors
  const navigate = useNavigate();

  const formConfig = [
    {
      id: 1,
      title: `Activity Documentation (${title})`,
      description:
        'Upon accomplishing this section, the Community Extension Office will be able to document your community engagement and participation for Academic Year 2024-2025.',
      questions: []
    },
    {
      id: 2,
      title: 'Community Engagement Appraisal',
      description: '',
      questions: [
        {
          id: 'q1',
          questionText: 'Title of Community Engagement',
          type: 'text',
          value: formData.title,
          handleChange: e => handleAnswerChange('title', e.target.value)
        },
        {
          id: 'q2',
          questionText: 'Is this Community Engagement voluntary and an unpaid service?',
          type: 'radio',
          options: ['Yes', 'No'],
          value: formData.isVoluntary,
          handleChange: e => handleAnswerChange('isVoluntary', e.target.value)
        },
        {
          id: 'q3',
          questionText: 'Who are the beneficiaries of this Community Engagement?',
          type: 'text',
          value: formData.beneficiaries,
          handleChange: e => handleAnswerChange('beneficiaries', e.target.value)
        },
        {
          id: 'q4',
          questionText: 'Start date of Community Engagement',
          type: 'date',
          value: formData.startDate,
          handleChange: e => handleAnswerChange('startDate', e.target.value)
        },
        {
          id: 'q5',
          questionText: 'End date of Community Engagement',
          type: 'date',
          value: formData.endDate,
          handleChange: e => handleAnswerChange('endDate', e.target.value)
        },
        {
          id: 'q6',
          questionText: 'Total number of hours rendered for this Community Engagement',
          type: 'text',
          value: formData.totalHoursRendered,
          handleChange: e => handleAnswerChange('totalHoursRendered', e.target.value)
        },
        {
          id: 'q7',
          questionText: 'Supporting Documents (Non-anonymous Question)',
          type: 'file',
          description:
            'Please attach any document from this community engagement that will serve as a proof of your participation (any of these: attendance sheet, certificates, photo evidence/screenshot of the event, meeting, extension activity, meeting highlights, post-activity report).',
          handleChange: e => handleAnswerChange('supportingDocuments', e.target.files[0])
        },
        {
          id: 'q8',
          questionText: 'Faculty Reflection',
          type: 'text',
          description: 'Please share your reflection and personal realization.',
          value: formData.facultyReflection,
          handleChange: e => handleAnswerChange('facultyReflection', e.target.value)
        }
      ]
    }
  ];

  const handleAnswerChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Clear the error for the field when the user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    if (formData.startDate > today) {
      newErrors.startDate = 'Start date cannot be in the future.';
    }

    if (formData.endDate > today) {
      newErrors.endDate = 'End date cannot be in the future.';
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date cannot be earlier than start date.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep < formConfig.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (loading) {
      alert('User data is still loading. Please wait.');
      return;
    }

    if (!validateForm()) {
      // If validation fails, prevent submission
      return;
    }

    setIsSubmitting(true); // Start loading

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('isRegisteredEvent', 'false');
    formDataToSubmit.append('type', title); // Use title as the type
    formDataToSubmit.append('userId', user._id); // Use userId fetched from useFetchUserData
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('isVoluntary', formData.isVoluntary === 'Yes');
    formDataToSubmit.append('beneficiaries', formData.beneficiaries);
    formDataToSubmit.append('startDate', formData.startDate);
    formDataToSubmit.append('endDate', formData.endDate);
    formDataToSubmit.append('totalHoursRendered', formData.totalHoursRendered);
    formDataToSubmit.append('facultyReflection', formData.facultyReflection);
    if (formData.supportingDocuments) {
      formDataToSubmit.append('supportingDocument', formData.supportingDocuments);
    }

    try {
      const response = await api.post('/credit/new', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        alert('Credit form submitted successfully!');
        navigate('/client/engagement-appraisals');
      }
    } catch (error) {
      console.error('Failed to submit the credit form', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className='h-max min-h-[calc(100vh_-_80px)] py-12 flex justify-center items-center'>
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => navigate('/client/engagement-appraisals')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          disabled={isSubmitting} // Disable back button during submission
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-3xl font-bold mb-4 text-center">{formConfig[currentStep].title}</h2>
        <p className="mb-8 text-lg text-center">{formConfig[currentStep].description}</p>
        <form>
          {formConfig[currentStep].questions.map(question => (
            <div key={question.id} className="mb-4">
              <label className="block text-lg font-bold mb-2">{question.questionText}</label>
              {question.type === 'text' && (
                <input
                  type="text"
                  value={question.value}
                  onChange={question.handleChange}
                  className={`w-full p-2 border rounded-lg ${errors[question.id] ? 'border-red-500' : 'border-gray-300'}`}
                />
              )}
              {question.type === 'radio' &&
                question.options.map(option => (
                  <div key={option} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={formData.isVoluntary === option}
                        onChange={question.handleChange}
                        className="form-radio"
                        disabled={isSubmitting} // Disable inputs during submission
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              {question.type === 'date' && (
                <>
                  <input
                    type="date"
                    value={question.value}
                    onChange={question.handleChange}
                    className={`w-full p-2 border rounded-lg ${errors[question.id] ? 'border-red-500' : 'border-gray-300'}`}
                    max={new Date().toISOString().split('T')[0]} // Prevent selecting future dates
                  />
                  {errors[question.id] && (
                    <p className="text-sm text-red-500 mt-1">{errors[question.id]}</p>
                  )}
                </>
              )}
              {question.type === 'file' && (
                <input
                  type="file"
                  onChange={question.handleChange}
                  className="w-full p-2 border rounded-lg"
                  disabled={isSubmitting} // Disable file input during submission
                />
              )}
              {question.description && (
                <p className="text-sm text-gray-600 mt-1">{question.description}</p>
              )}
              {/* Display error for text inputs if any */}
              {question.type === 'text' && errors[question.id] && (
                <p className="text-sm text-red-500 mt-1">{errors[question.id]}</p>
              )}
            </div>
          ))}
        </form>
        <FormNavigation
          currentStep={currentStep}
          totalSteps={formConfig.length}
          onNext={handleNext}
          onBack={handleBack}
          isSubmitting={isSubmitting} // Pass submission state to navigation if needed
        />
        {/* Modify FormNavigation component to handle isSubmitting if necessary */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ClipLoader size={20} color="#ffffff" className="mr-2" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EngagementAppraisalPage;