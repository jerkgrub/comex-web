import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api"; // Updated to use the `api` instance
import { ArrowLeft, Plus } from "lucide-react";
import { departmentItems } from "../../../../components/ItemOptions"; // Import department items

const CreateActivityPage = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState({
    title: "",
    description: "",
    department: "",
    type: "",
    organizer: "",
    startDate: "",
    endDate: "",
    time: "",
    image:
      "https://images.gmanews.tv/webpics/2023/09/cleanupdrive(1)_2023_09_16_19_15_58.jpg",
    isActivated: true,
    isVoluntaryAndUnpaid: false,
    adminApproval: {
      isApproved: false,
    },
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleImageChange = (e) => {
    setActivity({ ...activity, image: e.target.files[0] }); // Handle image file
  };

  const handleCreateActivity = () => {
    api
      .post("/activity/new", activity, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/admin/activities");
      })
      .catch(() => {
        setError("Failed to create activity");
      });
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/admin/activities`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={handleCreateActivity}
          className="px-4 py-2 bg-nucolor3 trounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Activity
        </button>
      </div>

      <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-6">
        Create New Activity
      </h2>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title and Type */}
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
            ]}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* Organizer and Description */}
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
          {/* Dates and Time */}
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

        <div className="mt-6">
          {/* Time */}
          <InputField
            label="Time"
            name="time"
            type="time"
            value={activity.time}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-6">
          {/* Department */}
          <SelectField
            label="Department"
            name="department"
            value={activity.department}
            options={departmentItems.filter(
              (item) => item.value !== "All Departments" // Filter out "All Departments"
            )}
            onChange={handleInputChange}
          />
          <InputField
            label="Image"
            name="image"
            value={activity.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-6">
          {/* Radio buttons for Voluntary and Unpaid */}
          <RadioButtonGroup
            label="Is this activity voluntary and unpaid?"
            name="isVoluntaryAndUnpaid"
            value={activity.isVoluntaryAndUnpaid}
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
            onChange={(e) =>
              setActivity({
                ...activity,
                isVoluntaryAndUnpaid: e.target.value === "true",
              })
            }
          />
        </div>

        <div className="flex items-center gap-2 mt-6">
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
      </div>

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}:</label>
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

// Reusable Select Field Component for Dropdowns
const SelectField = ({ label, name, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}:</label>
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

// Reusable Radio Button Group Component
const RadioButtonGroup = ({ label, name, value, onChange, options }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="mt-2 flex gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CreateActivityPage;
