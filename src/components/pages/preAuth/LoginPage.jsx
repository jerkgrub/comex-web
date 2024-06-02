import React, { useContext, useState } from "react";
import "./LoginPage.css";

import email_icon from "../../images/email.png";
import password_icon from "../../images/password.png";
import logo from "../../images/logo.png";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

const LoginPage = () => {
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
    navigate("/register");
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
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white my-4 py-8 px-4 drop-shadow-md shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className=""></div>
            {/* <img
          className="mx-auto h-48 w-auto"
          src="https://i.imgur.com/R3I5T0V.png"
          alt="Your Company"
        /> */}
            <h2 className="mt-0 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
              Sign In
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <label className="input input-bordered flex items-center gap-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow "
                      placeholder=""
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-sm  font-semibold text-nucolor7 hover:text-blue"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <label className="input input-bordered flex items-center gap-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      className="grow"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  onClick={login_btn}
                  className="btn flex w-full font-semibold justify-center rounded-md bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                >
                  Sign In
                </button>
              </div>
            </form>

            <p className="mt-7 text-center text-bs text-gray-500">
              No account yet?{" "}
              <a
                onClick={register_btn}
                className="font-semibold leading-6 text-nucolor7 hover:text-blue"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
