import { useState } from "react";

const UseFormValidation = () => {
  const [errors, setErrors] = useState({});

  // Validate a specific field, skip if disabled
  const validateField = (name, value, otherValues = {}, isDisabled = false) => {
    let error = "";

    if (isDisabled) {
      // If the field is disabled, remove any existing error and skip validation
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
      return ""; // No error if disabled
    }

    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[\w-.]+@[\w-.]*nu-moa\.edu\.ph$/.test(value)) {
          error = "Email must end with 'nu-moa.edu.ph'";
        }
        break;

      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8)
          error = "Password must be at least 8 characters";
        break;

      case "confirmPassword":
        if (!value) error = "Confirming your password is required";
        else if (value !== otherValues.password)
          error = "Passwords do not match";
        break;

      case "mobileNumber":
        if (!value) error = "Mobile Number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Mobile number must be 10 digits";
        break;

      case "usertype":
        if (!value) error = "Usertype is required";
        break;

      case "department":
        if (!value) error = "Department is required";
        break;

      case "idNumber":
        if (!value) {
          error = "ID Number is required";
        } else if (!/^\d{4}-\d{6}$/.test(value)) {
          error = "ID Number must follow the format 2XXX-1XXXX";
        }
        break;

      case "firstName":
        if (!value) error = "First name is required";
        break;

      case "middleName":
        if (!value) error = "Middle name is required";
        break;

      case "lastName":
        if (!value) error = "Last name is required";
        break;

      case "dateHired":
        if (!value) {
          error = "Date Hired is required";
        } else {
          const today = new Date();
          const selectedDate = new Date(value);
          if (selectedDate > today) {
            error = "Date Hired cannot be in the future";
          }
        }
        break;

      default:
        if (!value) error = `${name} is required`;
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  // Validate the entire form
  const validateForm = (fields, disabledFields = {}) => {
    let formIsValid = true;
    Object.entries(fields).forEach(([name, value]) => {
      const isDisabled = disabledFields[name];
      const error = validateField(name, value, fields, isDisabled);
      if (error) formIsValid = false;
    });
    return formIsValid;
  };

  return { errors, validateField, validateForm };
};

export default UseFormValidation;