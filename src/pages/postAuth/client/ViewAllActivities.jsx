import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default Calendar CSS
import "./CustomCalendar.css"; // Custom CSS for enhanced styling
import { useFetchActivities, formatDate, formatTime } from "../../../components/hooks/useFetchActivities"; // Import custom hook

const ViewAllActivities = () => {
  const [date, setDate] = useState(new Date());
  const { activities, loading, error } = useFetchActivities(); // Use custom hook

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Ensure that activities is defined and an array
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!activities || activities.length === 0) return <p>No activities found.</p>;

  return (
    <div className="flex w-full min-h-[91.3vh] py-9 px-4 flex-col lg:flex-row gap-8 bg-gray-200">
      {/* Left side: List of Upcoming Activities */}
      <div className="w-full lg:w-1/2 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          List of Upcoming Activities
        </h2>

        {/* Mapping through activities */}
        {activities.map((activity) => {
          const { month, day } = formatDate(activity.startDate);
          const formattedTime = formatTime(activity.time); // Format the time

          return (
            <div key={activity._id} className="bg-white mb-6 p-3 border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-row items-center gap-6">
              <div className="w-40 h-auto">
                <div className="w-full aspect-[4/3]">
                  <img
                    src={activity.image || "/path-to-default-image.jpg"}
                    alt={activity.title}
                    className="w-full h-full object-cover rounded-lg border-1 shadow-md"
                  />
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                {/* startDate */}
                <p className="text-2xl font-semibold text-indigo-500">{month}</p>
                <p className="text-5xl font-extrabold text-gray-900">{day}</p>
              </div>
              <div className="flex-grow">
                {/* type */}
                <p className="bg-indigo-200 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold tracking-wide inline-block">
                  {activity.type.toUpperCase()}
                </p>
                {/* time */}
                <p className="text-sm text-gray-600 mt-3 font-medium">
                  {formattedTime} {/* Display formatted time */}
                </p>
                {/* title */}
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {activity.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right side: Calendar */}
      <div className="w-full lg:w-1/2 p-6 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">February 2024</h2>
        <div className="p-4 rounded-lg">
          <Calendar
            onChange={onChange}
            value={date}
            className="clean-calendar"
            showNavigation={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAllActivities;