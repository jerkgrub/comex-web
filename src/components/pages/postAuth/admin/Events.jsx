import axios from "axios";
import { CirclePlus, PencilIcon, Save, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    event_title: '',
    event_organizer: '',
    event_description: '',
    event_image: '',
    event_date: '',
    event_time: ''
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredEvents = events.filter((event) => {
    return event.event_title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEditClick = (eventId) => {
    fetch(`http://localhost:8000/api/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedDate = new Date(data.Event.event_date).toISOString().split('T')[0];
        setSelectedEvent({...data.Event, event_date: formattedDate});
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
            event._id === selectedEvent._id
              ? response.data.updatedEvent
              : event
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
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:8000/api/event/new', newEvent)
        .then((response) => {
          console.log(response.data);
          setEvents([...events, response.data.newEvent]);
          setNewEvent({
            event_title: '',
            event_organizer: '',
            event_description: '',
            event_image: '',
            event_date: '',
            event_time: ''
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
    if (!newEvent.event_title) formErrors.event_title = "Event title is required";
    if (!newEvent.event_organizer) formErrors.event_organizer = "Event organizer is required";
    if (!newEvent.event_description) formErrors.event_description = "Event description is required";
    if (!newEvent.event_image) formErrors.event_image = "Event image is required";
    if (!newEvent.event_date) formErrors.event_date = "Event date is required";
    if (!newEvent.event_time) formErrors.event_time = "Event time is required";
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="bg-white flex p-12 justify-start w-full h-full">
        <div className="bg-white w-full">
          <div className="text-4xl text-blue mb-3 font-bold">Manage Events</div>

          <div className="form-control ">
            <div className="input-group flex gap-3">
                {/* search */}
              <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered mb-7 w-full hover:shadow-inner shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* create event button */}
              <div
                  onClick={() => document.getElementById("modal_create").showModal()}
                  className="btn mb-7 w-max hover:shadow-inner shadow-sm bg-nucolor3 shadow-md hover:bg-nucolor2 hover:shadow-md"
              >
                <CirclePlus className="w-5"/>
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
                    <th>Event Organizer</th>
                    <th>Event Date</th>
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
                        <td>{formatDate(event.event_date)}</td>
                        <td>
                          <button
                            onClick={() => handleEditClick(event._id)}
                            className="btn hover:shadow-inner bg-white hover:bg-gray-100"
                          >
                            Edit Event
                            <PencilIcon className="w-4"/>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No events found</td>
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
                    Edit Event
                  </h2>
                </div>
              </div>
              {selectedEvent && (
                <form onSubmit={updateEvent}>
                  <div className="grid sm:grid-cols-2 gap-y-5 gap-x-5">
                    <div>
                      <label className="text-sm mb-2 block">Event Title</label>
                      <input
                        name="title"
                        type="text"
                        value={selectedEvent.event_title}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            event_title: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter event title"
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">Event Organizer</label>
                      <input
                        name="organizer"
                        type="text"
                        value={selectedEvent.event_organizer}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            event_organizer: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter event organizer"
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">Event Description</label>
                      <input
                        name="description"
                        type="text"
                        value={selectedEvent.event_description}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            event_description: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter event description"
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">Event Image</label>
                      <input
                        name="image"
                        type="text"
                        value={selectedEvent.event_image}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            event_image: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter event image URL"
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">Event Date</label>
                      <input
                        name="date"
                        type="date"
                        value={selectedEvent.event_date}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            event_date: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter event date"
                      />
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">Event Time</label>
                      <input
                        name="time"
                        type="time"
                        value={selectedEvent.event_time}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            event_time: e.target.value,
                          })
                        }
                        className="input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter event time"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex flex-row">
                    <button
                      type="submit"
                      className="btn flex w-max font-semibold justify-end rounded-md hover:shadow-inner bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                    >
                      Save Edits
                      <Save className="w-5"/>
                    </button>

                    <button
                      onClick={deleteEvent}
                      className=" ml-auto btn flex w-max font-semibold justify-center rounded-md bg-red-700 hover:bg-red-400 px-3 py-1.5 text-lg leading-6 text-gray-100 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                    >
                      Delete Event
                      <Trash2 className="w-5"/>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </dialog>

        <dialog id="modal_create" className="modal transition-none text-black">
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
                    Create Event
                  </h2>
                </div>
              </div>
              <form onSubmit={handleCreateEvent}>
                <div className="grid sm:grid-cols-2 gap-y-5 gap-x-5">
                  <div>
                    <label className="text-sm mb-2 block">Event Title</label>
                    <input
                      name="title"
                      type="text"
                      value={newEvent.event_title}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          event_title: e.target.value,
                        })
                      }
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${errors.event_title ? 'border-red-500' : ''}`}
                      placeholder="Enter event title"
                    />
                    {errors.event_title && <p className="text-red-500 text-xs mt-1">{errors.event_title}</p>}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Event Organizer</label>
                    <input
                      name="organizer"
                      type="text"
                      value={newEvent.event_organizer}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          event_organizer: e.target.value,
                        })
                      }
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${errors.event_organizer ? 'border-red-500' : ''}`}
                      placeholder="Enter event organizer"
                    />
                    {errors.event_organizer && <p className="text-red-500 text-xs mt-1">{errors.event_organizer}</p>}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Event Description</label>
                    <input
                      name="description"
                      type="text"
                      value={newEvent.event_description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          event_description: e.target.value,
                        })
                      }
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${errors.event_description ? 'border-red-500' : ''}`}
                      placeholder="Enter event description"
                    />
                    {errors.event_description && <p className="text-red-500 text-xs mt-1">{errors.event_description}</p>}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Event Image</label>
                    <input
                      name="image"
                      type="text"
                      value={newEvent.event_image}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          event_image: e.target.value,
                        })
                      }
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${errors.event_image ? 'border-red-500' : ''}`}
                      placeholder="Enter event image URL"
                    />
                    {errors.event_image && <p className="text-red-500 text-xs mt-1">{errors.event_image}</p>}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Event Date</label>
                    <input
                      name="date"
                      type="date"
                      value={newEvent.event_date}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          event_date: e.target.value,
                        })
                      }
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${errors.event_date ? 'border-red-500' : ''}`}
                      placeholder="Enter event date"
                    />
                    {errors.event_date && <p className="text-red-500 text-xs mt-1">{errors.event_date}</p>}
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Event Time</label>
                    <input
                      name="time"
                      type="time"
                      value={newEvent.event_time}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          event_time: e.target.value,
                        })
                      }
                      className={`input input-bordered w-full text-sm px-4 py-3.5 rounded-md outline-blue-500 ${errors.event_time ? 'border-red-500' : ''}`}
                      placeholder="Enter event time"
                    />
                    {errors.event_time && <p className="text-red-500 text-xs mt-1">{errors.event_time}</p>}
                  </div>
                </div>

                <div className="mt-7 flex flex-row">
                  <button
                    type="submit"
                    className="btn flex w-max font-semibold justify-end rounded-md hover:shadow-inner bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm hover:bg-lightyellow hover:text-white3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nucolor2"
                  >
                    Create Event
                    <Save className="w-5"/>
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

export default Events;
