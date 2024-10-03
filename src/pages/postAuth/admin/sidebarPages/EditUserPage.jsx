import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import LoadingPage from "../../../LoadingPage";

const EditUserPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    idNumber: '',
    mobileNumber: '',
    department: '',
    email: '',
    isActivated: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://comex-server.vercel.app/api/users/${userid}`)
      .then((response) => {
        if (response.data && response.data.User) {
          setUser(response.data.User);
        } else {
          setError("User data not found");
        }
      })
      .catch((error) => {
        setError("Failed to fetch user data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSaveChanges = () => {
    axios
      .put(`https://comex-server.vercel.app/api/users/update/${userid}`, user)
      .then(() => {
        navigate(`/admin/users/${userid}`);
      })
      .catch(() => {
        setError("Failed to update user data");
      });
  };

  if (loading) {
    return <LoadingPage/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Top Section: Back Button on left, Save Changes on right */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/admin/users`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={handleSaveChanges}
          className="btn px-4 py-2 bg-nucolor3 text-black rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Edit User</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Avatar and User Type */}
        <div className="flex flex-col items-center border-r border-gray-200 pr-6">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="h-48 w-48 rounded-full border-4 border-gray-300 shadow-md mb-4"
          />
          <p className="text-2xl font-semibold text-gray-700">{user.usertype || "N/A"}</p>
        </div>

        {/* User Form */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <InputField label="First Name" name="firstName" value={user.firstName} onChange={handleInputChange} />
              <InputField label="Middle Name" name="middleName" value={user.middleName} onChange={handleInputChange} />
              <InputField label="Last Name" name="lastName" value={user.lastName} onChange={handleInputChange} />
            </div>
            <div>
              <InputField label="ID Number" name="idNumber" value={user.idNumber} onChange={handleInputChange} />
              <InputField label="Mobile Number" name="mobileNumber" value={user.mobileNumber} onChange={handleInputChange} />
              <InputField label="Department" name="department" value={user.department} onChange={handleInputChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <InputField label="Email" name="email" value={user.email} onChange={handleInputChange} />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                name="isActivated"
                checked={user.isActivated}
                onChange={(e) => setUser({ ...user, isActivated: e.target.checked })}
              />
              <span>Account Activated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-500">{label}:</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

export default EditUserPage;