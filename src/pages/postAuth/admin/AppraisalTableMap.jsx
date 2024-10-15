import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AppraisalTable from './AppraisalTable';

const AppraisalTableMap = ({ users, loading }) => {
  const navigate = useNavigate();

  const handleViewProfile = (user) => {
    navigate(`/admin/users/${user._id}`);
  };

  if (loading) {
    // Render skeleton placeholders when data is loading
    return (
      <>
        {Array(5)
          .fill()
          .map((_, index) => (
            <tr className="hover:bg-gray-100 cursor-pointer" key={index}>
              <th>
                <label>
                  {/* Optional: Skeleton for checkbox or avatar */}
                  <Skeleton circle={true} height={24} width={24} />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <Skeleton circle={true} height={48} width={48} />
                  <div>
                    <Skeleton width={120} height={20} />
                    <Skeleton width={80} height={15} style={{ marginTop: 4 }} />
                  </div>
                </div>
              </td>
              <td>
                <Skeleton width={150} height={20} />
              </td>
              <td>
                <Skeleton width={100} height={20} />
              </td>
              <th>
                <Skeleton width={80} height={30} />
              </th>
            </tr>
          ))}
      </>
    );
  }

  if (users.length === 0) {
    // No users found
    return (
      <tr>
        <td colSpan="5" className="text-center">
          No users found.
        </td>
      </tr>
    );
  }

  // Render actual user data when loading is complete
  return (
    <>
      {users.map((user, index) => (
        <tr className="hover:bg-gray-100 cursor-pointer" key={user._id || index}>
          <th>
            <label>
              {/* Uncomment the checkbox if needed */}
              {/* <input type="checkbox" className="checkbox" /> */}
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar select-none pointer-events-none">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    className="rounded-full"
                    src={user.avatar || "/default-avatar.png"}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm opacity-50">{user.usertype}</div>
              </div>
            </div>
          </td>
          <td>{user.email}</td>
          <td>{user.department}</td>
          <th>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => handleViewProfile(user)}
            >
              View Profile
            </button>
          </th>
        </tr>
      ))}
    </>
  );
};

export default AppraisalTableMap;
