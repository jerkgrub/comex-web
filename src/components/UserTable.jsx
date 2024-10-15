import { useEffect, useState } from "react";
import api from "../api"; // Updated to use the `api` instance
import UserTableMap from "./UserTableMap";

const UserTable = ({ searchInput, filters }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

  useEffect(() => {
    api
      .get("/users/all") // Using the `api` instance
      .then((response) => {
        const data = response.data;
        if (data.Users && Array.isArray(data.Users)) {
          setUsers(data.Users);
          setFilteredUsers(data.Users); // Initialize filtered users
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    // Filter users based on search input, user type, department, and account status
    const filtered = users.filter((user) => {
      const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const matchesUserType =
        filters.userType === "All Usertypes" || filters.userType === ""
          ? true
          : user.usertype === filters.userType;
      const matchesDepartment =
        filters.department === "All Departments" || filters.department === ""
          ? true
          : user.department === filters.department;
      const matchesAccountStatus =
        filters.accountStatus === "Activated"
          ? user.isActivated
          : !user.isActivated;

      return (
        matchesSearch &&
        matchesUserType &&
        matchesDepartment &&
        matchesAccountStatus
      );
    });
    setFilteredUsers(filtered);
  }, [searchInput, filters, users]);

  return (
    <div className="mt-6 card bg-white max-w max-h ">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="select-none">
            <tr>
              <th>
                <label>
                  {/* <input type="checkbox" className="checkbox" /> */}
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <UserTableMap users={filteredUsers} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
