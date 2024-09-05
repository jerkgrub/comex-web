import { ChevronDown, CircleUserRound, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ccLogo from "../images/ccLogo.png";
import { showToast } from "../Toast";
import FetchUserData from "../hooks/FetchUserData";

// Add items here
const menuItems = [
  { name: "Home", link: "/client/home" },
  {
    name: "About Us",
    subItems: [
      { name: "Administrators", link: "#" },
      { name: "Adopted Barangays", link: "#" },
    ],
  },
  {
    name: "Events",
    subItems: [
      { name: "NSTP", link: "#" },
      { name: "Community Immersion", link: "#" },
    ],
  },
  { name: "Highlights", link: "/client/home" },
];

const PostAuthNavbar = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const user = FetchUserData();

  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/client/profile");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to sign out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Signing out...",
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          console.log("Logged out");
          localStorage.clear();
          showToast("success", "Signed out!");
          navigate("/");
        });
      }
    });
  };

  const handleNavigation = (link) => {
    if (link !== "#") {
      navigate(link);
    }
  };

  return (
    <>
      <div className="navbar fixed top-0 left-0 w-full z-50  bg-nucolor1/85 backdrop-blur-md text-white2 border-b-4 border-nucolor3 drop-shadow-lg">
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
              className="text-black menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a onClick={() => handleNavigation(item.link)}>{item.name}</a>
                  {item.subItems && (
                    <ul className="p-2">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <a onClick={() => handleNavigation(subItem.link)}>
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-3 flex flex-row justify-center items-center gap-1 ">
            <img className="w-16" src={ccLogo} />
            <h1 className="text-2xl font-semibold invisible sm:visible font-roboto-slab">COMEX CONNECT</h1>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item, index) => (
              <div key={index} className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost font-normal text-base"
                  onClick={() => {
                    if (item.subItems) {
                      setOpenDropdownIndex(
                        openDropdownIndex === index ? null : index
                      );
                    } else {
                      handleNavigation(item.link);
                    }
                  }}
                >
                  {item.name}
                  {item.subItems && <ChevronDown className="w-4 text-white3" />}
                </div>
                {item.subItems && openDropdownIndex === index && (
                  <ul
                    tabIndex={0}
                    className="text-black dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a onClick={() => handleNavigation(subItem.link)}>
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>

        <div className="navbar-end  ">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="font-normal text-sm btn btn-ghost   tracking-widest cursor-pointer"
            >
              Hello, {user.firstName}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <a
                  onClick={handleProfile}
                  className="btn btn-ghost flex justify-start items-center block px-2 py-1 hover:bg-gray-200"
                >
                  <CircleUserRound className="w-4 text-nucolor5" />
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="btn btn-ghost flex justify-start items-center block px-2 py-1 hover:bg-gray-200"
                >
                  <LogOut className="w-4 text-nucolor5" />
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-20"/>
    </>
  );
};

export default PostAuthNavbar;