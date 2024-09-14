import { ChevronDown } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../UserContext";
import axios from "axios";

import ccLogo from "../images/ccLogo.png";
import ComexConnectHeader from "./ComexConnectHeader";

// add items here
const menuItems = [
  { name: "Home", link: "/ " },
  // { name: 'Events', link: '/client/home' },
  {
    name: "About Us", link: "/about-us",
  },
];

const PreAuthNavbar = () => {
  const { user, setUser } = useContext(UserContext); // Added setUser here
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const buttonLogin = () => {
    navigate("/login");
  };

  const buttonRegister = () => {
    navigate("/register");
  };
  // for navbar options
  const item_btn = (link) => {
    navigate(link);
  };

  //

  const login_btn = (event) => {
    event.preventDefault();
    Swal.fire({
      target: document.getElementById("my_modal_1"),
      scrollbarPadding: false,
      title: "Logging in...",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      axios
        .post("http://localhost:8000/api/login", {
          email: email,
          password: password,
          usertype: usertype.toLowerCase(),
        })
        .then((response) => {
          // Store the JWT in local storage
          console.log(response.data.u_lname);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userFirstName", response.data.user.u_fname);
          localStorage.setItem("userLastName", response.data.user.u_lname);
          localStorage.setItem("userEmail", response.data.user.email);
          localStorage.setItem("userMnum", response.data.user.u_mnum);
          localStorage.setItem("userDep", response.data.user.u_dep);
          console.log("token received");

          const userData = {
            email: email,
            token: response.data.token,
            usertype: usertype.toLowerCase(),
          };
          setUser(userData); // Update user context

          if (response.data.message === "Successfully logged in as admin") {
            Swal.fire({
              scrollbarPadding: false,
              icon: "success",
              title: "Logged in as admin!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/admin/dashboard");
          } else if (
            response.data.message === "Successfully logged in as student"
          ) {
            Swal.fire({
              scrollbarPadding: false,
              icon: "success",
              title: "Logged in as student!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/client/home");
          } else {
            Swal.fire({
              target: document.getElementById("my_modal_1"),
              scrollbarPadding: false,
              icon: "error",
              title: "Invalid login attempt",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            target: document.getElementById("my_modal_1"),
            scrollbarPadding: false,
            icon: "error",
            title: "Something went wrong",
            text: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  return (
    <>
      <div className="navbar fixed top-0 left-0 w-full z-50  bg-nucolor1 text-white2 border-b-4 border-nucolor3 drop-shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>{item.name}</Link>
                  {item.subItems && (
                    <ul className="p-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link to={subItem.link}>{subItem.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <ComexConnectHeader/>
          {/* <a className="btn btn-ghost text-xl">COMsX CONNECT</a> */}
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* put map here */}

            {menuItems.map((item, index) => (
              <div key={index} className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost text-base font-normal"
                  onClick={() =>
                    item.subItems
                      ? setOpenDropdownIndex(
                          openDropdownIndex === index ? null : index
                        )
                      : item_btn(item.link)
                  }
                >
                  <Link to={item.link}>{item.name}</Link>
                  {item.subItems &&
                    (openDropdownIndex === index ? (
                      <ChevronDown className="w-4 text-white3" />
                    ) : (
                      <ChevronDown className="w-4 text-white3" />
                    ))}
                </div>
                {item.subItems && openDropdownIndex === index && (
                  <ul
                    tabIndex={0}
                    className="text-black dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subItem.link}>{subItem.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-1">
          
          {/* login button */}
          <div className="">
            <div className="dropdown dropdown-end">
              <div
                role="button"
                onClick={buttonLogin}
                className="font-normal text-sm btn btn-ghost tracking-widest cursor-pointer"
              >
                Log In
              </div>
            </div>
          </div>

          {/* Sign up */}
          <div className=" ">
            <div className="dropdown dropdown-end">
              <div
                role="button"
                className="font-normal text-sm btn btn-ghost bg-nucolor3 hover:bg-[#9d8124] text-black  tracking-widest cursor-pointer"
                onClick={buttonRegister}
              >
                Register
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="pt-20">
      </div>
    </>
  );
};

export default PreAuthNavbar;
