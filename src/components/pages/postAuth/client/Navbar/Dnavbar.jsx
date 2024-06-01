import { ChevronDown, ChevronUp, CircleUserRound, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { UserContext } from "../../../../UserContext";

// add items here
const menuItems = [
  { name: 'Home', link: '/client/home' },
  // { name: 'Events', link: '/client/home' },
  { 
    name: 'About Us', 
    subItems: [
      { name: 'Administrators', link: '#' },
      { name: 'Adopted Barangays', link: '#' },
    ]
  },
];

const Dnavbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown
    const { user, setUser } = useContext(UserContext); // Added setUser here
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const navigate = useNavigate();

    const sign_btn = () => {
      navigate('/login');
    };

    return(
        <>
        <div className="navbar bg-nucolor1 text-white2 border-b-4 border-nucolor3 drop-shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="text-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems.map(item => (
                <li key={item.name}>
                  <a>{item.name}</a>
                  {item.subItems && (
                    <ul className="p-2">
                      {item.subItems.map(subItem => (
                        <li key={subItem.name}><a>{subItem.name}</a></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img
            className="w-44"
            src="https://i.imgur.com/FKLQLuv.png"
          />
          </div>
          {/* <a className="btn btn-ghost text-xl">COMsX CONNECT</a> */}
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">

            {/* put map here */}

            {menuItems.map((item, index) => (
            <div key={index} className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost text-base font-normal" onClick={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)}>
                {item.name}
                {item.subItems && (openDropdownIndex === index ? <ChevronDown className="w-4 text-white3" /> : <ChevronDown className="w-4 text-white3" />)}
              </div>
              {item.subItems && openDropdownIndex === index && (
                <ul tabIndex={0} className="text-black dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}><a>{subItem.name}</a></li>
                  ))}
                </ul>
              )}
            </div>
))}

          </ul>
        </div>

        <div className="navbar-end bg-nucolor1">
          <div className="dropdown dropdown-end">
            <div onClick={sign_btn} role="button" className="font-normal text-sm btn btn-ghost bg-nucolor1 tracking-widest cursor-pointer">Sign In</div>
          </div>
        </div>

      </div>
        </>
    )
}

export default Dnavbar;