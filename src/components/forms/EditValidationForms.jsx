// EditValidationForms.jsx
import React from 'react';
import TextInput from '../../components/inputs/TextInput';
import SelectInput from '../../components/inputs/SelectInput';
import DepartmentOptions from '../../components/inputs/DepartmentOptions';
import UserTypeOptions from '../../components/inputs/UserTypeOptions';

const EditValidationForms = ({
  avatar,
  handleAvatarChange,
  usertype,
  setUsertype,
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
  idNumber,
  setIdNumber,
  mobileNumber,
  setMobileNumber,
  department,
  setDepartment,
  email,
  setEmail,
  dateHired,
  setDateHired,
  isActivated,
  setIsActivated,
  isIdDisabled,
  isDateHiredDisabled,
  errors,
  validateField,
}) => {
  return (
    <div className="p-8 min-h-screen">
      {/* Top Section: Back Button and Save Changes are handled in parent */}
      
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Edit User</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Avatar and User Type */}
        <div className="flex flex-col items-center border-r border-gray-200 pr-6">
          <input type="file" onChange={handleAvatarChange} />
          <img
            src={avatar || '/default-avatar.png'}
            alt="User Avatar"
            className="h-48 w-48 rounded-full border-4 border-gray-300 shadow-md mb-4"
          />
          <SelectInput
            label="Usertype"
            value={usertype}
            onChange={e => {
              setUsertype(e.target.value);
              validateField('usertype', e.target.value);
            }}
            options={UserTypeOptions()}
            error={!!errors.usertype}
            errorMessage={errors.usertype}
          />
        </div>

        {/* User Form */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <TextInput
                label="First Name"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                  validateField('firstName', e.target.value);
                }}
                error={!!errors.firstName}
                errorMessage={errors.firstName}
              />
              <TextInput
                label="Middle Name"
                value={middleName}
                onChange={e => {
                  setMiddleName(e.target.value);
                  validateField('middleName', e.target.value);
                }}
                error={!!errors.middleName}
                errorMessage={errors.middleName}
              />
              <TextInput
                label="Last Name"
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
                  validateField('lastName', e.target.value);
                }}
                error={!!errors.lastName}
                errorMessage={errors.lastName}
              />
            </div>
            <div>
              <TextInput
                label="ID Number"
                value={idNumber}
                disabled={isIdDisabled}
                onChange={e => {
                  setIdNumber(e.target.value);
                  validateField('idNumber', e.target.value, {}, isIdDisabled);
                }}
                error={!!errors.idNumber && !isIdDisabled}
                errorMessage={errors.idNumber}
              />
              <TextInput
                label="Mobile Number"
                value={mobileNumber}
                onChange={e => {
                  setMobileNumber(e.target.value);
                  validateField('mobileNumber', e.target.value);
                }}
                error={!!errors.mobileNumber}
                errorMessage={errors.mobileNumber}
              />
              <SelectInput
                label="Department"
                value={department}
                onChange={e => {
                  setDepartment(e.target.value);
                  validateField('department', e.target.value);
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
              onChange={e => {
                setEmail(e.target.value);
                validateField('email', e.target.value);
              }}
              error={!!errors.email}
              errorMessage={errors.email}
            />

            {/* Date Hired */}
            <div className="mb-4">
              <label className="mb-1 pl-1 font-semibold">Date Hired</label>
              <input
                type="date"
                value={dateHired || ''}
                disabled={isDateHiredDisabled}
                onChange={e => {
                  setDateHired(e.target.value);
                  validateField('dateHired', e.target.value, {}, isDateHiredDisabled);
                }}
                className={`input input-bordered w-full ${
                  errors.dateHired && !isDateHiredDisabled ? 'border-red-500' : ''
                }`}
              />
              {errors.dateHired && !isDateHiredDisabled && (
                <p className="pl-1 text-red-500 text-sm mt-1">* {errors.dateHired}</p>
              )}
            </div>

            {/* Account Activation */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                name="isActivated"
                checked={isActivated}
                onChange={e => setIsActivated(e.target.checked)}
              />
              <span>Account Activated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditValidationForms;