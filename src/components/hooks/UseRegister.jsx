import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { showToast } from "../Toast";

const UseRegister = ({
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
  loginPath = "/login", // Added loginPath as a prop with a default value
}) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!isChecked) {
      Swal.fire({
        title: "Error!",
        text: "You must accept the terms and conditions to register.",
        icon: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "error",
      });
      return;
    }

    const newUser = {
      isActivated: true,
      avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg", // Set default avatar
      usertype,
      firstName,
      middleName,
      lastName,
      idNumber,
      mobileNumber,
      department,
      email,
      password,
      dateHired,
    };

    axios
      .post("http://localhost:8000/api/users/new", newUser)
      .then((response) => {
        if (
          response.status === 400 &&
          response.data.message ===
            "The email you have provided is already associated with an account."
        ) {
          Swal.fire({
            title: "Error!",
            text: response.data.message,
            icon: "error",
          });
        } else if (response.data.error) {
          Swal.fire({
            title: "Error!",
            text: response.data.error,
            icon: "error",
          });
        } else {
          showToast("success", "Registration complete!");
          navigate(loginPath); // Use the loginPath prop
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text:
            error.response?.data?.message ||
            "There was an error creating the account.",
          icon: "error",
        });
      });
  };

  return { handleRegister };
};

export default UseRegister;