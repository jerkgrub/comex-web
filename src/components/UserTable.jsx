import { useEffect, useState } from "react";
import axios from "axios";
import UserTableMap from "./UserTableMap";

const UserTable = ({ searchInput }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

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
    // Filter users based on search input (first name, last name, or email)
    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchInput, users]);

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
            {/* Pass the filtered users to UserTableMap */}
            <UserTableMap users={filteredUsers} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;