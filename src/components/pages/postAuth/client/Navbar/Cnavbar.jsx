import { LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { UserContext } from "../../../../UserContext";

const Cnavbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleDropdownToggle = () => { // New handler for dropdown
      setDropdownOpen(!dropdownOpen);
    };

    const { user, setUser } = useContext(UserContext); // Added setUser here
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
          title: 'Are you sure you want to log out?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Logging out...',
              timer: 1000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
              }
            }).then(() => {
              console.log("Logged out");
              setUser(null);
              navigate('/login').then(() => {
                // Display a success message
                Swal.fire({
                  icon: 'success',
                  title: 'Logged out.',
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
            });
          }
        });
      };

    return(
        <>
        </>
    )
}

export default Cnavbar;