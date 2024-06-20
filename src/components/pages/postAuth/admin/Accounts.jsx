import axios from "axios";
import { Blinds, PencilIcon, Save, Sigma, SquareLibrary, Trash2, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
                  <SquareLibrary className="w-4 h-4"/>
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
                  <Blinds className="w-4 h-4"/>
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
                <Users className="w-4 h-4"/>
                Total Users: {filteredAccounts.length}
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
      </div>
    </>
  );
};

export default Accounts;
