import { ChevronDown, CircleUserRound, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ccLogo from '../images/ccLogo.png';
import { showToast } from '../Toast';
import useFetchUserData from '../hooks/useFetchUserData';
import Skeleton from 'react-loading-skeleton';

// Define menu items for each user type
const menuItemsByUserType = {
  Admin: [
    { name: 'Admin Dashboard', link: '/admin/dashboard' },
    {
      name: 'User Management',
      subItems: [
        { name: 'Manage Users', link: '/admin/users' },
        { name: 'Roles & Permissions', link: '/admin/roles' }
      ]
    },
    { name: 'Settings', link: '/admin/settings' }
  ],
  'Comex Coordinator': [
    { name: 'Home', link: '/client/home' },
    { name: 'About Us', link: '/client/about-us' },
    { name: 'Highlights', link: '/client/highlights' },
    {
      name: 'Activities',
      subItems: [
        { name: 'View Activities', link: '/client/view-activities' },
        { name: 'Application for Engagement Appraisal', link: '/client/engagement-appraisals' },
        { name: 'Propose an Activity', link: '/client/propose-activity' }
      ]
    },
  ],
  Faculty: [
    { name: 'Home', link: '/client/home' },
    { name: 'About Us', link: '/client/about-us' },
    { name: 'Highlights', link: '/client/highlights' },
    {
      name: 'Activities',
      subItems: [
        { name: 'View Activities', link: '/client/view-activities' },
        { name: 'Evaluation Forms', link: '/client/evaluation-forms' },
      ]
    },
    {
      name: 'Application for Engagement Appraisal',
      link: '/client/engagement-appraisals'
    }
  ],
  NTP: [
    { name: 'Home', link: '/client/home' },
    { name: 'About Us', link: '/client/about-us' },
    { name: 'Highlights', link: '/client/highlights' },
    {
      name: 'Activities',
      subItems: [
        { name: 'View Activities', link: '/client/view-activities' },
        { name: 'Evaluation Forms', link: '/client/evaluation-forms' },
      ]
    },
    {
      name: 'Application for Engagement Appraisal',
      link: '/client/engagement-appraisals'
    }

  ],
  Student: [
    { name: 'Home', link: '/client/home' },
    { name: 'About Us', link: '/client/about-us' },
    { name: 'Activities', link: '/client/view-activities' },
    { name: 'Highlights', link: '/client/highlights' }
  ]
};

const PostAuthNavbar = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { user, loading } = useFetchUserData();
  const userType = user.usertype; // Assuming 'usertype' is the property name
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/client/profile');
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setOpenDropdownIndex(null);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to sign out?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Signing out...',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then(() => {
          localStorage.clear();
          showToast('success', 'Signed out!');
          navigate('/');
        });
      }
    });
  };

  const handleItemClick = itemLink => {
    if (itemLink !== '#') {
      navigate(itemLink);
    }
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setOpenDropdownIndex(null);
  };

  // Get menu items based on user type
  const menuItems = menuItemsByUserType[userType] || [];

  const renderMenuItems = items =>
    items.map((item, index) => (
      <li key={index}>
        <a onClick={() => (item.subItems ? null : handleItemClick(item.link))}>{item.name}</a>
        {item.subItems && (
          <ul className="p-2">
            {item.subItems.map((subItem, subIndex) => (
              <li key={subIndex}>
                <a onClick={() => handleItemClick(subItem.link)}>{subItem.name}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));

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
              {loading
                ? Array(3)
                    .fill()
                    .map((_, index) => (
                      <li key={index}>
                        <Skeleton
                          className="animate-pulse"
                          baseColor="#606f9e"
                          highlightColor="#ffffff"
                          width={80}
                        />
                      </li>
                    ))
                : renderMenuItems(menuItems)}
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
            {loading
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="btn btn-ghost font-normal text-base">
                      <Skeleton
                        className="animate-pulse"
                        baseColor="#606f9e"
                        highlightColor="#ffffff"
                        width={200}
                        height={25}
                      />
                    </div>
                  ))
              : menuItems.map((item, index) => (
                  <div key={index} className="dropdown">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost font-normal text-base"
                      onClick={() =>
                        item.subItems
                          ? setOpenDropdownIndex(openDropdownIndex === index ? null : index)
                          : handleItemClick(item.link)
                      }
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
                            <a onClick={() => handleItemClick(subItem.link)}>{subItem.name}</a>
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
              Hello,{' '}
              {loading ? (
                <Skeleton
                  className="animate-pulse"
                  baseColor="#606f9e"
                  highlightColor="#ffffff"
                  width={80}
                />
              ) : (
                user.firstName
              )}
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
