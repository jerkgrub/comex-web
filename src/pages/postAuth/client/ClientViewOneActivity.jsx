import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api'; // Updated to use the `api` instance
import { formatDate, formatTime } from '../../../components/hooks/useFetchActivities'; // Reuse your existing helper functions
import FetchUserData from '../../../components/hooks/FetchUserData'; // Import user fetch hook
import LoadingPage from '../../LoadingPage';

const ClientViewOneActivity = () => {
  const { activityid } = useParams(); // Fetch the activity ID from the URL
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // State to track if the user is already registered

  const user = FetchUserData(); // Fetch the current user data

  useEffect(() => {
    // Fetch the specific activity details based on activityid
    api
      .get(`/activity/${activityid}`) // Updated to use the `api` instance
      .then((response) => {
        if (response.data && response.data.Activity) {
          setActivity(response.data.Activity);
          
          // Check if the user is already registered for this activity
          if (response.data.Activity.respondents.some((resp) => resp.userId === user._id)) {
            setIsRegistered(true); // If the user is found in the respondents, mark as registered
          }
        } else {
          setError("Activity not found");
        }
      })
      .catch(() => {
        setError("Failed to fetch activity details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activityid, user._id]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activity) {
    return <div>No activity details available.</div>;
  }

  const { month, day } = formatDate(activity.startDate);
  const formattedTime = formatTime(activity.time);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center gap-6">
        {/* Activity Image */}
        <img
          src={activity.image || '/path-to-default-image.jpg'}
          alt={activity.title}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />

        {/* Activity Information */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{activity.title}</h2>
          <p className="text-indigo-600 text-xl mb-2">
            {activity.type.toUpperCase()}
          </p>
          <p className="text-gray-600 mb-1">
            {month} {day}, {formattedTime}
          </p>
          <p className="text-lg text-gray-700 mt-4">{activity.description}</p>
          <p className="text-lg text-gray-700 mt-2">
            Organized by: <span className="font-semibold">{activity.organizer}</span>
          </p>
        </div>

        {/* Register Button */}
        <button
          onClick={() => navigate(`/client/view-activities/${activityid}/register`)}
          className="btn bg-nucolor3 hover:bg-blue-700  px-6 py-2 rounded-lg font-semibold"
          disabled={isRegistered} // Disable if the user is already registered
        >
          {isRegistered ? 'Already Registered' : 'Register for this Activity'}
        </button>
      </div>
    </div>
  );
};

export default ClientViewOneActivity;
