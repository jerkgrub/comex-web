import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default Calendar CSS
import "./CustomCalendar.css"; // Custom CSS for enhanced styling
import { useFetchActivities, formatDate, formatTime } from "../../../components/hooks/useFetchActivities"; // Import custom hook
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Skeleton from "react-loading-skeleton"; // Import skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS

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

  // Display skeletons while loading
  if (loading) {
    return (
      <div className="flex w-full min-h-screen py-9 px-4 flex-col lg:flex-row gap-8 bg-gray-200">
        {/* Left side: Loading Skeletons for List of Activities */}
        <div className="w-full lg:w-1/2 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            <Skeleton width={200} />
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              <Skeleton width={180} />
            </h3>
            {/* Skeleton for upcoming activities */}
            <Skeleton height={100} count={3} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              <Skeleton width={180} />
            </h3>
            {/* Skeleton for accomplished activities */}
            <Skeleton height={100} count={3} />
          </div>
        </div>

        {/* Right side: Loading Skeleton for Calendar */}
        <div className="w-full lg:w-1/2 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            <Skeleton width={150} />
          </h2>
          <div className="p-4 rounded-lg">
            <Skeleton height={400} />
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!activities || activities.length === 0)
    return <p className="text-gray-700">No activities found.</p>;

  // Filter upcoming and accomplished activities based on endDate
  const upcomingActivities = activities.filter(activity => new Date(activity.endDate) >= currentDate);
  const accomplishedActivities = activities.filter(activity => new Date(activity.endDate) < currentDate);

  // Helper function to format end dates
  const formatEndDate = (dateString) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString("default", options);
  };

  return (
    <div className="flex w-full min-h-screen py-9 px-4 flex-col lg:flex-row gap-8 bg-gray-200">
      {/* Left side: List of Activities */}
      <div className="w-full lg:w-1/2 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Activities
        </h2>

        {/* Upcoming Activities */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Activities</h3>
          {upcomingActivities.length > 0 ? (
            upcomingActivities.map((activity) => {
              const { month, day } = formatDate(activity.startDate);
              const formattedEndDate = formatEndDate(activity.endDate); // Format end date

              return (
                <Link
                  to={`/client/view-activities/${activity._id}`} // Link to the specific activity page
                  key={activity._id}
                  className="block bg-white mb-4 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
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
                      {/* Start date */}
                      <p className="text-2xl font-semibold text-indigo-500">
                        {month}
                      </p>
                      <p className="text-5xl font-extrabold text-gray-900">
                        {day}
                      </p>
                    </div>
                    <div className="flex-grow">
                      {/* Type */}
                      <p className="bg-indigo-200 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold tracking-wide inline-block">
                        {activity.type.toUpperCase()}
                      </p>
                      {/* Time */}
                      <p className="text-sm text-gray-600 mt-3 font-medium">
                        {formatTime(activity.time)} {/* Display formatted time */}
                      </p>
                      {/* Title */}
                      <p className="text-lg font-bold text-gray-800 mt-1">
                        {activity.title}
                      </p>
                      {/* Registration Start and End */}
                      <p className="text-sm text-gray-500 mt-1">
                        Registration: {formatEndDate(activity.registrationStart)} - {formatEndDate(activity.registrationEnd)}
                      </p>
                      {/* Hours */}
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.hours} hours
                      </p>
                      {/* End date */}
                      <p className="text-sm text-gray-500 mt-1">
                        End Date: {formattedEndDate}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500">None as of yet.</p>
          )}
        </div>

        {/* Accomplished Activities */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Accomplished Activities</h3>
          {accomplishedActivities.length > 0 ? (
            accomplishedActivities.map((activity) => {
              const { month, day } = formatDate(activity.startDate);
              const formattedEndDate = formatEndDate(activity.endDate); // Format end date

              return (
                <div
                  key={activity._id}
                  className="block bg-white mb-4 p-3 border border-gray-200 rounded-lg shadow-sm"
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
                      {/* Start date */}
                      <p className="text-2xl font-semibold text-indigo-500">
                        {month}
                      </p>
                      <p className="text-5xl font-extrabold text-gray-900">
                        {day}
                      </p>
                    </div>
                    <div className="flex-grow">
                      {/* Type */}
                      <p className="bg-indigo-200 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold tracking-wide inline-block">
                        {activity.type.toUpperCase()}
                      </p>
                      {/* Time */}
                      <p className="text-sm text-gray-600 mt-3 font-medium">
                        {formatTime(activity.time)} {/* Display formatted time */}
                      </p>
                      {/* Title */}
                      <p className="text-lg font-bold text-gray-800 mt-1">
                        {activity.title}
                      </p>
                      {/* Registration Start and End */}
                      <p className="text-sm text-gray-500 mt-1">
                        Registration: {formatEndDate(activity.registrationStart)} - {formatEndDate(activity.registrationEnd)}
                      </p>
                      {/* Hours */}
                      <p className="text-sm text-gray-500 mt-1">
                        Hours: {activity.hours} hours
                      </p>
                      {/* End date */}
                      <p className="text-sm text-gray-500 mt-1">
                        End Date: {formattedEndDate}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">None as of yet.</p>
          )}
        </div>
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
