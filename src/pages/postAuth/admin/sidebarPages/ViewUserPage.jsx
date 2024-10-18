import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import api from "../../../../api"; // Assuming you have your api instance set up
import {
  Mail,
  Phone,
  IdCard,
  Briefcase,
  CheckCircle,
  XCircle,
  Power,
  PowerOff,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import LoadingPage from "../../../LoadingPage";

const ViewUserPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActivated, setIsActivated] = useState(null);

  useEffect(() => {
    // Fetch the user data
    api
      .get(`/users/${userid}`)
      .then((response) => {
        if (response.data && response.data.User) {
          setUser(response.data.User);
          setIsActivated(response.data.User.isActivated);
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

  const toggleAccountStatus = async () => {
    try {
      const updatedStatus = !isActivated;
      const response = await api.put(`/users/update/${userid}`, {
        isActivated: updatedStatus,
      });
      setIsActivated(updatedStatus);
    } catch (error) {
      console.error("Failed to update account status", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen">
        {/* Skeleton for Top Section */}
        <div className="flex justify-between items-center mb-6">
          <Skeleton width={100} height={30} />
          <Skeleton width={120} height={40} />
        </div>

        {/* Skeleton for User Profile Header */}
        <Skeleton width={`60%`} height={50} />

        {/* Skeleton for Avatar and Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg mt-6">
          <div className="flex flex-col items-center border-r border-gray-200 pr-6">
            <Skeleton circle={true} height={192} width={192} />
            <Skeleton width={`70%`} height={30} className="mt-4" />
          </div>
          <div className="col-span-2">
            <Skeleton count={6} height={30} className="mb-4" />
          </div>
        </div>

        {/* Skeleton for Additional User Information */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <Skeleton count={4} height={30} className="mb-4" />
        </div>
      </div>
    );
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
          onClick={() => navigate(`/admin/users`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={() => navigate(`/admin/users/${userid}/edit`)}
          className="btn px-4 py-2 bg-nucolor3 text-black rounded-lg hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
        User Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Avatar and User Type */}
        <div className="flex flex-col items-center border-r border-gray-200 pr-6">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="h-48 w-48 rounded-full border-4 border-gray-300 shadow-md mb-4"
          />
          <p className="text-2xl font-semibold text-gray-700">
            {user.usertype || "N/A"}
          </p>
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
              {user.usertype && user.usertype.toLowerCase() === "student" ? (
                <Detail
                  label="ID Number"
                  value={user.idNumber}
                  icon={<IdCard className="w-5 h-5 text-green-500" />}
                />
              ) : (
                <Detail
                  label="Date Hired"
                  value={user.dateHired}
                  icon={<Calendar className="w-5 h-5 text-blue-500" />}
                />
              )}
              <Detail
                label="Mobile Number"
                value={user.mobileNumber}
                icon={<Phone className="w-5 h-5 text-red-500" />}
              />
              <Detail
                label="Department"
                value={user.department}
                icon={<Briefcase className="w-5 h-5 text-yellow-500" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional User Information */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Detail
              label="Email"
              value={user.email}
              icon={<Mail className="w-5 h-5 text-purple-500" />}
            />
          </div>
          <div>
            <Detail
              label="Account Status"
              value={isActivated ? "Activated" : "Not Activated"}
              icon={
                isActivated ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )
              }
            />
            <div className="flex flex-row gap-3">
              <p>Toggle Activation:</p>
              <button
                className={`btn btn-xs btn-square md:w-auto ${
                  isActivated ? "btn-success" : "btn-error"
                }`}
                onClick={toggleAccountStatus}
                title={`Toggle to ${
                  isActivated ? "Deactivate" : "Activate"
                } account`}
              >
                {isActivated ? (
                  <Power className="w-5 h-5" />
                ) : (
                  <PowerOff className="w-5 h-5" />
                )}
              </button>
            </div>
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
