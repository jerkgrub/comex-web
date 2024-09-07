import {
  ChevronsLeft,
  ChevronsRight,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { useContext, createContext, useState } from "react";
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
          console.log("Logged out");
          localStorage.clear();
          showToast("success", "Signed out!");
          navigate("/");
        });
      }
    });
  };

  return (
    <aside
      className={`fixed h-screen top-0 left-0 transition-width duration-200 ${
        expanded ? "w-64" : "w-16"
      } z-50 shadow-right-thick`}
    >
      <nav className="h-full flex flex-col bg-gradient-to-tr bg-nucolor1/95 backdrop-blur-md border-r-4 border-nucolor3">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={ccHeader2}
            className={`overflow-hidden transition-all ${
              expanded ? "w-52" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg text-gray-300 bg-nucolor6/50 hover:bg-nucolor7 transition duration-200"
          >
            {expanded ? <ChevronsLeft /> : <ChevronsRight />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-nucolor6 flex p-3 items-center">
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
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
      </nav>

      <CardModal />
    </aside>
  );
}

export function SidebarItem({ icon, text, to }) {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const location = useLocation();
  const active = location.pathname === to;

  const handleClick = () => {
    setExpanded(false); // Minimize the sidebar
  };

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-nucolor4 to-nucolor4 text-white"
          : "hover:bg-nucolor6 text-gray-400 transition duration-200"
      }`}
    >
      <Link to={to} className="flex items-center w-full" onClick={handleClick}>
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
}
