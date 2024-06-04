import { ChevronDown, ChevronUp, CircleUserRound, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../../../UserContext";
import axios from "axios";

// add items here
const menuItems = [
  { name: "Home", link: "/ " },
  // { name: 'Events', link: '/client/home' },
  {
    name: "About Us",
    subItems: [
      { name: "Administrators", link: "/administrators" },
      { name: "Adopted Barangays", link: "/adopted-barangays" },
    ],
  },
];

const Dnavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown
  const { user, setUser } = useContext(UserContext); // Added setUser here
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();

  // for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // login data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("Client");

  // register data


  // for navbar options
  const item_btn = (link) => {
    navigate(link);
  };


  const login_btn = (event) => {
    event.preventDefault();
    Swal.fire({
      target: document.getElementById("my_modal_1"),
      scrollbarPadding: false,
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
              target: document.getElementById("my_modal_1"),
              scrollbarPadding: false,
              icon: "success",
              title: "Logged in as admin!",
              showConfirmButton: false,
              timer: 1500,
            });
            setUser({ 
              email: email, }); //set here
            navigate("/admin/dashboard");
          } else if (
            response.data.message === "Successfully logged in as student"
          ) {
            Swal.fire({
      scrollbarPadding: false,
              icon: "success",
              title: "Logged in as student!",
              showConfirmButton: false,
              timer: 1500,
            });
            setUser({ email: email }); //set here
            navigate("/client/home");
          } else {
            Swal.fire({
              target: document.getElementById("my_modal_1"),
      scrollbarPadding: false,
              icon: "error",
              title: "Invalid login attempt",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            target: document.getElementById("my_modal_1"),
      scrollbarPadding: false,
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
    <>
      <div className="navbar bg-nucolor1 text-white2 border-b-4 border-nucolor3 drop-shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                  {item.subItems && ( 
                    <ul className="p-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link to={subItem.link}>{subItem.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img className="w-44" src="https://i.imgur.com/FKLQLuv.png" />
          </div>
          {/* <a className="btn btn-ghost text-xl">COMsX CONNECT</a> */}
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* put map here */}

            {menuItems.map((item, index) => (
              <div key={index} className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost text-base font-normal"
                  onClick={() =>
                    item.subItems
                      ? setOpenDropdownIndex(
                          openDropdownIndex === index ? null : index
                        )
                      : item_btn(item.link)
                  }
                >
                  <Link to={item.link}>{item.name}</Link>
                  {item.subItems &&
                    (openDropdownIndex === index ? (
                      <ChevronDown className="w-4 text-white3" />
                    ) : (
                      <ChevronDown className="w-4 text-white3" />
                    ))}
                </div>
                {item.subItems && openDropdownIndex === index && (
                  <ul
                    tabIndex={0}
                    className="text-black dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subItem.link}>{subItem.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          {/* login button */}
          <div className="bg-nucolor1">
            <div className="dropdown dropdown-end">
              <div
                role="button"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="font-normal text-sm btn btn-ghost bg-nucolor1 tracking-widest cursor-pointer"
              >
                Log In
              </div>
            </div>
          </div>

          {/* login modal */}
          <dialog id="my_modal_1" className="modal transition-none text-black">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              {/* add here */}
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className=""></div>
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
                      className="btn mb-4 flex w-full font-semibold justify-center rounded-md bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                    >
                      Sign In
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </dialog>

          {/* Sign up */}
          <div className="  bg-nucolor1">
            <div className="dropdown dropdown-end">
              <div
                role="button"
                className="font-normal text-sm btn btn-ghost bg-nucolor3 hover:bg-[#9d8124] text-black  tracking-widest cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                Sign up
              </div>
            </div>
          </div>

          {/* Sign up modal */}
          <dialog id="my_modal_2" className="modal transition-none text-black">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              {/* add here */}
              <div class="max-w-4xl mx-auto text-[#333] p-3">
                <div class="text-center mb-8">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className=""></div>
                    <h2 className="-mt-4 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
                      Register
                    </h2>
                  </div>
                </div>
                <form>
                  <div class="grid sm:grid-cols-2 gap-y-5 gap-x-5">
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
                      <label class="text-sm mb-2 block">Middle Name</label>
                      <input
                        name="lname"
                        type="text"
                        class="input input-bordered  w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter last name"
                      />
                    </div>

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
                          Choose Department
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

                    {/* stud id */}
                    <div>
                      <label class="text-sm mb-2 block">Student Number</label>
                        <input
                          name="number"
                          type="number"
                          class="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                          placeholder="Enter student number"
                        />
                    </div>

                    {/* date hired */}
                    {/* <div>
                      <label class="text-sm mb-2 block">Date Hired</label>
                      <input
                        name="dateHired"
                        type="date"
                        class="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter date hired"
                      />
                    </div> */}

                    {/* password */}
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

                  <div className="form-control mt-4">
                      <label className="label cursor-pointer justify-start gap-3">
                          <span className="label-text">
                              By clicking Register, you are agreeing to COMEX CONNECT's{" "}
                              <a href="/terms-of-service" target="_blank" className="text-nucolor6">
                                  Terms of Service
                              </a>{" "}
                              and are acknowledging our Privacy Notice applies.
                          </span>
                      </label>
                  </div>


                  <div class="mt-4">
                    <button
                      onClick={login_btn}
                      className="btn flex w-full font-semibold justify-center rounded-md bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default Dnavbar;
