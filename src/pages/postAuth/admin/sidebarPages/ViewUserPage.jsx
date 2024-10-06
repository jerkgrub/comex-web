import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../api"; // Updated to use the `api` instance
import { Mail, Phone, IdCard, Briefcase, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import LoadingPage from "../../../LoadingPage";

const ViewUserPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate(); // Use navigate hook for back button functionality
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/users/${userid}`) // Updated to use the `api` instance
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

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="p-8 min-h-screen"> 
      {/* Top Section: Back Button on left, Edit Profile on right */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/admin/users`)} // Navigate back to the previous page
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={() => navigate(`/admin/users/${userid}/edit`)} // Navigate to EditUserPage
          className="btn px-4 py-2 bg-nucolor3 text-black rounded-lg hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">User Profile</h2>

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

        {/* User Details */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Detail label="First Name" value={user.firstName} />
              <Detail label="Middle Name" value={user.middleName} />
              <Detail label="Last Name" value={user.lastName} />
            </div>
            <div>
              <Detail label="ID Number" value={user.idNumber} icon={<IdCard className="w-5 h-5 text-green-500" />} />
              <Detail label="Mobile Number" value={user.mobileNumber} icon={<Phone className="w-5 h-5 text-red-500" />} />
              <Detail label="Department" value={user.department} icon={<Briefcase className="w-5 h-5 text-yellow-500" />} />
            </div>
          </div>
        </div>
      </div>

      {/* Additional User Information */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Detail label="Email" value={user.email} icon={<Mail className="w-5 h-5 text-purple-500" />} />
          </div>
          <div>
            <Detail
              label="Account Status"
              value={user.isActivated ? "Activated" : "Not Activated"}
              icon={user.isActivated ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Component with Icons
const Detail = ({ label, value, icon }) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
        {icon} {label}:
      </p>
      <p className="text-lg text-gray-800 font-medium">{value || "N/A"}</p>
    </div>
  );
};

export default ViewUserPage;
