import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAddRespondent = ({ activityId }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(''); // For text input
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered user list based on input
  const [showDropdown, setShowDropdown] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all users
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users/all')
      .then((response) => {
        setUsers(response.data.Users);
        setFilteredUsers(response.data.Users); // Initialize filtered users with full list
      })
      .catch((error) => {
        console.error('Error fetching users', error);
        setErrorMessage('Failed to load users');
      });
  }, []);

  // Filter users based on input
  const handleInputChange = (e) => {
    const searchValue = e.target.value;
    setUserId(searchValue);

    if (searchValue.trim() === '') {
      setFilteredUsers(users); // Show all users if input is empty
    } else {
      const filtered = users.filter((user) =>
        `${user.firstName} ${user.lastName} (${user.email})`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  // Function to add the respondent
  const handleAddRespondent = () => {
    if (!userId) {
      setErrorMessage('Please select or enter a valid user');
      return;
    }

    axios
      .post(`http://localhost:8000/api/activity/add/respondent/${activityId}`, {
        userId,
      })
      .then((response) => {
        setSuccessMessage('Respondent added successfully');
        setErrorMessage('');
        setUserId(''); // Clear input after success
        setShowDropdown(false); // Hide dropdown after selection
      })
      .catch((error) => {
        console.error('Error adding respondent', error);
        setErrorMessage('Failed to add respondent');
      });
  };

  // Handle user selection from the dropdown
  const handleUserSelect = (userId) => {
    setUserId(userId);
    setShowDropdown(false); // Close the dropdown after selecting a user
  };

  return (
    <div className="admin-add-respondent">
      <h2 className="text-xl font-bold mb-4">Add Respondent to Activity</h2>

      {/* Text input with dropdown for autocomplete */}
      <div className="relative mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Enter or Select User ID:
        </label>
        <input
          type="text"
          value={userId}
          onChange={handleInputChange}
          onClick={() => setShowDropdown(true)} // Show dropdown when input is clicked
          placeholder="Enter or search for a user"
          className="block w-full border border-gray-300 p-2 rounded"
        />

        {/* Dropdown menu for user suggestions */}
        {showDropdown && filteredUsers.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-60 overflow-auto rounded-lg shadow-lg">
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserSelect(user._id)} // Set the selected userId
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {user.firstName} {user.lastName} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Button to add respondent */}
      <button
        onClick={handleAddRespondent}
        className="btn bg-nucolor3 px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Respondent
      </button>

      {/* Success/Error Messages */}
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default AdminAddRespondent;