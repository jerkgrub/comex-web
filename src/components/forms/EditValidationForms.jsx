import React from "react";
import TextInput from "../../components/inputs/TextInput";
import SelectInput from "../../components/inputs/SelectInput";
import DepartmentOptions from "../../components/inputs/DepartmentOptions";
import UserTypeOptions from "../../components/inputs/UserTypeOptions";
import { Save } from "lucide-react";
const EditValidationForms = ({
  avatar,
  handleAvatarChange,
  handleSaveAvatar,
  selectedAvatarFile,
  isAvatarSaving,
  usertype,
  handleChange,
  firstName,
  middleName,
  lastName,
  idNumber,
  mobileNumber,
  department,
  email,
  dateHired,
  isActivated,
  setIsActivated,
  disabledFields,
  errors,
  validateField,
}) => {
  return (
    <div className="p-8 min-h-screen">
      {/* Top Section: Back Button and Save Changes are handled in parent */}

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Edit User</h2>

      <div className="card grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 shadow-lg">
        {/* Avatar and User Type */}
        <div className="flex flex-col items-center border-r border-gray-200 pr-6">
          <div className="mb-4 flex flex-col items-center">
            <img
              src={avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="h-48 w-48 rounded-full border-4 border-gray-300 shadow-md mb-4 object-cover"
            />

            {/* ditooo */}
            <div className="w-full flex flex-row items-center justify-between space-x-2 mb-3">
              <label className="flex-grow flex items-center">
                <input
                  type="file"
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="btn px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 cursor-pointer flex items-center w-full">
                  {selectedAvatarFile ? selectedAvatarFile.name : "Choose File"}
                </div>
              </label>

              <button
                type="button"
                onClick={handleSaveAvatar}
                disabled={!selectedAvatarFile || isAvatarSaving}
                className={`btn px-4 py-2 bg-nucolor3  text-black hover:text-gray-500 rounded-lg hover:bg-nucolor2 flex items-center ${
                  (!selectedAvatarFile || isAvatarSaving) &&
                  "opacity-50 cursor-not-allowed"
                }`}
              >
                {isAvatarSaving ? (
                  <svg
                    className="animate-spin h-5 w-5 text-grey-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <Save className="h-6 w-6" /> // LucideReact Save icon
                )}
              </button>
            </div>

            {/* ditooo end*/}
          </div>
          <SelectInput
            label="User Type"
            value={usertype}
            onChange={(e) => {
              handleChange("usertype", e.target.value);
              validateField("usertype", e.target.value);
            }}
            options={UserTypeOptions()}
            error={!!errors.usertype}
            errorMessage={errors.usertype}
          />
        </div>

        {/* User Form */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TextInput
                label="First Name"
                value={firstName}
                onChange={(e) => {
                  handleChange("firstName", e.target.value);
                  validateField("firstName", e.target.value);
                }}
                error={!!errors.firstName}
                errorMessage={errors.firstName}
              />
              <TextInput
                label="Middle Name"
                value={middleName}
                onChange={(e) => {
                  handleChange("middleName", e.target.value);
                  validateField("middleName", e.target.value);
                }}
                error={!!errors.middleName}
                errorMessage={errors.middleName}
              />
              <TextInput
                label="Last Name"
                value={lastName}
                onChange={(e) => {
                  handleChange("lastName", e.target.value);
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
                disabled={disabledFields.isIdDisabled}
                onChange={(e) => {
                  handleChange("idNumber", e.target.value);
                  validateField(
                    "idNumber",
                    e.target.value,
                    {},
                    disabledFields.isIdDisabled
                  );
                }}
                error={!!errors.idNumber && !disabledFields.isIdDisabled}
                errorMessage={errors.idNumber}
              />
              <TextInput
                label="Mobile Number"
                value={mobileNumber}
                onChange={(e) => {
                  handleChange("mobileNumber", e.target.value);
                  validateField("mobileNumber", e.target.value);
                }}
                error={!!errors.mobileNumber}
                errorMessage={errors.mobileNumber}
              />
              <SelectInput
                label="Department"
                value={department}
                onChange={(e) => {
                  handleChange("department", e.target.value);
                  validateField("department", e.target.value);
                }}
                options={DepartmentOptions()}
                error={!!errors.department}
                errorMessage={errors.department}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TextInput
              label="Email"
              disabled
              value={email}
              onChange={(e) => {
                handleChange("email", e.target.value);
                validateField("email", e.target.value);
              }}
              error={!!errors.email}
              errorMessage={errors.email}
            />

            {/* Date Hired */}
            <div className="mb-4">
              <label className="mb-1 pl-1 font-semibold">Date Hired</label>
              <input
                type="date"
                value={dateHired || ""}
                disabled={disabledFields.isDateHiredDisabled}
                onChange={(e) => {
                  handleChange("dateHired", e.target.value);
                  validateField(
                    "dateHired",
                    e.target.value,
                    {},
                    disabledFields.isDateHiredDisabled
                  );
                }}
                className={`input input-bordered w-full ${
                  errors.dateHired && !disabledFields.isDateHiredDisabled
                    ? "border-red-500"
                    : ""
                }`}
              />
              {errors.dateHired && !disabledFields.isDateHiredDisabled && (
                <p className="pl-1 text-red-500 text-sm mt-1">
                  * {errors.dateHired}
                </p>
              )}
            </div>

            {/* Account Activation */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditValidationForms;
