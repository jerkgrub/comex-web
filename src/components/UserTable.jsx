import { useEffect, useState } from "react";
import axios from "axios";
import UserTableMap from "./UserTableMap";
import ViewUserModal from "./modals/ViewUserModal";

const UserTable = ({ searchInput, filters }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/all")
      .then((response) => {
        const data = response.data;
        if (data.Users && Array.isArray(data.Users)) {
          setUsers(data.Users);
          setFilteredUsers(data.Users); // Initialize filtered users
          console.log("Users:", data.Users);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Filters:", filters);
    // Filter users based on search input, user type, and department
    const filtered = users.filter((user) => {
      console.log("User:", user); // Log each user object
      const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const matchesUserType = filters.userType === "All Usertypes" || filters.userType === ""
        ? true
        : user.usertype === filters.userType;
      const matchesDepartment = filters.department === "All Departments" || filters.department === ""
        ? true
        : user.department === filters.department;

      console.log(`Comparing userType: ${user.usertype} with filter: ${filters.userType}`);
      console.log(`Comparing department: ${user.department} with filter: ${filters.department}`);
      console.log(`matchesSearch: ${matchesSearch}, matchesUserType: ${matchesUserType}, matchesDepartment: ${matchesDepartment}`);

      return matchesSearch && matchesUserType && matchesDepartment;
    });
    console.log("Filtered Users:", filtered);
    setFilteredUsers(filtered);
  }, [searchInput, filters, users]);

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
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <UserTableMap users={filteredUsers} onUserClick={setSelectedUser} />
          </tbody>
        </table>
      </div>
      {selectedUser && <ViewUserModal user={selectedUser} />}
    </div>
  );
};

export default UserTable;