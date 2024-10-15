import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default Calendar CSS
import "./CustomCalendar.css"; // Custom CSS for enhanced styling
import { useFetchActivities, formatDate, formatTime } from "../../../components/hooks/useFetchActivities"; // Import custom hook
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import LoadingPage from "../../LoadingPage";

const ClientViewAllActivities = () => {
  const [date, setDate] = useState(new Date());
  const { activities, loading, error } = useFetchActivities(); // Use custom hook

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // Lock calendar to current month by setting minDate and maxDate
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentYear, currentDate.getMonth() + 1, 0);

  // Prepare a set of dates that have activities for quick lookup
  const eventDates = useMemo(() => {
    if (!activities) return new Set();
    return new Set(
      activities.map((activity) =>
        new Date(activity.startDate).toDateString()
      )
    );
  }, [activities]);

  // Ensure that activities is defined and an array
  if (loading) return <LoadingPage />;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!activities || activities.length === 0)
    return <p className="text-gray-700">No activities found.</p>;

  return (
    <div className="flex w-full min-h-screen py-9 px-4 flex-col lg:flex-row gap-8 bg-gray-200">
      {/* Left side: List of Upcoming Activities */}
      <div className="w-full lg:w-1/2 p-6 rounded-lg  ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          List of Upcoming Activities
        </h2>

        {/* Mapping through activities */}
        {activities.map((activity) => {
          const { month, day } = formatDate(activity.startDate);
          const formattedTime = formatTime(activity.time); // Format the time

          return (
            <Link
              to={`/client/view-activities/${activity._id}`} // Link to the specific activity page
              key={activity._id}
              className="block bg-white mb-6 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-row items-center gap-6">
                <div className="w-40 h-auto">
                  <div className="w-full aspect-[4/3]">
                    <img
                      src={activity.image || "/path-to-default-image.jpg"}
                      alt={activity.title}
                      className="w-full h-full object-cover rounded-lg border border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
                <div className="text-center flex-shrink-0">
                  {/* startDate */}
                  <p className="text-2xl font-semibold text-indigo-500">
                    {month}
                  </p>
                  <p className="text-5xl font-extrabold text-gray-900">
                    {day}
                  </p>
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
            </Link>
          );
        })}
      </div>

      {/* Right side: Calendar */}
      <div className="w-full lg:w-1/2 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentMonth} {currentYear}
        </h2>
        <div className="p-4 rounded-lg">
          <Calendar
            onChange={onChange}
            value={date}
            className="clean-calendar"
            showNavigation={false}
            minDate={firstDayOfMonth}
            maxDate={lastDayOfMonth}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const dateStr = date.toDateString();
                if (eventDates.has(dateStr)) {
                  return "event-date";
                }
              }
              return null;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientViewAllActivities;
