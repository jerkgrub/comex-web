import { useState } from "react";

const UseFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value, otherValues = {}) => {
    let error = "";

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
        else if (!/^\d{11}$/.test(value))
          error = "Mobile number must be 11 digits";
        break;

      case "usertype":
        if (!value) error = "Usertype is required";
        break;

      case "department":
        if (!value) error = "Department is required";
        break;

      case "idNumber":
        if (!value) error = "ID Number is required";
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

      default:
        if (!value) error = `${name} is required`;
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const validateForm = (fields) => {
    let formIsValid = true;
    Object.entries(fields).forEach(([name, value]) => {
      const error = validateField(name, value, fields);
      if (error) formIsValid = false;
    });
    return formIsValid;
  };

  return { errors, validateField, validateForm };
};

export default UseFormValidation;
