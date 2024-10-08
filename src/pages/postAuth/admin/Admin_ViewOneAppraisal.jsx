import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api'; // Updated to use the `api` instance
import LoadingPage from '../../LoadingPage';

const Admin_ViewOneAppraisal = () => {
  const { activityid } = useParams();
  const [activity, setActivity] = useState(null);
  const [credits, setCredits] = useState([]);
  const [userDetails, setUserDetails] = useState({}); // To store user details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const userResponse = await api.get(`/users/${userId}`); // Updated to use the `api` instance
      return userResponse.data.User; // Assuming response contains a 'User' object with details like name
    } catch (error) {
      console.error('Error fetching user details:', error);
      return { firstName: 'Unknown', lastName: 'User' }; // Fallback if user data can't be fetched
    }
  };

  // Fetch activity and associated credits
  useEffect(() => {
    const fetchActivityAndCredits = async () => {
      try {
        // Fetch activity data
        const activityResponse = await api.get(`/activity/${activityid}`); // Updated to use the `api` instance
        if (!activityResponse.data.Activity) {
          throw new Error('Activity not found');
        }
        setActivity(activityResponse.data.Activity);

        // Fetch credits data
        const creditsResponse = await api.get(`/credit/activity/${activityid}`); // Updated to use the `api` instance
        const creditsData = creditsResponse.data.credits || [];

        // Fetch user details for each credit in parallel
        const usersMap = {};
        const userDetailsPromises = creditsData.map(async (credit) => {
          if (!usersMap[credit.userId]) {
            const userDetails = await fetchUserDetails(credit.userId);
            usersMap[credit.userId] = `${userDetails.firstName} ${userDetails.lastName}`;
          }
        });

        await Promise.all(userDetailsPromises);

        setUserDetails(usersMap);
        setCredits(creditsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch activity or credits.');
        setLoading(false);
      }
    };

    if (activityid) {
      fetchActivityAndCredits();
    } else {
      setError('Activity ID is missing.');
      setLoading(false);
    }
  }, [activityid]);

  if (loading) return <LoadingPage />;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-blue-100 rounded-lg shadow-lg">
      {/* Back Button */}
      <button
        className="text-blue-600 underline mb-4"
        onClick={() => navigate(-1)} // Go back
      >
        Go Back
      </button>

      {/* Activity Title */}
      {activity && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{activity.title}</h1>
          <p className="text-lg">{activity.description}</p>
        </div>
      )}

      {/* Credits List */}
      <div>
        {credits.length > 0 ? (
          <ul className="space-y-4">
            {credits.map((credit) => (
              <li key={credit._id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg">
                <h2 className="text-xl font-semibold">User: {userDetails[credit.userId]}</h2>
                <p><strong>Total Hours Rendered:</strong> {credit.totalHoursRendered} hours</p>
                <p><strong>Faculty Reflection:</strong> {credit.facultyReflection}</p>
                {credit.supportingDocuments && (
                  <a
                    href={`path_to_documents/${credit.supportingDocuments}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Supporting Documents
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No credits have been submitted for this activity.</p>
        )}
      </div>
    </div>
  );
};

export default Admin_ViewOneAppraisal;