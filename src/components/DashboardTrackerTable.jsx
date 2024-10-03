import React from "react";
import ButtonGeneric from "./inputs/ButtonGeneric";
import { ArrowDownToLine } from "lucide-react";
import { useFetchActivities, formatDate, formatTime } from "../components/hooks/useFetchActivities"; // Assuming the hook is stored in this path
import LoadingPage from "../pages/LoadingPage";

const DashboardTrackerTable = () => {
  // Use the custom hook to fetch activities
  const { activities, loading, error } = useFetchActivities();

  if (loading) return <LoadingPage/>;
  if (error) return <p>Error loading activities: {error}</p>;
  if (!activities || activities.length === 0) return <p>No activities found</p>;

  const totalUsers = 1800; // Example value, replace with the actual total number of users in the system

  return (
    <div className="bg-white rounded-lg overflow-x-auto w-full p-6 shadow-lg">
      <div className="flex flex-row justify-between items-center mb-4 border-b p-3">
        <p className="font-bold text-xl">ENGAGEMENT TRACKER</p>
        <ButtonGeneric
          icon={ArrowDownToLine}
          label={"Generate Report"}
          className="text-white p-2 rounded-md bg-[#485ce2]"
        />
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Title of Activity</th>
            <th>Activity Type</th>
            <th>Registered Users</th>
            <th>Hours</th>
            <th>Progress</th>
            <th>Engagement Rate</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through activities */}
          {activities.map((activity, index) => {
            const { startDate, endDate, title, type, respondents, hours } = activity;

            // Format start and end dates
            const { month: startMonth, day: startDay } = formatDate(startDate);
            const { month: endMonth, day: endDay } = formatDate(endDate);

            // Determine progress status
            const today = new Date();
            const activityStartDate = new Date(startDate);
            const activityEndDate = new Date(endDate);

            let progress = "";
            if (today < activityStartDate) {
              progress = "Upcoming";
            } else if (today >= activityStartDate && today <= activityEndDate) {
              progress = "In Progress";
            } else {
              progress = "Completed";
            }

            // Calculate engagement rate
            const engagementRate = ((respondents.length / totalUsers) * 100).toFixed(2);

            return (
              <tr key={activity._id}>
                {/* index number */}
                <th>{index + 1}</th>

                {/* startDate - endDate */}
                <td>
                  {startMonth} {startDay}, {new Date(startDate).getFullYear()} - {endMonth} {endDay}, {new Date(endDate).getFullYear()}
                </td>

                {/* title */}
                <td>{title}</td>

                {/* type */}
                <td>{type}</td>

                {/* total number of respondents */}
                <td>{respondents.length}</td>

                {/* hours */}
                <td>{hours}</td>

                {/* progress */}
                <td>{progress}</td>

                {/* engagement rate */}
                <td>{engagementRate}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTrackerTable;