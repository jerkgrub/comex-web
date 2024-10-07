import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../api"; // Adjust the path as needed
import { ArrowLeft } from "lucide-react";
import LoadingPage from "../../../LoadingPage";
import { showToast } from "../../../../components/Toast";
import FetchUserData from "../../../../components/hooks/FetchUserData";

// Import validation and input components
import UseFormValidation from "../../../../components/hooks/UseFormValidation"; // Adjust the path
import TextInput from "../../../../components/inputs/TextInput";
import SelectInput from "../../../../components/inputs/SelectInput";
import DepartmentOptions from "../../../../components/inputs/DepartmentOptions";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const userData = FetchUserData(); // Fetch the logged-in user's data

  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [usertype, setUsertype] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Import form validation hook
  const { errors, validateField, validateForm } = UseFormValidation();

  // Update state with user data when it is fetched
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setFirstName(userData.firstName || "");
      setMiddleName(userData.middleName || "");
      setLastName(userData.lastName || "");
      setIdNumber(userData.idNumber || "");
      setMobileNumber(userData.mobileNumber || "");
      setDepartment(userData.department || "");
      setEmail(userData.email || "");
      setUsertype(userData.usertype || "");
      setLoading(false);
    }
  }, [userData]);

  const handleSaveChanges = () => {
    const fields = {
      firstName,
      middleName,
      lastName,
      idNumber,
      mobileNumber,
      department,
      email,
    };

    if (validateForm(fields)) {
      const updatedUser = {
        firstName,
        middleName,
        lastName,
        idNumber,
        mobileNumber,
        department,
        email,
      };
      api
        .put(`/users/update/${userData._id}`, updatedUser) // Update the logged-in user's data
        .then(() => {
          showToast("success", "Profile updated successfully!");
          navigate(`/client/profile`);
        })
        .catch(() => {
          setError("Failed to update profile data.");
        });
    } else {
      showToast("error", "Please correct the errors in the form.");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 min-h-screen">
      {/* Top Section: Back Button on left, Save Changes on right */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/client/profile`)}
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

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Edit Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Avatar and Usertype */}
        <div className="flex flex-col items-center border-r border-gray-200 pr-6">
          <img
            src={userData.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="h-48 w-48 rounded-full border-4 border-gray-300 shadow-md mb-4"
          />
          <p className="text-2xl font-semibold text-gray-700">
            {usertype || "N/A"}
          </p>
        </div>

        {/* User Form */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <TextInput
                label="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  validateField("firstName", e.target.value);
                }}
                error={!!errors.firstName}
                errorMessage={errors.firstName}
              />
              <TextInput
                label="Middle Name"
                value={middleName}
                onChange={(e) => {
                  setMiddleName(e.target.value);
                  validateField("middleName", e.target.value);
                }}
                error={!!errors.middleName}
                errorMessage={errors.middleName}
              />
              <TextInput
                label="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  validateField("lastName", e.target.value);
                }}
                error={!!errors.lastName}
                errorMessage={errors.lastName}
              />
            </div>
            <div>
              <TextInput
                label="ID Number"
                value={idNumber}
                onChange={(e) => {
                  setIdNumber(e.target.value);
                  validateField("idNumber", e.target.value);
                }}
                error={!!errors.idNumber}
                errorMessage={errors.idNumber}
              />
              <TextInput
                label="Mobile Number"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  validateField("mobileNumber", e.target.value);
                }}
                error={!!errors.mobileNumber}
                errorMessage={errors.mobileNumber}
              />
              <SelectInput
                label="Department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  validateField("department", e.target.value);
                }}
                options={DepartmentOptions()}
                error={!!errors.department}
                errorMessage={errors.department}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <TextInput
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              error={!!errors.email}
              errorMessage={errors.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;