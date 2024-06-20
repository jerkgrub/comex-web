import axios from "axios";
import {
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
const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [newEvent, setNewEvent] = useState({
    event_title: "",
    event_organizer: "",
    event_description: "",
    event_image: "",
    event_date: "",
    event_time: "",
    event_dep: "",
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/event/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.Events && Array.isArray(data.Events)) {
          setEvents(data.Events);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleEditClick = (eventId) => {
    fetch(`http://localhost:8000/api/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedDate = new Date(data.Event.event_date)
          .toISOString()
          .split("T")[0];
        setSelectedEvent({ ...data.Event, event_date: formattedDate });
        document.getElementById("modal_edit").showModal();
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  };

  const updateEvent = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/api/event/update/${selectedEvent._id}`,
        selectedEvent
      )
      .then((response) => {
        console.log(response.data);
        document.getElementById("modal_edit").close();
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === selectedEvent._id ? response.data.updatedEvent : event
          )
        );
        setSelectedEvent(null);
      })
      .catch((error) => {
        console.error("Error updating event data:", error);
      });
  };

  const deleteEvent = () => {
    axios
      .delete(`http://localhost:8000/api/event/delete/${selectedEvent._id}`)
      .then((response) => {
        console.log(response.data);
        document.getElementById("modal_edit").close();
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== selectedEvent._id)
        );
        setSelectedEvent(null);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const handleCreateEvent = (e) => {
    console.log("choif");
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:8000/api/event/new", newEvent)
        .then((response) => {
          console.log(response.data);
          setEvents([...events, response.data.newEvent]);
          setNewEvent({
            event_title: "",
            event_organizer: "",
            event_description: "",
            event_image: "",
            event_date: "",
            event_time: "",
            event_dep: "",
          });
          setErrors({});
          document.getElementById("modal_create").close();
        })
        .catch((error) => {
          console.error("Error creating event:", error);
        });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!newEvent.event_title)
      formErrors.event_title = "Event title is required";
    if (!newEvent.event_organizer)
      formErrors.event_organizer = "Event organizer is required";
    if (!newEvent.event_description)
      formErrors.event_description = "Event description is required";
    if (!newEvent.event_image)
      formErrors.event_image = "Event image is required";
    if (!newEvent.event_date) formErrors.event_date = "Event date is required";
    if (!newEvent.event_time) formErrors.event_time = "Event time is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleViewAttendeesClick = (eventId) => {
    setSelectedEvent((prevEvent) => ({ ...prevEvent, _id: eventId })); // Set the selectedEvent ID
    fetch(`http://localhost:8000/api/event/get/attendee/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees || []); // Change to match backend response
        document.getElementById("modal_attendees").showModal();
      })
      .catch((error) => {
        console.error("Error fetching attendees data:", error);
      });
  };

  const handleDeleteAttendee = (eventId, email) => {
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
            `http://localhost:8000/api/event/attendee/${eventId}/${email}`
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

  const filteredEvents = events.filter((event) => {
    return (
      event &&
      event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === "All Departments" ||
        event.event_dep === selectedDepartment)
    );
  });

  return (
    <>
      <div className="bg-white flex p-12 justify-start w-full h-full">
        <div className="bg-white w-full">
          <div className="text-4xl text-blue mb-3 font-bold">Manage Events</div>

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
                        setSelectedDepartment("Senior High School Department")
                      }
                    >
                      Senior High School Department
                    </a>
                  </li>
                  {/* Add other department options as needed */}
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
                Total Events: {filteredEvents.length}
              </div>

              {/* create event button */}
              <div
                onClick={() =>
                  document.getElementById("modal_create").showModal()
                }
                className="btn mb-7 w-max hover:shadow-inner shadow-sm bg-nucolor3 shadow-md hover:bg-nucolor2 hover:shadow-md"
              >
                <CirclePlus className="w-5" />
                Create Event
              </div>
            </div>
          </div>

          <div className="">
            <div className="card bg-white max-w max-h shadow-xl">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Event Title</th>
                    <th>Organizer</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Respondents</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                      <tr className="hover:shadow-inner hover" key={event._id}>
                        <th>{index + 1}</th>
                        <td>{event.event_title}</td>
                        <td>{event.event_organizer}</td>
                        <td>{event.event_dep}</td>
                        <td>{formatDate(event.event_date)}</td>
                        <td>
                          <button
                            onClick={() => handleViewAttendeesClick(event._id)}
                            className="btn hover:shadow-inner bg-white hover:bg-gray-100"
                          >
                            <BookUser className="w-4" />
                            View Respondents
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleEditClick(event._id)}
                            className="btn hover:shadow-inner bg-white hover:bg-gray-100"
                          >
                            <PencilIcon className="w-4" />
                            Edit Event
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No events found</td>
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
                Edit Event
              </div>
              <form className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Event Title</label>
                  <input
                    className="input w-full p-2 border border-gray-300 "
                    type="text"
                    name="event_title"
                    value={selectedEvent?.event_title || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        event_title: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Organizer</label>
                  <input
                    className="input  w-full p-2 border border-gray-300 "
                    type="text"
                    name="event_organizer"
                    value={selectedEvent?.event_organizer || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        event_organizer: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">
                    Event Department
                  </label>
                  <select
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.event_dep ? "border-red-500" : ""
                    }`}
                    name="event_dep"
                    value={selectedEvent?.event_dep || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        event_dep: e.target.value,
                      })
                    }
                  >
                    <option disabled selected={!selectedEvent?.event_dep}>
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
                  {errors.event_dep && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.event_dep}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    className="textarea text-base w-full p-2 border border-gray-300 "
                    name="event_description"
                    value={selectedEvent?.event_description || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        event_description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold ">Image URL</label>
                  <input
                    className="input w-full p-2 border border-gray-300 "
                    type="text"
                    name="event_image"
                    value={selectedEvent?.event_image || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        event_image: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Event Date</label>
                  <input
                    className="w-full p-2 border border-gray-300 "
                    type="date"
                    name="event_date"
                    value={selectedEvent?.event_date || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        event_date: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Event Time</label>
                  <input
                    className="w-full p-2 border border-gray-300 "
                    type="time"
                    name="event_time"
                    value={selectedEvent?.event_time || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        event_time: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    className="btn text-black hover:text-gray-300 bg-nucolor3 hover:bg-nucolor2 hover:bg-blue-800"
                    onClick={updateEvent}
                  >
                    <Save className="w-4" />
                    Save Changes
                  </button>
                  <button
                    className="btn bg-red-700 hover:bg-red-300 text-white"
                    onClick={deleteEvent}
                  >
                    <Trash2 className="w-4" />
                    Delete Event
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
                Create Event
              </div>
              <form className="space-y-4" onSubmit={handleCreateEvent}>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Event Title</label>
                  <input
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.event_title ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="event_title"
                    value={newEvent.event_title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, event_title: e.target.value })
                    }
                    placeholder="Enter event title"
                  />
                  {errors.event_title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.event_title}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Organizer</label>
                  <input
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.event_organizer ? "border-red-500" : ""
                    }`}
                    type="text"
                    name="event_organizer"
                    value={newEvent.event_organizer}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        event_organizer: e.target.value,
                      })
                    }
                    placeholder="Enter organizer name"
                  />
                  {errors.event_organizer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.event_organizer}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">
                    Event Department
                  </label>
                  <select
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.event_dep ? "border-red-500" : ""
                    }`}
                    name="event_dep"
                    value={newEvent.event_dep}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        event_dep: e.target.value,
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
                    <option value="Senior High School Department">
                      Senior High School Department
                    </option>
                  </select>
                  {errors.event_organizer && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.event_dep}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    className={`textarea w-full p-2 border border-gray-300 rounded-md ${
                      errors.event_description ? "border-red-500" : ""
                    }`}
                    name="event_description"
                    value={newEvent.event_description}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        event_description: e.target.value,
                      })
                    }
                    placeholder="Enter event description"
                  />
                  {errors.event_description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.event_description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Image URL</label>
                  <input
                    type="text"
                    name="event_image"
                    value={newEvent.event_image}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, event_image: e.target.value })
                    }
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.event_image ? "border-red-500" : ""
                    }`}
                    placeholder="Enter image URL"
                  />
                  {errors.event_image && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.event_image}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Event Date</label>
                  <input
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.event_date ? "border-red-500" : ""
                    }`}
                    type="date"
                    name="event_date"
                    value={newEvent.event_date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, event_date: e.target.value })
                    }
                    placeholder="Enter event date"
                  />
                  {errors.event_date && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.event_date}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-semibold">Event Time</label>
                  <input
                    className={`input w-full p-2 border border-gray-300 rounded-md ${
                      errors.event_time ? "border-red-500" : ""
                    }`}
                    type="time"
                    name="event_time"
                    value={newEvent.event_time}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, event_time: e.target.value })
                    }
                    placeholder="Enter event time"
                  />
                  {errors.event_time && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.event_time}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn bg-nucolor3 hover:bg-nucolor2 text-black hover:text-gray-500 hover:shadow-md"
                    onClick={handleCreateEvent}
                  >
                    Create Event
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
                            selectedEvent._id,
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

export default Events;
