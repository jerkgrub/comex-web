import { useNavigate } from "react-router-dom";
import LoadingPage from "./../pages/LoadingPage";

const ActivityTableMap = ({ activities }) => {
  const navigate = useNavigate();

  if (activities === null) {
    // Activities are still loading
    return (
      <tr>
        <td colSpan="5" className="text-center">
          <LoadingPage />
        </td>
      </tr>
    );
  }

  if (activities.length === 0) {
    // No activities found
    return (
      <tr>
        <td colSpan="5" className="text-center">
          No activities found.
        </td>
      </tr>
    );
  }

  return (
    <>
      {activities.map((activity, index) => (
        <tr
          className="hover:bg-gray-100 cursor-pointer"
          key={activity._id || index}
        >
          <th>
            <label>
              {/* <input type="checkbox" className="checkbox" /> */}
            </label>
          </th>
          <td>{activity.title}</td>
          <td>{activity.description}</td>
          <td>{activity.department}</td>
          <th>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => navigate(`/admin/activities/${activity._id}`)}
            >
              View Activity
            </button>
          </th>
        </tr>
      ))}
    </>
  );
};

export default ActivityTableMap;