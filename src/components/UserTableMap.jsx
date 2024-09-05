const UserTableMap = ({ users }) => {
  return (
    <>
      {users.length > 0 ? (
        users.map((user, index) => (
          <tr className="hover" key={index}>
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
              <button className="btn btn-ghost btn-xs">Edit Profile</button>
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
