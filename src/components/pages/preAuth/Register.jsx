import React, { useContext, useState } from "react";
import "./RegisterPage.css";

import email_icon from "../../images/email.png";
import password_icon from "../../images/password.png";
import logo from "../../images/logo.png";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // login data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("Client");

  // functions
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const register_btn = () => {
    navigate("/login");
  };

  const login_btn = () => {
    event.preventDefault();
    Swal.fire({
      title: "Logging in...",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      axios
        .post("http://localhost:8000/api/login", {
          email: email,
          password: password,
          usertype: usertype.toLowerCase(),
        })
        .then((response) => {
          if (response.data.message === "Successfully logged in as admin") {
            Swal.fire({
              icon: "success",
              title: "Logged in as admin!",
              showConfirmButton: false,
              timer: 1500,
            });
            setUser({ email: email }); //set here
            navigate("/admin/dashboard");
          } else if (
            response.data.message === "Successfully logged in as client"
          ) {
            Swal.fire({
              icon: "success",
              title: "Logged in as client!",
              showConfirmButton: false,
              timer: 1500,
            });
            setUser({ email: email }); //set here
            navigate("/client/home");
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid login attempt",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  return (
    <div
      className="
flex 
min-h-full 
flex-1 
flex-col 
justify-center 
px-6 
py-12 
lg:px-8
bg-gradient-bg
bg-cover 
bg-no-repeat
"
    >
      <div className="sm:mx-auto sm:w-7/12">
        <div className="bg-white my-4 py-8 px-4 drop-shadow-md shadow sm:rounded-lg sm:px-10">
          {/* add here */}
          <div class="max-w-4xl mx-auto text-[#333] p-6">
            <div class="text-center mb-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className=""></div>
                <h2 className="-mt-4 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
                  Register
                </h2>
              </div>
            </div>
            <form>
              <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                <label class="block text-sm">
                  <p className="mb-2">Register As</p>
                  <select className="font-sans select select-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500">
                    <option disabled selected>
                      What are you?
                    </option>
                    <option>Student</option>
                    <option>Teacher</option>
                    <option>ASP (Admin Support Personnel)</option>
                    <option>NTP (Non Teaching Personnel)</option>
                  </select>
                </label>
                <div>
                  <label class="text-sm mb-2 block">First Name</label>
                  <input
                    name="name"
                    type="text"
                    class="input input-bordered  w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label class="text-sm mb-2 block">Middle Name</label>
                  <input
                    name="lname"
                    type="text"
                    class="input input-bordered  w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label class="text-sm mb-2 block">Last Name</label>
                  <input
                    name="lname"
                    type="text"
                    class="input input-bordered  w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Enter last name"
                  />
                </div>

                <div>
                  <label class="text-sm mb-2 block">Email Address</label>
                  <input
                    name="email"
                    type="text"
                    class="input input-bordered  w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label class="text-sm mb-2 block">Mobile Number</label>
                  <input
                    name="number"
                    type="number"
                    class="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Enter mobile number"
                  />
                </div>
                <label class="block text-sm">
                  <p className="mb-2">Department</p>
                  <select className="font-sans select select-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500">
                    <option disabled selected>
                      What department are you?
                    </option>
                    <option value="College of Dentistry">
                      College of Dentistry
                    </option>
                    <option value="School of Optometry">
                      School of Optometry
                    </option>
                    <option value="School of Health Sciences">
                      School of Health Sciences
                    </option>
                    <option value="School of Accountancy and Management">
                      School of Accountancy and Management
                    </option>
                    <option value="School of Information Technology">
                      School of Information Technology
                    </option>
                    <option value="School of Arts and Sciences">
                      School of Arts and Sciences
                    </option>
                    <option value="School of Architecture">
                      School of Architecture
                    </option>
                    <option value="Senior High School Department">
                      Senior High School Department
                    </option>
                  </select>
                </label>
                <div>
                  <label class="text-sm mb-2 block">Date Hired</label>
                  <input
                    name="dateHired"
                    type="date"
                    class="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Enter date hired"
                  />
                </div>
                <div>
                  <label class="text-sm mb-2 block">Password</label>
                  <input
                    name="password"
                    type="password"
                    class="input input-bordered  w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label class="text-sm mb-2 block">Confirm Password</label>
                  <input
                    name="cpassword"
                    type="password"
                    class="input input-bordered  w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                    placeholder="Enter confirm password"
                  />
                </div>
              </div>
              <div class="!mt-10">
                <button
                  onClick={login_btn}
                  className="btn flex w-full font-semibold justify-center rounded-md bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <p className="mt-7 text-center text-bs text-gray-500">
            Already have an account?{" "}
            <a
              onClick={register_btn}
              className="font-semibold leading-6 text-nucolor7 hover:text-blue"
            >
              Log In
            </a>
          </p>

          {/* add here */}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
