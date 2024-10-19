import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api'; // Updated to use the `api` instance
import { formatDate, formatTime } from '../../../components/hooks/useFetchActivities'; // Reuse your existing helper functions
import FetchUserData from '../../../components/hooks/FetchUserData'; // Import user fetch hook
import Skeleton from 'react-loading-skeleton'; // Import Skeleton for loading effect
import 'react-loading-skeleton/dist/skeleton.css'; // Skeleton CSS
import { ArrowLeft } from 'lucide-react';

const ClientViewOneActivity = () => {
  const { activityid } = useParams(); // Fetch the activity ID from the URL
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // State to track if the user is already registered
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false); // State to track if registration is closed

  const user = FetchUserData(); // Fetch the current user data

  useEffect(() => {
    // Fetch the specific activity details based on activityid
    api
      .get(`/activity/${activityid}`) // Updated to use the `api` instance
      .then((response) => {
        if (response.data && response.data.Activity) {
          const activityData = response.data.Activity;
          setActivity(activityData);
          
          // Check if the user is already registered for this activity
          if (activityData.respondents.some((resp) => resp.userId === user._id)) {
            setIsRegistered(true); // If the user is found in the respondents, mark as registered
          }

          // Check if the registrationEnd date has passed
          const today = new Date();
          const registrationEndDate = new Date(activityData.registrationEnd);
          if (registrationEndDate < today) {
            setIsRegistrationClosed(true); // If registration end date has passed, mark registration as closed
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
    return (
      <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
        {/* Skeleton for loading state */}
        <Skeleton height={250} className="mb-4" />
        <Skeleton height={40} className="mb-4" />
        <Skeleton height={40} className="mb-4" />
        <Skeleton height={150} className="mb-4" />
        <Skeleton height={50} width={200} />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activity) {
    return <Skeleton height={500} />;
  }

  // Destructure month and day from the formatted date
  const { month: startMonth, day: startDay } = formatDate(activity.startDate);
  const { month: endMonth, day: endDay } = formatDate(activity.endDate);
  const formattedTime = formatTime(activity.time);

  const formattedRegistrationStart = `${formatDate(activity.registrationStart).month} ${formatDate(activity.registrationStart).day}`;
  const formattedRegistrationEnd = `${formatDate(activity.registrationEnd).month} ${formatDate(activity.registrationEnd).day}`;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <button
        onClick={() => navigate("/client/view-activities")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="flex flex-col items-center gap-6">
        {/* Activity Image */}
        <img
          src={activity.image || '/path-to-default-image.jpg'}
          alt={activity.title}
          className="w-full max-h-72 object-cover rounded-lg shadow-md mb-4"
        />

        {/* Activity Information */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{activity.title}</h2>
          
          {/* Type Badge */}
          <p className="bg-blue-100 text-blue-600 inline-block px-4 py-1 rounded-full font-semibold text-sm mb-2">
            {activity.type.toUpperCase()}
          </p>

          {/* Date and Time Information */}
          <div className="text-gray-600 text-lg">
            <p className="mb-1">
              Event Date: <span className="font-semibold">{startMonth} {startDay}</span> to <span className="font-semibold">{endMonth} {endDay}</span>
            </p>
            <p>
              Time: <span className="font-semibold">{formattedTime}</span>
            </p>
          </div>

          {/* Organizer and Description */}
          <p className="text-lg text-gray-700 mt-4">{activity.description}</p>
          <p className="text-lg text-gray-700 mt-4">Hours: {activity.hours}</p>
          <p className="text-lg text-gray-700 mt-2">
            Organized by: <span className="font-semibold">{activity.organizer}</span>
          </p>

          {/* Registration Period */}
          <p className="text-sm text-gray-500 mt-4">
            Registration Period: <span className="font-semibold">{formattedRegistrationStart}</span> - <span className="font-semibold">{formattedRegistrationEnd}</span>
          </p>
        </div>

        {/* Register Button */}
        <button 
          onClick={() => navigate(`/client/view-activities/${activityid}/register`)}
          className={`btn bg-nucolor3 text-black px-6 py-2 rounded-lg font-semibold ${isRegistered || isRegistrationClosed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-70'}`}
          disabled={isRegistered || isRegistrationClosed} // Disable if registered or if registration is closed
        >
          {isRegistered
            ? 'Already Registered'
            : isRegistrationClosed
            ? 'Registration Closed'
            : 'Register for this Activity'}
        </button>
      </div>
    </div>
  );
};

export default ClientViewOneActivity;
