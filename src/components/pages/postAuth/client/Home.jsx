import React, { useEffect, useState } from "react";
import { Carousel, Card } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";

export const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/event/all")
      .then((response) => {
        const formattedEvents = response.data.Events.map(event => {
          const date = new Date(event.event_date);
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          const formattedTime = new Date(`1970-01-01T${event.event_time}Z`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          return {
            ...event,
            event_date: formattedDate,
            event_time: formattedTime
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
    
    axios.get(`http://localhost:8000/api/event/get/attendee/${eventId}`)
      .then(response => {
        const attendees = response.data.attendees;
        const hasRegistered = attendees.some(attendee => attendee.at_email === userEmail);
        
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

              axios
                .post(
                  `http://localhost:8000/api/event/add/attendee/${eventId}`,userData
                )
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
      .catch(error => {
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
          <img
            src="https://scontent.fmnl25-5.fna.fbcdn.net/v/t39.30808-6/409395598_332594226207403_8283928636046012260_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFs4NE3RrUTaI_zRyF5mam3XlKe9j1zNnxeUp72PXM2fFlVwPx2X3atgWM0Kq8bTe31lhwobg5sOga-vLXEt2Yp&_nc_ohc=DvGEwMIyC84Q7kNvgH_OwU6&_nc_ht=scontent.fmnl25-5.fna&oh=00_AYBqCmrpDMIdTx5Jfri1DjYanvUjnygXYYLlxKED0hEeDw&oe=666786C7"
            alt="..."
          />
          <img
            src="https://scontent.fmnl25-4.fna.fbcdn.net/v/t39.30808-6/379698356_284134601053366_3950300267946090664_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFov7NQA_DZsFvsKMNPcx4tLylJObNQ_O0vKUk5s1D87fhbgexgJwHyLMsC1KYnssTIgWRYajW8NMQ8akbJiOlZ&_nc_ohc=tpxYvTInk-AQ7kNvgFQxN4k&_nc_ht=scontent.fmnl25-4.fna&oh=00_AYCZXqRVQFB1iXm9WybYhCw0jSuLIJ1p_pPT0lNuP6TGEw&oe=66679FDC"
            alt="..."
          />
          <img
            src="https://scontent.fmnl25-4.fna.fbcdn.net/v/t39.30808-6/367731575_266680646132095_3079328307547621839_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFT2PjR_jpNtSTW86qkc98XZNPnT4STjDVk0-dPhJOMNYoY7mw908XQVAEEQy80Zzp_62yFs-rmHyC-IShh2FNf&_nc_ohc=6jjLpZ_tvUQQ7kNvgHMzTVB&_nc_ht=scontent.fmnl25-4.fna&oh=00_AYBUvPgCLftgHOAU2YEHASrbFoBjMkaywJxL8k7OjJD7vw&oe=6667A29F"
            alt="..."
          />
          <img
            src="https://national-u.edu.ph/wp-content/uploads/2022/03/IMG_6110-Copy.jpg  "
            alt="..."
          />
        </Carousel>
      </div>

      <div className="bg- flex flex-col">
        <div className="bg- flex flex-row mb-6">
          <div className="text-3xl font-bold">Upcoming Events</div>
          <button className="text-lg text-blue ml-auto font-normal">
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
                <h3 className="text-base font-semibold">{event.event_organizer}</h3>
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
