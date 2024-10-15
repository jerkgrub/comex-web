import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS

const ActivityTableMap = ({ activities }) => {
  const navigate = useNavigate();

  if (activities === null) {
    // Activities are still loading; render skeleton placeholders
    return (
      <>
        {Array(5)
          .fill()
          .map((_, index) => (
            <tr key={index}>
              <th>
                <label>
                  {/* Optionally, you can add a skeleton checkbox here */}
                  {/* <Skeleton circle={true} height={20} width={20} /> */}
                </label>
              </th>
              <td>
                <Skeleton width={`80%`} height={20} />
              </td>
              <td>
                <Skeleton width={`90%`} height={20} />
              </td>
              <td>
                <Skeleton width={`70%`} height={20} />
              </td>
              <th>
                <Skeleton width={80} height={30} />
              </th>
            </tr>
          ))}
      </>
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
