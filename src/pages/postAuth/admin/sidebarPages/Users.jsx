import { Plus, Power, PowerOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../../../../components/UserTable";
import { departmentItems, usertypeItems } from "../../../../components/ItemOptions";

const Users = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    userType: "",
    accountStatus: "Activated",
  });
  const navigate = useNavigate();

  const handleCreateUserButton = () => {
    navigate("/admin/create-user");
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const toggleAccountStatus = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      accountStatus: prevFilters.accountStatus === "Activated" ? "Deactivated" : "Activated",
    }));
  };

  return (
    <div className="p-4 md:p-8 min-h-screen card bg-base-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 md:mb-0">
          Manage Users ☎️
        </h1>

        <div className="flex flex-wrap items-center space-x-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">
              Toggle {filters.accountStatus === "Activated" ? "Activated" : "Deactivated"} users
            </p>
            <button
              className={`btn btn-xs btn-square md:w-auto ${
                filters.accountStatus === "Activated" ? "btn-success" : "btn-error"
              }`}
              onClick={toggleAccountStatus}
              title={`Toggle to ${filters.accountStatus === "Activated" ? "Deactivated" : "Activated"} users`}
            >
              {filters.accountStatus === "Activated" ? (
                <Power className="w-5 h-5" />
              ) : (
                <PowerOff className="w-5 h-5" />
              )}
            </button>
          </div>

          <button className="btn bg-nucolor3 hover:bg-nucolor2 w-full md:w-auto" onClick={handleCreateUserButton}>
            <Plus className="w-5 h-5" />
            Create User
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="input input-bordered w-full pr-12"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute inset-y-0 right-0 flex items-center px-2"
                  aria-label="Clear Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 hover:text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9l-2.293-2.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293a1 1 0 00-1.414-1.414L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* User Type Filter */}
          <div>
            <select
              value={filters.userType}
              onChange={(e) => handleFilterChange("userType", e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All User Types</option>
              {usertypeItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={filters.department}
              onChange={(e) => handleFilterChange("department", e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All Departments</option>
              {departmentItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="rounded-lg">
        <UserTable searchInput={searchInput} filters={filters} />
      </div>
    </div>
  );
};

export default Users;
