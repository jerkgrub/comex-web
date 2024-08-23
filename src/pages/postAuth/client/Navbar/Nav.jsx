import { LogOut } from "lucide-react";
import { useContext, useState } from "react";
import {NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../../../components/UserContext";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const { user, setUser } = useContext(UserContext); // Added setUser here
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logging out...",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          console.log("Logged out");
          setUser(null);
          navigate("/login").then(() => {
            // Display a success message
            Swal.fire({
              icon: "success",
              title: "Logged out.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        });
      }
    });
  };

  return (
    <div>
      <button onClick={handleToggle}>
        <span>{isOpen ? "Close" : "Menu"}</span>
      </button>

      {isOpen && (
        <div className="flex flex-col gap-12">
          <p className="self-center">
            <NavLink to="/client/home">Home</NavLink>
          </p>

          <p className="self-center">
            <NavLink to="/client/about">About Us</NavLink>
          </p>

          <p className="self-center">
            <NavLink to="/client/events">Events</NavLink>
          </p>

          <p className="self-center">
            <NavLink to="/client/nstp">NSTP</NavLink>
          </p>

          <p className="self-center">
            <NavLink to="/client/services">Services</NavLink>
          </p>

          <button onClick={handleLogout}>
            <div className="ml-0 self-center p-1.5 rounded-lg text-gray-300 hover:bg-nucolor4 hover:text-red-400 transition duration-200">
              <LogOut size={20} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
