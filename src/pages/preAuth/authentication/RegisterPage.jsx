import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/inputs/TextInput";
import SelectInput from "../../../components/inputs/SelectInput";
import PasswordInput from "../../../components/inputs/PasswordInput";
import TermsOfService from "../../../components/inputs/TermsOfService";
import ButtonRegister from "../../../components/inputs/ButtonRegister";
import { useState } from "react";
import Alternate from "../../../components/inputs/Alternate";
import MobileNumberInput from "../../../components/inputs/MobileNumberInput";
import UserTypeOptions from "../../../components/inputs/UserTypeOptions";
import DepartmentOptions from "../../../components/inputs/DepartmentOptions";
import axios from "axios"; // Make sure axios is imported
import Swal from "sweetalert2"; // Assuming you're using Swal for alerts

const RegisterPage = () => {
  const navigate = useNavigate();

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

  const newUser = {
    isActivated: true,
    usertype: usertype,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    idNumber: idNumber,
    mobileNumber: mobileNumber,
    department: department,
    email: email,
    password: password,
  };

  // Function to handle form submission
  const handleRegister = () => {
    console.log("choips");
    // Check if terms are accepted
    if (!isChecked) {
      Swal.fire({
        title: "Error!",
        text: "You must accept the terms and conditions to register.",
        icon: "error",
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "error",
      });
      return;
    }

    axios
      .post("http://localhost:8000/api/users/new", newUser)
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          Swal.fire({
            title: "Error!",
            text: response.data.error,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Account created successfully",
            icon: "success",
          }).then(() => {
            navigate("/login"); // Redirect to login after success
          });
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error creating the account.",
          icon: "error",
        });
      });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <div className="py-9 bg-gradient-bg bg-cover bg-no-repeat p-3 flex justify-center items-center">
        <div className="bg-white2 sm:w-max flex flex-col w-full py-8 px-4 rounded-xl shadow-xl">
          <h1 className="self-start text-2xl font-extrabold text-center mb-5">
            Create an Account
          </h1>

          <SelectInput
            label="Usertype"
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
            options={UserTypeOptions()}
          />

          {/* 1st Column */}
          <div className="flex flex-col sm:flex-row gap-x-3">
            <TextInput label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <TextInput label="Middle name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
            <TextInput label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          {/* 2nd Column */}
          <div className="flex flex-col sm:flex-row gap-x-3">
            <div className="w-full">
              <TextInput label="ID Number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
            </div>
            <div className="w-full">
              <MobileNumberInput label="Mobile Number" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </div>
          </div>

          {/* 3rd Column */}
          <SelectInput label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} options={DepartmentOptions()} />

          {/* 4th Column */}
          <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* 5th Column */}
          <div className="flex flex-col sm:flex-row gap-x-3">
            <div className="w-full">
              <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="w-full">
              <PasswordInput label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>

          {/* 6th Column */}
          <div className="flex justify-center ">
            <TermsOfService isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} />
          </div>

          {/* 7th Column */}
          <ButtonRegister isChecked={isChecked} onClick={handleRegister} />

          {/* 8th Column */}
          <div className="flex justify-center ">
            <Alternate labelText="Already have an account?" linkTo="/login" linkText="Log in" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;