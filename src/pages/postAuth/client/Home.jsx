import { useEffect, useState } from "react";
import { Carousel, Card } from "flowbite-react";
import api from "../../../api"; // Updated to use the `api` instance
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleSeeAll = (event) => {
    event.preventDefault();
    navigate("/client/view-activities");
  }

  useEffect(() => {
    api
      .get("/event/all") // Updated to use the `api` instance
      .then((response) => {
        const formattedEvents = response.data.Events.map((event) => {
          const date = new Date(event.event_date);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const formattedTime = new Date(
            `1970-01-01T${event.event_time}Z`
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          return {
            ...event,
            event_date: formattedDate,
            event_time: formattedTime,
          };
        });
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const handleCardClick = (eventId) => {
    event.preventDefault();
    const userEmail = localStorage.getItem("userEmail");

    api
      .get(`/event/get/attendee/${eventId}`) // Updated to use the `api` instance
      .then((response) => {
        const attendees = response.data.attendees;
        const hasRegistered = attendees.some(
          (attendee) => attendee.at_email === userEmail
        );

        if (hasRegistered) {
          Swal.fire(
            "Error!",
            "You have already registered for this event!",
            "error"
          );
        } else {
          Swal.fire({
            title: "Do you want to register for this event?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              const userData = {
                at_fname: localStorage.getItem("userFirstName"),
                at_lname: localStorage.getItem("userLastName"),
                at_email: userEmail,
              };

              api
                .post(`/event/add/attendee/${eventId}`, userData) // Updated to use the `api` instance
                .then(() => {
                  Swal.fire(
                    "Success!",
                    "You have successfully registered for the event!",
                    "success"
                  );
                })
                .catch((error) => {
                  console.error("Error registering for event:", error);
                  Swal.fire(
                    "Error!",
                    "An error occurred while registering for the event.",
                    "error"
                  );
                });
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching attendees:", error);
        Swal.fire(
          "Error!",
          "An error occurred while fetching event attendees.",
          "error"
        );
      });
  };

  return (
    <div className="px-3 py-6 xl:px-32 xl:py-12 bg-white flex flex-col gap-20">
      <div className="h-56 sm:h-64 xl:h-[600px]  2xl:h-[600px] relative z-10">
        <Carousel className="shadow-lg z-0">
          <img
            src="https://media.assettype.com/tribune%2F2024-04%2F3dfc4787-bf5e-46ed-ae8e-bbbfa9af00bf%2Ffp22king2.jpg?w=1200&auto=format%2Ccompress&fit=max"
            alt="..."
          />
        </Carousel>
      </div>

      <div className="bg- flex flex-col">
        <div className="bg- flex flex-row mb-6">
          <div className="text-3xl font-bold">Upcoming Activities</div>
          <button onClick={handleSeeAll} className="text-lg text-blue ml-auto font-normal">
            See All
          </button>
        </div>

        <div className="flex flex-row bg- flex-wrap justify-start items- gap-6">
          {events && events.length > 0 ? (
            events.map((event) => (
              <Card
                key={event._id}
                className="max-w-xs transition-all hover:shadow-lg shadow-inner"
                imgAlt={event.event_title}
                imgSrc={event.event_image}
                onClick={() => handleCardClick(event._id)}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {event.event_title}
                </h5>
                <h1 className="">{`${event.event_date} - ${event.event_time}`}</h1>
                <h3 className="text-base font-semibold">
                  {event.event_organizer}
                </h3>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {event.event_description}
                </p>
              </Card>
            ))
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
      </div>
    </div>
  );
};
