import axios from "axios";
import {
  Archive,
  BookUser,
  CalendarDays,
  CirclePlus,
  PencilIcon,
  Plus,
  Save,
  SquareLibrary,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [newActivity, setNewActivity] = useState({
    activity_title: "",
    activity_organizer: "",
    activity_description: "",
    activity_image: "",
    activity_date: "",
    activity_time: "",
    activity_dep: "",
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/activity/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.Activities && Array.isArray(data.Activities)) {
          setActivities(data.Activities);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  const handleEditClick = (activityId) => {
    fetch(`http://localhost:8000/api/activity/${activityId}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedDate = new Date(data.Activity.activity_date)
          .toISOString()
          .split("T")[0];
        setSelectedActivity({ ...data.Activity, activity_date: formattedDate });
        document.getElementById("modal_edit").showModal();
      })
      .catch((error) => {
        console.error("Error fetching activity data:", error);
      });
  };

  const updateActivity = (e) => {
    e.practivityDefault();
    axios
      .put(
        `http://localhost:8000/api/activity/update/${selectedActivity._id}`,
        selectedActivity
      )
      .then((response) => {
        console.log(response.data);
        document.getElementById("modal_edit").close();
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity._id === selectedActivity._id ? response.data.updatedActivity : activity
          )
        );
        setSelectedActivity(null);
      })
      .catch((error) => {
        console.error("Error updating activity data:", error);
      });
  };

  const deleteActivity = () => {
    axios
      .delete(`http://localhost:8000/api/activity/delete/${selectedActivity._id}`)
      .then((response) => {
        console.log(response.data);
        document.getElementById("modal_edit").close();
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity._id !== selectedActivity._id)
        );
        setSelectedActivity(null);
      })
      .catch((error) => {
        console.error("Error deleting activity:", error);
      });
  };

  const handleCreateActivity = (e) => {
    console.log("choif");
    e.practivityDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:8000/api/activity/new", newActivity)
        .then((response) => {
          console.log(response.data);
          setActivities([...activities, response.data.newActivity]);
          setNewActivity({
            activity_title: "",
            activity_organizer: "",
            activity_description: "",
            activity_image: "",
            activity_date: "",
            activity_time: "",
            activity_dep: "",
          });
          setErrors({});
          document.getElementById("modal_create").close();
        })
        .catch((error) => {
          console.error("Error creating activity:", error);
        });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!newActivity.activity_title)
      formErrors.activity_title = "Activity title is required";
    if (!newActivity.activity_organizer)
      formErrors.activity_organizer = "Activity organizer is required";
    if (!newActivity.activity_description)
      formErrors.activity_description = "Activity description is required";
    if (!newActivity.activity_image)
      formErrors.activity_image = "Activity image is required";
    if (!newActivity.activity_date) formErrors.activity_date = "Activity date is required";
    if (!newActivity.activity_time) formErrors.activity_time = "Activity time is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };  

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleViewAttendeesClick = (activityId) => {
    setSelectedActivity((prevActivity) => ({ ...prevActivity, _id: activityId })); // Set the selectedActivity ID
    fetch(`http://localhost:8000/api/activity/get/attendee/${activityId}`)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees || []); // Change to match backend response
        document.getElementById("modal_attendees").showModal();
      })
      .catch((error) => {
        console.error("Error fetching attendees data:", error);
      });
  };

  const handleDeleteAttendee = (activityId, email) => {
    Swal.fire({
      target: document.getElementById("modal_attendees"),
      title: "Are you sure?",
      text: "Do you really want to remove this attendee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:8000/api/activity/attendee/${activityId}/${email}`
          )
          .then((response) => {
            setAttendees((prevAttendees) =>
              prevAttendees.filter((attendee) => attendee.at_email !== email)
            );
          })
          .catch((error) => {
            console.error("Error deleting attendee:", error);
            Swal.fire(
              "Error!",
              "There was an error deleting the attendee.",
              "error"
            );
          });
      }
    });
  };

  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");

  const filteredActivities = activities.filter((activity) => {
    return (
      activity &&
      activity.activity_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === "All Departments" ||
        activity.activity_dep === selectedDepartment)
    );
  });

  return (
    <>
      <div className="bg-white flex p-12 justify-start w-full h-full">
        <div className="bg-white w-full">
          <div className="text-4xl text-blue mb-3 font-bold">Manage Activities</div>

          <div className="form-control">
            <div className="flex input-group gap-3 justify-center items-">
              {/* filter 1 */}
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
                        setSelectedDepartment("Community Extension Office")
                      }
                    >
                      Community Extension Office
                    </a>
                  </li>
                  {/* Add other department options as needed */}
                </ul>
              </div>

              {/* filter 1 */}
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
                    {/* {selectedDepartment} */}
                    Type of Activity
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
                >
                  <li>
                    <a onClick={() => setSelectedDepartment("All Departments")}>
                      Type of Activity
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment("College of Dentistry")
                      }
                    >
                      Outreach
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        setSelectedDepartment("School of Optometry")
                      }
                    >
                      Institutional
                    </a>
                  </li>
                  
                </ul>
              </div>

              {/* search */}
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered mb-7 w-full hover:shadow-inner shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* add total users here */}
              <div className="btn no-animation">
                <CalendarDays className="w-4 h-4" />
                Total Activities: {filteredActivities.length}
              </div>

              {/* create activity button */}
              <div
                onClick={() =>
                  document.getElementById("modal_create").showModal()
                }
                className="btn mb-7 w-max hover:shadow-inner shadow-sm bg-nucolor3 shadow-md hover:bg-nucolor2 hover:shadow-md"
              >
                <CirclePlus className="w-5" />
                Propose Activity
              </div>
            </div>
          </div>

          <div className="">
            <div className="card bg-white max-w max-h shadow-xl">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Activity Title</th>
                    <th>Organizer</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Respondents</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity, index) => (
                      <tr className="hover:shadow-inner hover" key={activity._id}>
                        <th>{index + 1}</th>
                        <td>{activity.activity_title}</td>
                        <td>{activity.activity_organizer}</td>
                        <td>{activity.activity_dep}</td>
                        <td>{formatDate(activity.activity_date)}</td>
                        <td>
                          <button
                            onClick={() => handleViewAttendeesClick(activity._id)}
                            className="btn hover:shadow-inner bg-white hover:bg-gray-100"
                          >
                            <BookUser className="w-4" />
                            View Respondents
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleEditClick(activity._id)}
                            className="btn hover:shadow-inner bg-white hover:bg-gray-100"
                          >
                            <PencilIcon className="w-4" />
                            Edit Activity
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No activities found</td>
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
              <div className="text-4xl font-semibold text-center mb-7">
                Edit Activity
              </div>
              <form className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Activity Title</label>
                  <input
                    className="input w-full p-2 border border-gray-300 "
                    type="text"
                    name="activity_title"
                    value={selectedActivity?.activity_title || ""}
                    onChange={(e) =>
                      setSelectedActivity({
                        ...selectedActivity,
                        activity_title: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Organizer</label>
                  <input
                    className="input  w-full p-2 border border-gray-300 "
                    type="text"
                    name="activity_organizer"
                    value={selectedActivity?.activity_organizer || ""}
                    onChange={(e) =>
                      setSelectedActivity({
                        ...selectedActivity,
                        activity_organizer: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">
                    Activity Department
                  </label>
                  <select
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_dep ? "border-red-500" : ""
                    }`}
                    name="activity_dep"
                    value={selectedActivity?.activity_dep || ""}
                    onChange={(e) =>
                      setSelectedActivity({
                        ...selectedActivity,
                        activity_dep: e.target.value,
                      })
                    }
                  >
                    <option disabled selected={!selectedActivity?.activity_dep}>
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
                    <option value="Community Extension Office">
                      Community Extension Office
                    </option>
                    
                  </select>
                  {errors.activity_dep && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_dep}
                    </p>
                  )}
                </div>

                {/* type of activity */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">
                  Activity Type
                  </label>
                  <select
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_dep ? "border-red-500" : ""
                    }`}
                    name="activity_dep"
                    value={newActivity.activity_dep}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        activity_dep: e.target.value,
                      })
                    }
                  >
                    <option disabled selected>
                      Choose Department
                    </option>
                    <option value="College of Dentistry">
                      Outreach
                    </option>
                    <option value="School of Optometry">
                      Institutional
                    </option>
                    <option value="School of Health Sciences">
                      Sustainable
                    </option>
                  </select>
                  {errors.activity_organizer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_dep}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    className="textarea text-base w-full p-2 border border-gray-300 "
                    name="activity_description"
                    value={selectedActivity?.activity_description || ""}
                    onChange={(e) =>
                      setSelectedActivity({
                        ...selectedActivity,
                        activity_description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold ">Image URL</label>
                  <input
                    className="input w-full p-2 border border-gray-300 "
                    type="text"
                    name="activity_image"
                    value={selectedActivity?.activity_image || ""}
                    onChange={(e) =>
                      setSelectedActivity({
                        ...selectedActivity,
                        activity_image: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Activity Date</label>
                  <input
                    className="w-full p-2 border border-gray-300 "
                    type="date"
                    name="activity_date"
                    value={selectedActivity?.activity_date || ""}
                    onChange={(e) =>
                      setSelectedActivity({
                        ...selectedActivity,
                        activity_date: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Activity Time</label>
                  <input
                    className="w-full p-2 border border-gray-300 "
                    type="time"
                    name="activity_time"
                    value={selectedActivity?.activity_time || ""}
                    onChange={(e) =>
                      setSelectedActivity({
                        ...selectedActivity,
                        activity_time: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    className="btn text-black hover:text-gray-300 bg-nucolor3 hover:bg-nucolor2 hover:bg-blue-800"
                    onClick={updateActivity}
                  >
                    <Save className="w-4" />
                    Save Changes
                  </button>
                  <button
                    className="btn bg-red-700 hover:bg-red-300 text-white"
                    onClick={deleteActivity}
                  >
                    <Archive className="w-4" />
                    Archive Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="modal_create" className="modal transition-none text-black">
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                type="button"
                onClick={() => document.getElementById("modal_create").close()}
              >
                ✕
              </button>
            </form>

            <div className="max-w-4xl mx-auto text-[#333] p-3">
              <div className="text-4xl font-semibold text-center mb-7">
                Propose Activity
              </div>
              <form className="space-y-4" onSubmit={handleCreateActivity}>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Activity Title</label>
                  <input
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_title ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="activity_title"
                    value={newActivity.activity_title}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, activity_title: e.target.value })
                    }
                    placeholder="Enter activity title"
                  />
                  {errors.activity_title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_title}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Organizer</label>
                  <input
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_organizer ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="activity_organizer"
                    value={newActivity.activity_organizer}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        activity_organizer: e.target.value,
                      })
                    }
                    placeholder="Enter organizer name"
                  />
                  {errors.activity_organizer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_organizer}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">
                    Activity Department
                  </label>
                  <select
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_dep ? "border-red-500" : ""
                    }`}
                    name="activity_dep"
                    value={newActivity.activity_dep}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        activity_dep: e.target.value,
                      })
                    }
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
                    <option value="Community Extension Office">
                      Community Extension Office
                    </option>
                  </select>
                  {errors.activity_organizer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_dep}
                    </p>
                  )}
                </div>

                {/* type of activity */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">
                  Activity Type
                  </label>
                  <select
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_dep ? "border-red-500" : ""
                    }`}
                    name="activity_dep"
                    value={newActivity.activity_dep}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        activity_dep: e.target.value,
                      })
                    }
                  >
                    <option disabled selected>
                      Choose Department
                    </option>
                    <option value="College of Dentistry">
                      Outreach
                    </option>
                    <option value="School of Optometry">
                      Institutional
                    </option>
                    <option value="School of Health Sciences">
                      Sustainable
                    </option>
                  </select>
                  {errors.activity_organizer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_dep}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    className={`textarea w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_description ? "border-red-500" : ""
                    }`}
                    name="activity_description"
                    value={newActivity.activity_description}
                    onChange={(e) =>
                      setNewActivity({
                        ...newActivity,
                        activity_description: e.target.value,
                      })
                    }
                    placeholder="Enter activity description"
                  />
                  {errors.activity_description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Image URL</label>
                  <input
                    type="text"
                    name="activity_image"
                    value={newActivity.activity_image}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, activity_image: e.target.value })
                    }
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_image ? "border-red-500" : ""
                    }`}
                    placeholder="Enter image URL"
                  />
                  {errors.activity_image && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_image}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Activity Date</label>
                  <input
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_date ? "border-red-500" : ""
                    }`}
                    type="date"
                    name="activity_date"
                    value={newActivity.activity_date}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, activity_date: e.target.value })
                    }
                    placeholder="Enter activity date"
                  />
                  {errors.activity_date && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_date}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Activity Time</label>
                  <input
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.activity_time ? "border-red-500" : ""
                    }`}
                    type="time"
                    name="activity_time"
                    value={newActivity.activity_time}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, activity_time: e.target.value })
                    }
                    placeholder="Enter activity time"
                  />
                  {errors.activity_time && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.activity_time}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn bg-nucolor3 hover:bg-nucolor2 text-black hover:text-gray-500 hover:shadow-md"
                    onClick={handleCreateActivity}
                  >
                    Create Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>

        <dialog
          id="modal_attendees"
          className="modal transition-none text-black"
        >
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="max-w-4xl mx-auto text-[#333] p-3">
              <div className="text-4xl font-bold text-center mb-7">
                Total Respondents: {attendees.length}
              </div>
              {attendees.length > 0 ? (
                <ul className="space-y-3">
                  {attendees.map((attendee) => (
                    <li
                      key={attendee._id}
                      className="hover:shadow-inner shadow-md flex justify-between items-center p-2 border border-gray-300 "
                    >
                      <div>
                        <div className="font-semibold">
                          {attendee.at_fname} {attendee.at_lname}
                        </div>
                        <div className="text-sm">{attendee.at_email}</div>
                      </div>
                      <button
                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                        onClick={() =>
                          handleDeleteAttendee(
                            selectedActivity._id,
                            attendee.at_email
                          )
                        }
                      >
                        <Trash2 className="w-4" />
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-500">
                  No attendees yet.
                </div>
              )}
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Activities;
