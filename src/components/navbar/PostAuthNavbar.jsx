import { ChevronDown, CircleUserRound, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ccLogo from "../images/ccLogo.png";
import { showToast } from "../Toast";
import FetchUserData from "../hooks/FetchUserData";

// Define menu items for each user type
const menuItemsByUserType = {
  Admin: [
    { name: "Admin Dashboard", link: "/admin/dashboard" },
    {
      name: "User Management",
      subItems: [
        { name: "Manage Users", link: "/admin/users" },
        { name: "Roles & Permissions", link: "/admin/roles" },
      ],
    },
    { name: "Settings", link: "/admin/settings" },
  ],
  "Comex Coordinator": [
    { name: "Coordinator Home", link: "/coordinator/home" },
    {
      name: "Activities",
      subItems: [
        { name: "Create Activity", link: "/coordinator/create-activity" },
        { name: "Manage Activities", link: "/coordinator/manage-activities" },
      ],
    },
    { name: "Reports", link: "/coordinator/reports" },
  ],
  Faculty: [
    { name: "Home", link: "/client/home" },
    { name: "About Us", link: "/client/about-us" },
    { name: "Highlights", link: "/client/highlights" },
    {
      name: "Activities",
      subItems: [
        { name: "View Activities", link: "/client/view-activities" },
        { name: "Evaluation Forms", link: "/student/evaluation-forms" },
      ],
    },
    {
      name: "Application for Engagement Appraisal",
      link: "/client/engagement-appraisals",
    },
    
  ],
  NTP: [
    { name: "NTP Home", link: "/ntp/home" },
    {
      name: "Tasks",
      subItems: [
        { name: "My Tasks", link: "/ntp/my-tasks" },
        { name: "Submit Report", link: "/ntp/submit-report" },
      ],
    },
    { name: "NTP Guidelines", link: "/ntp/guidelines" },
  ],
  Student: [
    { name: "Home", link: "/client/home" },
    { name: "About Us", link: "/client/about-us" },
    {
      name: "Activities",
      subItems: [
        { name: "View Activities", link: "/client/view-activities" },
        { name: "Evaluation Forms", link: "/student/evaluation-forms" },
      ],
    },
    { name: "Highlights", link: "/client/highlights" },
  ],
};

const PostAuthNavbar = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const user = FetchUserData();
  const userType = user.usertype; // Assuming 'usertype' is the property name

  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/client/profile");
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // Close the dropdown by blurring the active element
    }
    setOpenDropdownIndex(null); // Close the open dropdown
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

  // Handle item click and close the dropdown
  const handleItemClick = (itemLink) => {
    handleNavigation(itemLink);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur(); // Close the dropdown by blurring the active element
    }
    setOpenDropdownIndex(null); // Close the open dropdown
  };

  // Get menu items based on user type
  const menuItems = menuItemsByUserType[userType] || [];

  return (
    <>
      <div className="navbar fixed top-0 left-0 w-full z-50 bg-nucolor1 text-white2 border-b-4 border-nucolor3 drop-shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              {/* Mobile menu icon */}
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
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={() =>
                      item.subItems ? null : handleItemClick(item.link)
                    }
                  >
                    {item.name}
                  </a>
                  {item.subItems && (
                    <ul className="p-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a onClick={() => handleItemClick(subItem.link)}>
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
            <img className="w-16" src={ccLogo} alt="Logo" />
            <h1 className="text-2xl font-semibold invisible sm:visible font-roboto-slab">
              COMEX CONNECT
            </h1>
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
                      handleItemClick(item.link);
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
                        <a onClick={() => handleItemClick(subItem.link)}>
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

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="font-normal text-sm btn btn-ghost tracking-widest cursor-pointer"
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

      <div className="pt-20" />
    </>
  );
};

export default PostAuthNavbar;
