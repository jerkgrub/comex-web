import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

const ViewActivityPage = () => {
  const { activityid } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/activity/${activityid}`)
      .then((response) => {
        if (response.data && response.data.Activity) {
          setActivity(response.data.Activity);
        } else {
          setError("Activity data not found");
        }
      })
      .catch((error) => {
        setError("Failed to fetch activity data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activityid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activity) {
    return <div>No activity data available</div>;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* Top Section: Back Button on left, Edit Activity on right */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/admin/activities`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={() => navigate(`/admin/activities/${activityid}/edit`)}
          className="btn px-4 py-2 bg-nucolor3 text-black rounded-lg hover:bg-blue-700"
        >
          Edit Activity
        </button>
      </div>

      <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-800 mb-6">Activity Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 bg-white p-4 sm:p-8 rounded-lg shadow-lg">
        {/* Activity Information */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Detail label="Activity Title" value={activity.title} />
            <Detail label="Description" value={activity.description} />
            <Detail label="Department" value={activity.department} />
            <Detail label="Type" value={activity.type} />
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