import { ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import Swal from 'sweetalert2';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user, setUser } = useContext(UserContext);
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
          localStorage.removeItem('token');
          localStorage.removeItem('userFirstName');
          navigate('/').then(() => {
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

  return (
    <aside className={`h-screen flex-shrink-0 transition-width duration-200 ${expanded ? 'w-64' : 'w-16'}`}>
      <nav className="h-full flex flex-col bg-gradient-to-tr from-nucolor1 to-nucolor1 border-r-4 border-nucolor3 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://i.imgur.com/FKLQLuv.png"
            className={`overflow-hidden transition-all ${expanded ? "w-52" : "w-0"}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg text-gray-300 bg-nucolor6 hover:bg-nucolor7 transition duration-200"
          >
            {expanded ? <ChevronsLeft /> : <ChevronsRight />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-nucolor6 flex p-3 items-center">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
            <div className="leading-4">
              <h4 className="font-semibold text-whitey">{user?.email}</h4>
              <span className="text-xs text-gray-400"></span>
            </div>

            <button onClick={handleLogout}>
              <div className="p-1.5 rounded-lg text-gray-300 bg-nucolor6 hover:bg-nucolor7 hover:text-red-700 transition duration-200">
                <LogOut size={20} />
              </div>
            </button>
          </div>
        </div>
      </nav>
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
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-nucolor4 to-nucolor4 text-white" : "hover:bg-nucolor6 text-gray-400 transition duration-200"}`}>
      <Link to={to} className="flex items-center w-full" onClick={handleClick}>
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
          {text}
        </span>
      </Link>
    </li>
  );
}
