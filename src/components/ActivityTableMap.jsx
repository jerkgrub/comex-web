import { useNavigate } from "react-router-dom";

const ActivityTableMap = ({ activities }) => {
  const navigate = useNavigate();

  const handleViewActivity = (activity) => {
    navigate(`/admin/activities/${activity._id}`); // Navigate to the ViewActivityPage
  };

  const handleEditActivity = (activity) => {
    navigate(`/admin/activities/${activity._id}/edit`); // Navigate to the EditActivityPage
  };

  return (
    <>
      {activities.length > 0 ? (
        activities.map((activity, index) => (
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
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => handleEditActivity(activity)}
              >
                Edit Activity
              </button>
            </th>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center">
            No activities found.
          </td>
        </tr>
      )}
    </>
  );
};

export default ActivityTableMap;