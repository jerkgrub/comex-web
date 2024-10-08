import { useState } from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import PasswordInput from "./inputs/PasswordInput";
import TermsOfService from "./inputs/TermsOfService";
import ButtonRegister from "./inputs/ButtonRegister";
import MobileNumberInput from "./inputs/MobileNumberInput";
import UserTypeOptions from "./inputs/UserTypeOptions";
import DepartmentOptions from "./inputs/DepartmentOptions";
import UseRegister from "./hooks/UseRegister";
import UseFormValidation from "./hooks/UseFormValidation";

const RegisterComponentAdmin = ({ loginPath = "/admin/users" }) => {
  const [usertype, setUsertype] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { errors, validateField, validateForm } = UseFormValidation(); // Use the hook
  const { handleRegister } = UseRegister({
    usertype,
    firstName,
    middleName,
    lastName,
    idNumber,
    mobileNumber,
    department,
    email,
    password,
    confirmPassword,
    isChecked,
    loginPath, // Pass the loginPath prop to the UseRegister hook
  });

  const handleSubmit = () => {
    const fields = {
      usertype,
      firstName,
      middleName,
      lastName,
      idNumber,
      mobileNumber,
      department,
      email,
      password,
      confirmPassword,
    };

    if (validateForm(fields) && isChecked) {
      // Check if the terms of service is checked
      handleRegister(); // Only call this if the form is valid
    } else if (!isChecked) {
      // Handle case where terms are not accepted
      alert("Please accept the terms of service.");
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex flex-col w-full py-8 px-4 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Create an Account
      </h1>

      <SelectInput
        label="Usertype"
        value={usertype}
        onChange={(e) => {
          setUsertype(e.target.value);
          validateField("usertype", e.target.value);
        }}
        options={UserTypeOptions()}
        error={!!errors.usertype}
        errorMessage={errors.usertype}
      />

      <div className="flex flex-col sm:flex-row gap-x-3 mb-6">
        <TextInput
          label="First name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            validateField("firstName", e.target.value);
          }}
          error={!!errors.firstName}
          errorMessage={errors.firstName}
        />
        <TextInput
          label="Middle name"
          value={middleName}
          onChange={(e) => {
            setMiddleName(e.target.value);
            validateField("middleName", e.target.value);
          }}
          error={!!errors.middleName}
          errorMessage={errors.middleName}
        />
        <TextInput
          label="Last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateField("lastName", e.target.value);
          }}
          error={!!errors.lastName}
          errorMessage={errors.lastName}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-x-3 mb-6">
        <TextInput
          label="ID Number"
          value={idNumber}
          maxLength={11}
          onChange={(e) => {
            setIdNumber(e.target.value);
            validateField("idNumber", e.target.value);
          }}
          error={!!errors.idNumber}
          errorMessage={errors.idNumber}
        />
        <MobileNumberInput
          label="Mobile Number"
          type="tel"
          value={mobileNumber}
          onChange={(e) => {
            setMobileNumber(e.target.value);
            validateField("mobileNumber", e.target.value);
          }}
          error={!!errors.mobileNumber}
          errorMessage={errors.mobileNumber}
        />
      </div>

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

      <div className="flex flex-col sm:flex-row gap-x-3 mb-6">
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validateField("password", e.target.value);
          }}
          error={!!errors.password}
          errorMessage={errors.password}
        />
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validateField("confirmPassword", e.target.value, { password });
          }}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />
      </div>

      <div className="flex justify-center mb-4">
        <TermsOfService
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>

      <ButtonRegister isChecked={isChecked} onClick={handleSubmit} />
    </div>
  );
};

export default RegisterComponentAdmin;
