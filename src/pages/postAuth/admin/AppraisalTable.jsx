import { useEffect, useState } from "react";
import api from "../../../api";

const AppraisalTable = ({ searchInput, filters }) => {
  const [users, setUsers] = useState(null); // Initialize users as null
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [loading, setLoading] = useState(true); // Add a loading state

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
          setUsers([]); // Set users to an empty array on error
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]); // Set users to an empty array on error
      })
      .finally(() => {
        setLoading(false); // Set loading to false when API call completes
      });
  }, []);

  useEffect(() => {
    if (users === null) {
      // Users are still loading; do not update filteredUsers
      return;
    }
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
                  {/* Uncomment the checkbox if needed */}
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
            {/* <UserTableMap users={filteredUsers} loading={loading} /> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppraisalTable;
