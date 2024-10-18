import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../api"; // Updated to use the `api` instance
import { ArrowLeft } from "lucide-react";
import { departmentItems } from "../../../../components/ItemOptions"; // Import department items
import LoadingPage from "../../../LoadingPage";
import { showToast } from "../../../../components/Toast";

const EditActivityPage = () => {
  const { activityid } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    department: "",
    type: "",
    objectives: "", // Added objectives field
    organizer: "",
    location: "", // Added location field
    startDate: "",
    endDate: "",
    time: "",
    image: "", // Image URL as a string
    isActivated: false,
    isVoluntaryAndUnpaid: false,
    adminApproval: { isApproved: false }, // Ensure adminApproval is initialized
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/activity/${activityid}`) // Updated to use the `api` instance
      .then((response) => {
        if (response.data && response.data.Activity) {
          const activityData = response.data.Activity;
          if (!activityData.adminApproval) {
            activityData.adminApproval = { isApproved: false };
          }
          setActivity(activityData);
        } else {
          setError("Activity data not found");
        }
      })
      .catch(() => {
        setError("Failed to fetch activity data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activityid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSaveChanges = () => {
    api
      .put(`/activity/update/${activityid}`, activity) // Updated to use the `api` instance
      .then(() => {
        showToast("success", "Changes saved!");
        navigate(`/admin/activities/${activityid}`);
      })
      .catch(() => {
        setError("Failed to update activity data");
      });
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen">
      {/* Top Section: Back Button on left, Save Changes on right */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/admin/activities`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={handleSaveChanges}
          className="px-4 py-2 bg-nucolor3 text-black rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-800 mb-6">
        Edit Activity
      </h2>

      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Activity Title"
            name="title"
            value={activity.title}
            onChange={handleInputChange}
          />
          <SelectField
            label="Type"
            name="type"
            value={activity.type}
            options={[
              { value: "Institutional", label: "Institutional" },
              { value: "College Driven", label: "College Driven" },
              { value: "Extension Services", label: "Extension Services" },
              {
                value: "Capacity-Building Services",
                label: "Capacity-Building Services",
              },
              {
                value: "External Participation",
                label: "External Participation",
              },
            ]}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <InputField
            label="Organizer"
            name="organizer"
            value={activity.organizer}
            onChange={handleInputChange}
          />
          <InputField
            label="Description"
            name="description"
            value={activity.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <InputField
            label="Location" // Added the Location field
            name="location"
            value={activity.location}
            onChange={handleInputChange}
          />
          <TextAreaField
            label="Objectives"
            name="objectives"
            value={activity.objectives}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            value={activity.startDate}
            onChange={handleInputChange}
          />
          <InputField
            label="End Date"
            name="endDate"
            type="date"
            value={activity.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <InputField
            label="Time"
            name="time"
            type="time"
            value={activity.time}
            onChange={handleInputChange}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              name="isActivated"
              checked={activity.isActivated}
              onChange={(e) =>
                setActivity({ ...activity, isActivated: e.target.checked })
              }
            />
            <span>Activity Activated</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              name="isApproved"
              checked={activity.adminApproval?.isApproved} // Safely check for adminApproval
              onChange={(e) =>
                setActivity({
                  ...activity,
                  adminApproval: {
                    ...activity.adminApproval,
                    isApproved: e.target.checked,
                  },
                })
              }
            />
            <span>Activity Approved</span>
          </div>
        </div>

        {/* Department Dropdown */}
        <div className="mt-6">
          <SelectField
            label="Department"
            name="department"
            value={activity.department}
            options={departmentItems.filter(
              (item) => item.value !== "All Departments"
            )}
            onChange={handleInputChange}
          />
        </div>

        {/* Image URL Input Field */}
        <div className="mt-6">
          <InputField
            label="Activity Image URL"
            name="image"
            value={activity.image}
            onChange={handleInputChange}
          />
          {activity.image && (
            <img
              src={activity.image}
              alt="Activity"
              className="mt-4 w-full h-auto rounded-lg shadow-md"
            />
          )}
        </div>
      </div>

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-500">{label}:</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

// Reusable TextArea Field Component
const TextAreaField = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-500">{label}:</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        rows={5}
      />
    </div>
  );
};

// Reusable Select Field Component for Dropdowns
const SelectField = ({ label, name, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-500">{label}:</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditActivityPage;
