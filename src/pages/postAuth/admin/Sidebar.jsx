import React, { useContext, createContext, useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { showToast } from "../../../components/Toast";
import FetchUserData from "../../../components/hooks/FetchUserData";
import ccHeader2 from "../../../components/images/ccHeader2.png";
import CardModal from "../../../components/modals/CardModal";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const user = FetchUserData();
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
          localStorage.clear();
          showToast("success", "Signed out!");
          navigate("/");
        });
      }
    });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setExpanded(true)}
          className="p-2 rounded-md bg-nucolor6/50 text-white hover:bg-nucolor7 transition duration-200"
        >
          <ChevronsRight />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-200 ${
          expanded ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setExpanded(false)}
      ></div>

      <aside
        className={`fixed h-screen top-0 left-0 transition-all duration-200 z-50 shadow-right-thick bg-gradient-to-tr bg-nucolor1 border-r-4 border-nucolor3 ${
          expanded ? "w-64" : "w-16"
        } ${expanded ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <nav className="h-full flex flex-col">
          {/* Header */}
          <SidebarHeader expanded={expanded} setExpanded={setExpanded} />

          <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          {/* Footer */}
          <SidebarFooter
            expanded={expanded}
            user={user}
            handleLogout={handleLogout}
          />
        </nav>

        <CardModal />
      </aside>
    </>
  );
}

function SidebarHeader({ expanded, setExpanded }) {
  return (
    <div className="p-4 pb-2 flex justify-between items-center">
      <img
        src={ccHeader2}
        className={`overflow-hidden transition-all duration-200 ${
          expanded ? "w-52" : "w-0"
        }`}
        alt="Logo"
      />
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg text-gray-300 bg-nucolor6/50 hover:bg-nucolor7 transition duration-200 hidden md:block"
      >
        {expanded ? <ChevronsLeft /> : <ChevronsRight />}
      </button>
      {/* Close Button for Mobile */}
      <button
        onClick={() => setExpanded(false)}
        className="p-1.5 rounded-lg text-gray-300 bg-nucolor6/50 hover:bg-nucolor7 transition duration-200 md:hidden"
      >
        <ChevronsLeft />
      </button>
    </div>
  );
}

function SidebarFooter({ expanded, user, handleLogout }) {
  return (
    <div className="border-t border-nucolor6 flex p-3 items-center">
      <div
        className={`flex justify-between items-center overflow-hidden transition-all duration-200 ${
          expanded ? "w-full" : "w-0"
        }`}
      >
        <div
          className="btn btn-ghost leading-4"
          onClick={() => document.getElementById("CardModal").showModal()}
        >
          <h4 className="font-semibold text-whitey flex justify-center items-center gap-2">
            <CircleUserRound /> {user.firstName}
          </h4>
          <span className="text-xs text-gray-400"></span>
        </div>

        <button onClick={handleLogout}>
          <div className="p-1.5 rounded-lg text-gray-300 bg-nucolor1/30 hover:bg-nucolor7 hover:text-red-700 transition duration-200">
            <LogOut size={20} />
          </div>
        </button>
      </div>
    </div>
  );
}

export function SidebarItem({ icon, text, to }) {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const location = useLocation();
  const active = location.pathname === to;

  const handleClick = () => {
    setExpanded(false); // Collapse the sidebar
  };

  return (
    <li>
      <Link
        to={to}
        onClick={handleClick}
        className={`relative flex py-2 px-3 my-1 font-medium rounded-md transition-colors duration-200 ${
          active
            ? "bg-nucolor4 text-white"
            : "text-gray-400 hover:bg-nucolor6 hover:text-white"
        } ${!expanded ? "justify-center items-center" : ""}`}
        aria-current={active ? "page" : undefined}
      >
        <span className="flex items-center">
          {icon}
          <span
            className={`overflow-hidden transition-all duration-200 ${
              expanded ? "w-52 ml-3 opacity-100 text-base" : "w-0 opacity-0 text-nucolor1"
            }`}
          >
            {text}
          </span>
        </span>
      </Link>
    </li>
  );
}
