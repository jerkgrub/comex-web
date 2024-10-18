import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../api"; // Updated to use the `api` instance
import { ArrowLeft, CheckCircle, XCircle, Trash2 } from "lucide-react";
import AdminAddRespondent from "../../../../components/AdminAddRespondent"; // Import the add respondent component
import LoadingPage from "../../../LoadingPage"; // Import the loading page component

const ViewActivityPage = () => {
  const { activityid } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respondents, setRespondents] = useState([]); // To store respondents
  const [removalError, setRemovalError] = useState(null); // For respondent removal errors

  // Fetch activity details and respondents on page load
  useEffect(() => {
    // Fetch activity details
    api
      .get(`/activity/${activityid}`) // Updated to use the `api` instance
      .then((response) => {
        if (response.data && response.data.Activity) {
          setActivity(response.data.Activity);
        } else {
          setError("Activity data not found");
        }
      })
      .catch(() => {
        setError("Failed to fetch activity data");
      });

    // Fetch activity respondents and their user details
    api
      .get(`/activity/get/respondents/${activityid}`) // Updated to use the `api` instance
      .then((response) => {
        if (response.data && response.data.respondents) {
          const respondentIds = response.data.respondents.map(
            (respondent) => respondent.userId
          );
          // Fetch user details for each respondent
          Promise.all(
            respondentIds.map((userId) =>
              api.get(`/users/${userId}`) // Updated to use the `api` instance
            )
          )
            .then((userResponses) => {
              const users = userResponses.map((res) => res.data.User);
              setRespondents(users); // Set respondents with user data
            })
            .catch(() => {
              setError("Failed to fetch respondent details");
            });
        } else {
          setRespondents([]);
        }
      })
      .catch(() => {
        setError("Failed to fetch respondents");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activityid]);

  // Remove a respondent
  const handleRemoveRespondent = (userId) => {
    api
      .delete(`/activity/respondent/${activityid}/${userId}`) // Updated to use the `api` instance
      .then(() => {
        setRespondents(respondents.filter((respondent) => respondent._id !== userId)); // Remove respondent from the list
      })
      .catch((error) => {
        setRemovalError("Failed to remove respondent");
        console.error("Error removing respondent:", error);
      });
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activity) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen">
      {/* Top Section: Back Button on left */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/admin/activities`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={() => navigate(`/admin/activities/${activityid}/edit`)}
          className="px-4 py-2 bg-nucolor3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          Edit Activity
        </button>
      </div>

      <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-800 mb-6">
        Activity Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white p-4 sm:p-8 rounded-lg shadow-lg">
        {/* Activity Information */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Detail label="Activity Title" value={activity.title} />
            <Detail label="Description" value={activity.description} />
            <Detail label="Department" value={activity.department} />
            <Detail label="Type" value={activity.type} />
            <Detail label="Objectives" value={activity.objectives} />
            <Detail label="Location" value={activity.location} />
            {/* Image Display */}
            <div>
              <p className="text-sm font-semibold text-gray-500">Activity Image:</p>
              <img
                src={activity.image || "https://via.placeholder.com/400"}
                alt={activity.title}
                className="w-full h-auto mt-2 rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Activity Status */}
        <div className="flex flex-col items-center border-l border-gray-200 pl-6">
          <Detail
            label="Activity Status"
            value={activity.isActivated ? "Activated" : "Deactivated"}
            icon={
              activity.isActivated ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )
            }
          />
          <Detail
            label="Approval Status"
            value={activity.adminApproval.isApproved ? "Approved" : "Pending Approval"}
            icon={
              activity.adminApproval.isApproved ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )
            }
          />
        </div>
      </div>

      {/* List of Respondents */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Respondents ({respondents.length})</h3>
        {respondents.length === 0 ? (
          <p>No respondents have joined this activity yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {respondents.map((respondent) => (
              <li key={respondent._id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <img
                    src={respondent.avatar || "https://via.placeholder.com/40"}
                    alt={`${respondent.firstName} ${respondent.lastName}`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p>
                      {respondent.firstName} {respondent.lastName} ({respondent.email})
                    </p>
                  </div>
                </div>
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveRespondent(respondent._id)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {removalError && <p className="text-red-500 mt-2">{removalError}</p>}
      </div>

      {/* Add Respondent Section */}
      <AdminAddRespondent activityId={activityid} />
    </div>
  );
};

// Reusable Detail Component
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

export default ViewActivityPage;
