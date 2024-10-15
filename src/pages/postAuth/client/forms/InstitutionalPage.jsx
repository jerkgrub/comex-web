import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS for skeleton
import api from '../../../../api'; // Axios instance

const InstitutionalPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all activities when component loads
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/activity/all'); // Fetching all activities
        console.log('Fetched Activities:', response.data.Activities);
        setActivities(response.data.Activities); // Set activities in state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Filter activities based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter((activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredActivities(filtered);
    }
  }, [searchTerm, activities]);

  // Handle activity click and navigate to the InstitutionalAppraisalPage with activityId
  const handleActivityClick = (activityId) => {
    navigate(`/client/engagement-appraisals-institutional/${activityId}`);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-gradient-to-b from-white to-blue-50 rounded-lg shadow-xl">
      {/* Back button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)} // Navigate back
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Institutional Activities</h1>
      <p className="text-center text-lg text-gray-600 mb-6">Please select an activity to credit:</p>

      {/* Search Box */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search activities..."
          className="w-full p-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-4 right-4 w-6 h-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 6a6 6 0 100 12 6 6 0 000-12zm13 13l-4.35-4.35"
          />
        </svg>
      </div>

      {/* Activity List */}
      {loading ? (
        <ul className="space-y-4">
          {[...Array(3)].map((_, idx) => (
            <li key={idx} className="p-5 bg-white rounded-xl shadow-md">
              <Skeleton height={25} width="60%" />
              <Skeleton height={20} width="40%" />
              <Skeleton height={15} width="30%" />
            </li>
          ))}
        </ul>
      ) : filteredActivities.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No activities found</p>
      ) : (
        <ul className="space-y-4">
          {filteredActivities.map((activity) => (
            <li
              key={activity._id}
              onClick={() => handleActivityClick(activity._id)}
              className="p-5 bg-white rounded-xl shadow-md cursor-pointer hover:bg-blue-50 hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">{activity.title}</h3>
                  <p className="text-gray-600">{activity.organizer}</p>
                  <p className="text-gray-500 text-sm">{activity.startDate} to {activity.endDate}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstitutionalPage;