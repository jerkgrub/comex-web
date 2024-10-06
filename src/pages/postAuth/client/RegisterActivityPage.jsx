import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../../api'; // Updated to use the `api` instance
import { formConfig } from '../../../components/hooks/formConfig';
import FormPage from '../../../components/forms/FormPage';
import FormNavigation from '../../../components/forms/FormNavigation';
import FetchUserData from '../../../components/hooks/FetchUserData'; // Import the custom hook to fetch user data

const RegisterActivityPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false); // New state to track if user is registered
  const { activityid } = useParams(); // Fetch the activity ID from the URL
  const navigate = useNavigate();
  const user = FetchUserData(); // Fetch the user data using the custom hook

  // Check if the user is already registered when the component mounts
  useEffect(() => {
    if (user && user._id) {
      // Check if the user is already a respondent for the activity
      api
        .get(`/activity/${activityid}`) // Updated to use the `api` instance
        .then((response) => {
          if (response.data && response.data.Activity) {
            const activity = response.data.Activity;
            // Check if userId is already in the respondents list
            const isRegistered = activity.respondents.some((resp) => resp.userId === user._id);
            if (isRegistered) {
              setIsAlreadyRegistered(true);
              alert('You are already registered for this activity.');
              navigate('/client/view-activities'); // Redirect the user
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching activity details:', error);
        });
    }
  }, [user, activityid, navigate]);

  // Handle form changes
  const handleAnswerChange = (questionId, answer) => {
    setFormData({ ...formData, [questionId]: answer });
  };

  // Handle the Next button click
  const handleNext = () => {
    if (currentStep < formConfig.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitForm();
    }
  };

  // Handle the Back button click
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit form and add respondent to the activity
  const submitForm = () => {
    if (!user || !user._id) {
      alert('User not found. Please log in again.');
      return;
    }

    const requestData = {
      userId: user._id, // Get the userId from the user object
      formData, // The form data that can be sent to the backend (if needed)
    };

    // Send POST request to add the user as a respondent
    api
      .post(`/activity/add/respondent/${activityid}`, requestData) // Updated to use the `api` instance
      .then(() => {
        alert('Registration complete! You are now a respondent for this activity.');
        navigate(`/client/view-activities/`);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('Failed to register for the activity. Please try again.');
      });
  };

  if (isAlreadyRegistered) {
    return null; // If already registered, no need to show the form
  }

  return (
    <div className="max-w-3xl mx-auto my-10">
      <button
        onClick={() => navigate('/client/view-activities')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <FormPage
        formStep={formConfig[currentStep]}
        formData={formData}
        handleAnswerChange={handleAnswerChange}
      />
      <FormNavigation
        currentStep={currentStep}
        totalSteps={formConfig.length}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};

export default RegisterActivityPage;
