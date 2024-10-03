import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // To get user info
import FetchUserData from '../../../../components/hooks/FetchUserData';
import { ArrowLeft } from 'lucide-react'; // Arrow icon for back button

const CommunityEngagementForm = () => {
  const { activityid } = useParams(); // Get activityId from the URL
  const navigate = useNavigate(); // For navigation
  const user = FetchUserData(); // Fetch user data
  const [activity, setActivity] = useState(null); // Store activity details
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if the user has submitted before
  const [formData, setFormData] = useState({
    hoursRendered: '',
    supportingDocuments: null, // This field will be ignored for now
    facultyReflection: '',
  });
  const [error, setError] = useState(''); // Error handling

  // Fetch the activity details and check if the user has already submitted the form
  useEffect(() => {
    // Fetch the activity details based on activityId
    axios.get(`https://comex-server.vercel.app/api/activity/${activityid}`)
      .then((response) => {
        setActivity(response.data.Activity);

        // Check if the user has already submitted a form for this activity
        if (user && user._id) {
          axios.get(`https://comex-server.vercel.app/api/credit/activity/${activityid}`)
            .then((creditResponse) => {
              const userHasSubmitted = creditResponse.data.credits.some(
                (credit) => credit.userId === user._id
              );
              if (userHasSubmitted) {
                setHasSubmitted(true); // User has already submitted
              }
            })
            .catch((error) => {
              console.error('Error checking credit submission:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching activity:', error);
        setError('Failed to fetch activity details.');
      });
  }, [activityid, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      setError('User not found. Please ensure you are logged in.');
      return;
    }

    // Create credit data without file upload for now
    const creditData = {
      userId: user._id, // Add userId from the fetched user
      activityId: activityid, // Add the activityId
      totalHoursRendered: formData.hoursRendered,
      facultyReflection: formData.facultyReflection,
    };

    // Send POST request to create the new credit
    axios.post('https://comex-server.vercel.app/api/credit/new', creditData)
      .then(() => {
        // Navigate to the "Form Submitted" page after successful submission
        navigate('/client/form-submitted');
      })
      .catch((error) => {
        console.error('Error submitting credit:', error);
        setError('Failed to submit credit.');
      });
  };

  if (!activity) return <div>Loading activity details...</div>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-blue-100 rounded-lg shadow-lg relative">
      
      {/* Back Button */}
      <button
        className="absolute top-0 left-0 mt-4 ml-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      <h2 className="text-3xl font-bold mb-4 text-center">Activity Documentation</h2>
      <p className="mb-8 text-lg text-center">
        Upon accomplishing this section, the Community Extension Office will be able to document your community engagement and participation.
      </p>

      {error && <div className="text-red-600 mb-4">{error}</div>} {/* Display error if exists */}

      <form onSubmit={handleSubmit}>
        
        {/* Title (Pre-filled) */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Title of Community Engagement</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={activity.title} // Pre-fill title
            readOnly
          />
        </div>

        {/* Voluntary Service (Pre-filled) */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Is this Community Engagement voluntary and unpaid?</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={activity.isVoluntaryAndUnpaid ? 'Yes' : 'No'} // Pre-fill voluntary service status
            readOnly
          />
        </div>

        {/* Dates (Pre-filled) */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Start Date</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={activity.startDate} // Pre-fill start date
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">End Date</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={activity.endDate} // Pre-fill end date
            readOnly
          />
        </div>

        {/* Hours Rendered */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Total Hours Rendered</label>
          <input
            name="hoursRendered"
            type="text"
            className="w-full p-2 border rounded-lg"
            value={formData.hoursRendered}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Supporting Documents (Disabled for now) */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Supporting Documents (disabled)</label>
          <input
            disabled
            type="file"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Faculty Reflection */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Faculty Reflection</label>
          <textarea
            name="facultyReflection"
            className="w-full p-2 border rounded-lg"
            value={formData.facultyReflection}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn hover:bg-blue-700 text-black px-6 py-2 rounded-lg font-semibold"
          disabled={hasSubmitted} // Disable if the user has already submitted
        >
          {hasSubmitted ? 'You Have Already Submitted' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CommunityEngagementForm;