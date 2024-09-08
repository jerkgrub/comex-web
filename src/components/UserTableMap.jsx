import { useNavigate } from 'react-router-dom';

const UserTableMap = ({ users }) => {
  const navigate = useNavigate();

  const handleViewProfile = (user) => {
    navigate(`/admin/users/${user._id}`); // Navigate to the ViewUserPage
  };

  const handleEditUser = (user) => {
    navigate(`/admin/users/${user._id}/edit`); // Navigate to the EditUserPage
  };

  return (
    <>
      {users.length > 0 ? (
        users.map((user, index) => (
          <tr className="hover:bg-gray-100 cursor-pointer" key={index}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
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
              <button
                className="btn btn-ghost btn-xs text-blue-600"
                onClick={() => handleEditUser(user)}
              >
                Edit
              </button>
            </th>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center">
            No users found.
          </td>
        </tr>
      )}
    </>
  );
};

export default UserTableMap;