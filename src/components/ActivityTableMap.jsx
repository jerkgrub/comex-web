import { useNavigate } from "react-router-dom";
import LoadingPage from "./../pages/LoadingPage";

const ActivityTableMap = ({ activities }) => {
  const navigate = useNavigate();

  // Check if activities are being loaded or if they're empty
  console.log("Rendering ActivityTableMap with activities:", activities);

  const handleViewActivity = (activity) => {
    console.log("Navigating to view activity:", activity);
    navigate(`/admin/activities/${activity._id}`);
  };

  if (!activities || activities.length === 0) {
    console.log("Activities are still loading or empty.");
    return (
      <tr>
        <td colSpan="5" className="text-center">
          <LoadingPage />
        </td>
      </tr>
    );
  }

  return (
    <>
      {activities.map((activity, index) => {
        console.log("Mapping activity:", activity);
        return (
          <tr className="hover:bg-gray-100 cursor-pointer" key={index}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>{activity.title}</td>
            <td>{activity.description}</td>
            <td>{activity.department}</td>
            <th>
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => handleViewActivity(activity)}
              >
                View Activity
              </button>
            </th>
          </tr>
        );
      })}
    </>
  );
};

export default ActivityTableMap;