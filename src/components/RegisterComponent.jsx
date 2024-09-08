import { useState } from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import PasswordInput from "./inputs/PasswordInput";
import TermsOfService from "./inputs/TermsOfService";
import ButtonRegister from "./inputs/ButtonRegister";
import Alternate from "./inputs/Alternate";
import MobileNumberInput from "./inputs/MobileNumberInput";
import UserTypeOptions from "./inputs/UserTypeOptions";
import DepartmentOptions from "./inputs/DepartmentOptions";
import UseRegister from "./hooks/UseRegister";
import UseFormValidation from "./hooks/UseFormValidation";

const RegisterComponent = () => {
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
    <div className="bg-white2 sm:w-max flex flex-col w-full py-8 px-4 rounded-xl shadow-xl">
      <h1 className="self-start text-2xl font-extrabold text-center mb-5">
        Create an Account
      </h1>

      <SelectInput
        label="Usertype"
        value={usertype}
        onChange={(e) => {
          setUsertype(e.target.value);
          validateField("usertype", e.target.value); // Validate on change
        }}
        options={UserTypeOptions()}
        error={!!errors.usertype}
        errorMessage={errors.usertype}
      />

      <div className="flex flex-col sm:flex-row gap-x-3">
        <TextInput
          label="First name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            validateField("firstName", e.target.value); // Validate on change
          }}
          error={!!errors.firstName}
          errorMessage={errors.firstName}
        />
        <TextInput
          label="Middle name"
          value={middleName}
          onChange={(e) => {
            setMiddleName(e.target.value);
            validateField("middleName", e.target.value); // Validate on change
          }}
          error={!!errors.middleName}
          errorMessage={errors.middleName}
        />
        <TextInput
          label="Last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateField("lastName", e.target.value); // Validate on change
          }}
          error={!!errors.lastName}
          errorMessage={errors.lastName}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-x-3">
        <div className="w-full">
          <TextInput
            label="ID Number"
            value={idNumber}
            maxLength={11}
            onChange={(e) => {
              setIdNumber(e.target.value);
              validateField("idNumber", e.target.value); // Validate on change
            }}
            error={!!errors.idNumber}
            errorMessage={errors.idNumber}
          />
        </div>
        <div className="w-full">
          <MobileNumberInput
            label="Mobile Number"
            type="tel"
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
              validateField("mobileNumber", e.target.value); // Validate on change
            }}
            error={!!errors.mobileNumber}
            errorMessage={errors.mobileNumber}
          />
        </div>
      </div>

      <SelectInput
        label="Department"
        value={department}
        onChange={(e) => {
          setDepartment(e.target.value);
          validateField("department", e.target.value); // Validate on change
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

      <div className="flex flex-col sm:flex-row gap-x-3">
        <div className="w-full">
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
        </div>
        <div className="w-full">
          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateField("confirmPassword", e.target.value, {
                password,
              });
            }}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <TermsOfService
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>

      <ButtonRegister isChecked={isChecked} onClick={handleSubmit} />

      <div className="flex justify-center">
        <Alternate
          labelText="Already have an account?"
          linkTo="/login"
          linkText="Log in"
        />
      </div>
    </div>
  );
};

export default RegisterComponent;