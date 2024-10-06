import { useEffect, useState } from "react";
import api from "../api";
import ActivityTableMap from "./ActivityTableMap";

const ActivityTable = ({ searchInput, filters }) => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    api
      .get("/activity/all")
      .then((response) => {
        const data = response.data;
        if (data.Activities && Array.isArray(data.Activities)) {
          setActivities(data.Activities);
          setFilteredActivities(data.Activities); // Initialize filtered activities
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  useEffect(() => {

    const filtered = activities.filter((activity) => {
      const matchesSearch = `${activity.title} ${activity.description}`
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      const matchesActivityType =
        filters.activityType === "All" || filters.activityType === ""
          ? true
          : activity.type === filters.activityType;

      const matchesDepartment =
        filters.department === "All Departments" || filters.department === ""
          ? true
          : activity.department === filters.department;

      const matchesAccountStatus =
        filters.accountStatus === "Activated"
          ? activity.isActivated
          : !activity.isActivated;

      // Check if adminApproval exists before accessing isApproved
      const matchesApprovalStatus = activity.adminApproval
        ? filters.isApproved
          ? activity.adminApproval.isApproved
          : !activity.adminApproval.isApproved
        : true; // If adminApproval doesn't exist, allow all activities

      return (
        matchesSearch &&
        matchesActivityType &&
        matchesDepartment &&
        matchesAccountStatus &&
        matchesApprovalStatus
      );
    });

    setFilteredActivities(filtered);
  }, [searchInput, filters, activities]);

  return (
    <div className="mt-6 card bg-white max-w max-h shadow-xl">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="select-none">
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Description</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <ActivityTableMap activities={filteredActivities} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
