import { useState, useEffect } from "react";
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
  const [dateHired, setDateHired] = useState("");
  const [isIdDisabled, setIsIdDisabled] = useState(true);
  const [isDateHiredDisabled, setIsDateHiredDisabled] = useState(true);

  const { errors, validateField, validateForm } = UseFormValidation();
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
    dateHired,
  });

  // Effect to handle enabling/disabling fields based on usertype
  useEffect(() => {
    if (!usertype) {
      // If no usertype is selected, disable both fields
      setIsIdDisabled(true);
      setIsDateHiredDisabled(true);
    } else if (usertype === "Student") {
      // Enable ID Number and disable Date Hired for students
      setIsIdDisabled(false);
      setIsDateHiredDisabled(true);
      setDateHired(""); // Clear dateHired when disabled
    } else if (["Faculty", "NTP", "COMEX Coordinator"].includes(usertype)) {
      // Enable ID Number and disable Date Hired for these user types
      setIsIdDisabled(false);
      setIsDateHiredDisabled(true);
      setDateHired(""); // Clear dateHired when disabled
    } else {
      // Disable ID Number and enable Date Hired for other user types
      setIsIdDisabled(true);
      setIdNumber(""); // Clear idNumber when disabled
      setIsDateHiredDisabled(false);
    }
  }, [usertype]);

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
      dateHired,
    };

    const disabledFields = {
      idNumber: isIdDisabled,
      dateHired: isDateHiredDisabled,
    };

    if (validateForm(fields, disabledFields) && isChecked) {
      handleRegister();
    } else if (!isChecked) {
      alert("Please accept the terms of service.");
    }
  };

  const handleCheckboxChange = (e) => {
    if (typeof e === "boolean") {
      setIsChecked(e);
    } else {
      setIsChecked(e.target.checked);
    }
  };

  // New function to handle accepting terms from the modal
  const handleAcceptTerms = () => {
    setIsChecked(true);
  };

  // New function to handle declining terms from the modal
  const handleDeclineTerms = () => {
    setIsChecked(false);
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
          validateField("usertype", e.target.value);
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
            validateField("firstName", e.target.value);
          }}
          error={!!errors.firstName}
          errorMessage={errors.firstName}
        />
        <TextInput
          label="Middle name (Optional)"
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

      <div className="flex flex-col sm:flex-row gap-x-3">
        <div className="w-full">
          <TextInput
            disabled={isIdDisabled}
            placeholder={
              usertype === "Student"
                ? "2XXX-1XXXX"
                : ["Faculty", "NTP", "COMEX Coordinator"].includes(usertype)
                ? "1X-0XXX"
                : ""
            }
            label="ID Number"
            value={idNumber}
            maxLength={
              usertype === "Student"
                ? 11 // e.g., 2XXX-1XXXX
                : ["Faculty", "NTP", "COMEX Coordinator"].includes(usertype)
                ? 7 // e.g., 1X-0XXX
                : 0
            }
            onChange={(e) => {
              setIdNumber(e.target.value);
              validateField("idNumber", e.target.value, { usertype }, isIdDisabled);
            }}
            error={!!errors.idNumber && !isIdDisabled}
            errorMessage={errors.idNumber}
          />
        </div>
        <div className="w-full">
          <MobileNumberInput
            placeholder="9XXXXXXXXX"
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
      </div>

      {/* Date picker for Date Hired */}
      <div className="flex flex-col sm:flex-row gap-x-3 mb-5">
        <div className="w-full">
          <label className="mb-1 pl-1 font-semibold">Date Hired</label>
          <input
            type="date"
            value={dateHired || ""}
            disabled={isDateHiredDisabled}
            onChange={(e) => {
              setDateHired(e.target.value);
              validateField("dateHired", e.target.value, { usertype }, isDateHiredDisabled);
            }}
            className={`input input-bordered w-full ${
              errors.dateHired && !isDateHiredDisabled ? "border-red-500" : ""
            }`}
          />
          {errors.dateHired && !isDateHiredDisabled && (
            <p className="pl-1 text-red-500 text-sm mt-1">
              * {errors.dateHired}
            </p>
          )}
        </div>
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
          handleAcceptTerms={handleAcceptTerms}
          handleDeclineTerms={handleDeclineTerms} // Pass the new function
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