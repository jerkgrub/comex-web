import axios from "axios";
import {
  Blinds,
  CirclePlus,
  PencilIcon,
  Save,
  Sigma,
  SquareLibrary,
  Trash2,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedUsertype, setSelectedUsertype] = useState("All Usertypes");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/acc/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.Users && Array.isArray(data.Users)) {
          setAccounts(data.Users);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  }, []);

  const filteredAccounts = accounts.filter((account) => {
    const fullName =
      `${account.u_fname} ${account.u_mname} ${account.u_lname}`.toLowerCase();
    const matchesSearchTerm = fullName.includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      account.u_dep === selectedDepartment;
    const matchesUsertype =
      selectedUsertype === "All Usertypes" ||
      account.usertype === selectedUsertype;
    return matchesSearchTerm && matchesDepartment && matchesUsertype;
  });

  const handleEditClick = (accountId) => {
    fetch(`http://localhost:8000/api/acc/${accountId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedUser(data.User);
        document.getElementById("modal_edit").showModal();
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const updateUser = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/api/acc/update/${selectedUser._id}`,
        selectedUser
      )
      .then((response) => {
        console.log(response.data);
        document.getElementById("modal_edit").close();
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
            account._id === selectedUser._id
              ? response.data.updatedUser
              : account
          )
        );
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const deleteUser = () => {
    axios
      .delete(`http://localhost:8000/api/acc/delete/${selectedUser._id}`)
      .then((response) => {
        console.log(response.data);
        document.getElementById("modal_edit").close();
        setAccounts((prevAccounts) =>
          prevAccounts.filter((account) => account._id !== selectedUser._id)
        );
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };


  const [isChecked, setIsChecked] = useState(false);

  // terms and service checkbox
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // for password visibility
  const [showPassword, setShowPassword] = useState(false);
  // login data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("Client");

  // register data
  const [r_usertype, setRusertype] = useState("");
  const [r_fname, setRfname] = useState("");
  const [r_mname, setRmname] = useState("");
  const [r_lname, setRlname] = useState("");
  const [r_mnum, setRmnum] = useState("");
  const [r_dep, setRdep] = useState("");
  const [r_studnum, setRstudnum] = useState("");
  const [r_datehired, setRdatehired] = useState("");
  const [r_email, setRemail] = useState("");
  const [r_password, setRpassword] = useState("");
  const [r_confirmPassword, setRconfirmpassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!r_usertype || r_usertype === "What are you?")
      formErrors.r_usertype = "Usertype is required";
    if (!r_fname) formErrors.r_fname = "First Name is required";
    if (!r_mname) formErrors.r_mname = "Middle Name is required";
    if (!r_lname) formErrors.r_lname = "Last Name is required";
    if (!r_email || !r_email.endsWith("nu-moa.edu.ph"))
      formErrors.r_email =
        "Valid email is required (Must be nu-moa.edu.ph account)";
    if (!r_mnum) formErrors.r_mnum = "Mobile Number is required";
    if (!r_dep || r_dep === "Choose Department")
      formErrors.r_dep = "Department is required";
    if (!r_studnum) formErrors.r_studnum = "Student Number is required";
    if (!r_datehired) formErrors.r_datehired = "Date Hired is required";
    if (!r_password) formErrors.r_password = "Password is required";
    if (r_password !== r_confirmPassword)
      formErrors.r_confirmPassword = "Passwords must match";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const addUser = (event) => {
    event.preventDefault();
    console.log("choif");
    if (!validateForm()) {
      return;
    }
    const newAcc = {
      usertype: r_usertype,
      u_fname: r_fname,
      u_mname: r_mname,
      u_lname: r_lname,
      u_mnum: r_mnum,
      u_dep: r_dep,
      u_studnum: r_studnum,
      u_datehired: r_datehired,
      email: r_email,
      password: r_password,
    };

    axios
      .post("http://localhost:8000/api/acc/new", newAcc)
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          Swal.fire({
            title: "Error!",
            text: response.data.error,
            icon: "error",
            target: document.getElementById("my_modal_2"),
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Account created successfully",
            icon: "success",
          });
          document.getElementById("my_modal_2").close();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error creating the account.",
          icon: "error",
          target: document.getElementById("my_modal_2"),
        });
      });
  };

  return (
    <>
      <div className="bg-white flex p-12 justify-start w-full h-full">
        <div className="bg-white w-full">
          <div className="text-4xl text-blue mb-3 font-bold">Manage Users</div>

          <div className="form-control">
            <div className="flex input-group gap-3 justify-center items-">
              {/* department filter */}
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <div className="flex flex-row gap-2">
                    <SquareLibrary className="w-4 h-4" />
                    {selectedDepartment}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
                >
                  <li>
                    <a onClick={() => setSelectedDepartment("All Departments")}>
                      All Departments
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment("College of Dentistry")
                      }
                    >
                      College of Dentistry
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment("School of Optometry")
                      }
                    >
                      School of Optometry
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment("School of Health Sciences")
                      }
                    >
                      School of Health Sciences
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment(
                          "School of Accountancy and Management"
                        )
                      }
                    >
                      School of Accountancy and Management
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment(
                          "School of Information Technology"
                        )
                      }
                    >
                      School of Information Technology
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment("School of Arts and Sciences")
                      }
                    >
                      School of Arts and Sciences
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment("School of Architecture")
                      }
                    >
                      School of Architecture
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment("Senior High School Department")
                      }
                    >
                      Senior High School Department
                    </a>
                  </li>
                </ul>
              </div>

              {/* usertype filter */}
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <div className="flex flex-row gap-2">
                    <Blinds className="w-4 h-4" />
                    {selectedUsertype}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
                >
                  <li>
                    <a onClick={() => setSelectedUsertype("All Usertypes")}>
                      All Usertypes
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSelectedUsertype("student")}>
                      Student
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSelectedUsertype("faculty")}>
                      Faculty
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSelectedUsertype("faculty")}>
                      Dean
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSelectedUsertype("asp")}>ASP</a>
                  </li>
                  <li>
                    <a onClick={() => setSelectedUsertype("ntp")}>NTP</a>
                  </li>
                </ul>
              </div>

              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered mb-7 w-full hover:shadow-inner shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* add total users here */}
              <div className="btn no-animation">
                <Users className="w-4 h-4" />
                Total Users: {filteredAccounts.length}
              </div>

              {/* create event button */}
              <div
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
                className="btn mb-7 w-max hover:shadow-inner shadow-sm bg-nucolor3 shadow-md hover:bg-nucolor2 hover:shadow-md"
              >
                <CirclePlus className="w-5" />
                Create User
              </div>
            </div>
          </div>

          <div className="">
            <div className="card bg-white max-w max-h shadow-xl">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>User Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account, index) => (
                      <tr
                        className="hover:shadow-inner hover"
                        key={account._id}
                      >
                        <th>{index + 1}</th>
                        <td>
                          {account.u_fname} {account.u_mname} {account.u_lname}
                        </td>
                        <td>{account.email}</td>
                        <td>{account.u_dep}</td>
                        <td>{account.usertype}</td>
                        <td>
                          <button
                            onClick={() => handleEditClick(account._id)}
                            className="btn  hover:shadow-inner bg-white hover:bg-gray-100"
                          >
                            <PencilIcon className="w-4" />
                            Edit User
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No accounts found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <dialog id="modal_edit" className="modal transition-none text-black">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="max-w-4xl mx-auto text-[#333] p-3">
              <div className="text-center mb-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className=""></div>
                  <h2 className="-mt-4 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
                    Edit User
                  </h2>
                </div>
              </div>
              {selectedUser && (
                <form onSubmit={updateUser} className="space-y-2">
                  <div>
                    <label
                      htmlFor="u_fname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="u_fname"
                        name="u_fname"
                        type="text"
                        value={selectedUser.u_fname}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_fname: e.target.value,
                          })
                        }
                        required
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="u_mname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Middle Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="u_mname"
                        name="u_mname"
                        type="text"
                        value={selectedUser.u_mname}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_mname: e.target.value,
                          })
                        }
                        required
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="u_lname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="u_lname"
                        name="u_lname"
                        type="text"
                        value={selectedUser.u_lname}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_lname: e.target.value,
                          })
                        }
                        required
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={selectedUser.email}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            email: e.target.value,
                          })
                        }
                        required
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="u_dep"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Department
                    </label>
                    <div className="mt-2">
                      <input
                        id="u_dep"
                        name="u_dep"
                        type="text"
                        value={selectedUser.u_dep}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_dep: e.target.value,
                          })
                        }
                        required
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="usertype"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      User Type
                    </label>
                    <div className="mt-2">
                      <input
                        id="usertype"
                        name="usertype"
                        type="text"
                        value={selectedUser.usertype}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            usertype: e.target.value,
                          })
                        }
                        required
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-7 flex flex-row ">
                    <button
                      type="submit"
                      className="ml-auto mr-2 btn flex w-max text-sm justify-end rounded-md hover:shadow-inner bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                    >
                      <Save className="w-5" />
                      Save Edits
                    </button>

                    <button
                      onClick={deleteUser}
                      className=" btn flex w-max text-sm justify-center rounded-md bg-red-700 hover:bg-red-400 px-3 py-1.5 text-lg leading-6 text-gray-100 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                    >
                      <Trash2 className="w-5" />
                      Archive User
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </dialog>

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
            <div className="max-w-4xl mx-auto text-[#333] p-3">
              <div className="text-center mb-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className=""></div>
                  <h2 className="-mt-4 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
                    Register
                  </h2>
                </div>
              </div>
              <form>
                <div className="grid sm:grid-cols-2 gap-y-5 gap-x-5">
                  <label className="block text-sm">
                    <p className="mb-2">Register As</p>
                    <select
                      defaultValue={"What are you?"}
                      onChange={(e) => {
                        setRusertype(e.target.value);
                      }}
                      className={`font-sans select select-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_usertype ? "border-red-500" : ""
                      }`}
                    >
                      <option disabled selected>
                        What are you?
                      </option>
                      <option value={"student"}>Student</option>
                      <option value={"faculty"}>Faculty</option>
                      <option value={"asp"}>
                        ASP (Admin Support Personnel)
                      </option>
                      <option value={"ntp"}>
                        NTP (Non Teaching Personnel)
                      </option>
                    </select>
                    {errors.r_usertype && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_usertype}
                      </p>
                    )}
                  </label>

                  <div>
                    <label className="text-sm mb-2 block">Middle Name</label>
                    <input
                      name="mname"
                      type="text"
                      onChange={(e) => {
                        setRmname(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_mname ? "border-red-500" : ""
                      }`}
                      placeholder="Enter middle name"
                    />
                    {errors.r_mname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_mname}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">First Name</label>
                    <input
                      name="fname"
                      type="text"
                      onChange={(e) => {
                        setRfname(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_fname ? "border-red-500" : ""
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.r_fname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_fname}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Last Name</label>
                    <input
                      name="lname"
                      type="text"
                      onChange={(e) => {
                        setRlname(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_lname ? "border-red-500" : ""
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.r_lname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_lname}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Email Address</label>
                    <input
                      name="email"
                      type="text"
                      onChange={(e) => {
                        setRemail(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_email ? "border-red-500" : ""
                      }`}
                      placeholder="Enter email"
                    />
                    {errors.r_email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">Mobile Number</label>
                    <input
                      name="number"
                      type="number"
                      onChange={(e) => {
                        setRmnum(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_mnum ? "border-red-500" : ""
                      }`}
                      placeholder="Enter mobile number"
                    />
                    {errors.r_mnum && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_mnum}
                      </p>
                    )}
                  </div>
                  <label className="block text-sm">
                    <p className="mb-2">Department</p>
                    <select
                      onChange={(e) => {
                        setRdep(e.target.value);
                      }}
                      className={`font-sans select select-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_mnum ? "border-red-500" : ""
                      }`}
                    >
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
                    {errors.r_dep && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_dep}
                      </p>
                    )}
                  </label>

                  {/* stud id */}
                  <div>
                    <label className="text-sm mb-2 block">Student Number</label>
                    <input
                      name="studnum"
                      type="string"
                      onChange={(e) => {
                        setRstudnum(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_studnum ? "border-red-500" : ""
                      }`}
                      placeholder="Enter student number"
                    />
                    {errors.r_studnum && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_studnum}
                      </p>
                    )}
                  </div>

                  {/* date hired */}
                  <div>
                    <label className="text-sm mb-2 block">Date Hired</label>
                    <input
                      name="dateHired"
                      type="date"
                      onChange={(e) => {
                        setRdatehired(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_datehired ? "border-red-500" : ""
                      }`}
                      placeholder="Enter date hired"
                    />
                    {errors.r_datehired && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_datehired}
                      </p>
                    )}
                  </div>

                  {/* password */}
                  <div>
                    <label className="text-sm mb-2 block">Password</label>
                    <input
                      name="password"
                      type="password"
                      onChange={(e) => {
                        setRpassword(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_password ? "border-red-500" : ""
                      }`}
                      placeholder="Enter password"
                    />
                    {errors.r_password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm mb-2 block">
                      Confirm Password
                    </label>
                    <input
                      name="cpassword"
                      type="password"
                      onChange={(e) => {
                        setRconfirmpassword(e.target.value);
                      }}
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${
                        errors.r_confirmPassword ? "border-red-500" : ""
                      }`}
                      placeholder="Enter confirm password"
                    />
                    {errors.r_confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.r_confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-control mt-4">
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="checkbox mr-2"
                      onChange={handleCheckboxChange}
                    />
                    <label className="label cursor-pointer justify-start gap-3">
                      <span className="label-text">
                        By clicking Register, you are agreeing to COMEX
                        CONNECT's{" "}
                        <a
                          href="/terms-of-service"
                          target="_blank"
                          className="text-nucolor6"
                        >
                          Terms of Service
                        </a>{" "}
                        and are acknowledging our Privacy Notice applies.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={addUser}
                    className={`btn flex w-full font-semibold justify-center rounded-md bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm ${
                      isChecked ? "hover:bg-lightyellow hover:text-white3" : ""
                    }`}
                    disabled={!isChecked}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Accounts;
