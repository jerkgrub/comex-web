import axios from "axios";
import { PencilIcon, Save, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    return fullName.includes(searchTerm.toLowerCase());
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
        <div className="bg-white w-full" >
          <div className="text-4xl text-blue mb-3 font-bold">Manage Users</div>

          <div className="form-control ">
            <div className="input-group flex">
              {/* <div className="card shadow-lg h-full">
                Total COMEX CONNECT Users:
              </div> */}
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered mb-7 w-full hover:shadow-inner shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                      <td colSpan="5">No accounts found</td>
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
                <form onSubmit={updateUser}>
                  <div className="grid sm:grid-cols-2 gap-y-5 gap-x-5">
                    <label className="block text-sm">
                      <p className="mb-2">User Type</p>
                      <select
                        defaultValue={selectedUser.usertype}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            usertype: e.target.value,
                          })
                        }
                        className="font-sans select select-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                      >
                        <option disabled>What are you?</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="asp">
                          ASP (Admin Support Personnel)
                        </option>
                        <option value="ntp">
                          NTP (Non Teaching Personnel)
                        </option>
                      </select>
                    </label>

                    <div>
                      <label className="text-sm mb-2 block">Middle Name</label>
                      <input
                        name="lname"
                        type="text"
                        value={selectedUser.u_mname}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_mname: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter middle name"
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">First Name</label>
                      <input
                        name="name"
                        type="text"
                        value={selectedUser.u_fname}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_fname: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter first name"
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">Last Name</label>
                      <input
                        name="lname"
                        type="text"
                        value={selectedUser.u_lname}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_lname: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter last name"
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="text"
                        value={selectedUser.email}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            email: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block">
                        Mobile Number
                      </label>
                      <input
                        name="number"
                        type="number"
                        value={selectedUser.u_mnum}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_mnum: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter mobile number"
                      />
                    </div>
                    <label className="block text-sm">
                      <p className="mb-2">Department</p>
                      <select
                        value={selectedUser.u_dep}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_dep: e.target.value,
                          })
                        }
                        className="font-sans select select-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                      >
                        <option disabled>Choose Department</option>
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
                        <option value="School of Engineering">
                          School of Engineering
                        </option>
                        <option value="College of Arts and Sciences">
                          College of Arts and Sciences
                        </option>
                      </select>
                    </label>

                    <div>
                      <label className="text-sm mb-2 block">
                        Student Number
                      </label>
                      <input
                        name="studentNum"
                        type="text"
                        value={selectedUser.u_studnum}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_studnum: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter student number"
                      />
                    </div>

                    
                  </div>

                  <div>
                      <label className="mt-3 text-sm mb-2 block">Date Hired</label>
                      <input
                        name="dateHired"
                        type="date"
                        value={selectedUser.u_datehired}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            u_datehired: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter date hired"
                      />
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
                      Delete User
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
