import { Plus, Power, PowerOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivityTable from "../../../../components/ActivityTable";
import { departmentItems, activityTypeItems } from "../../../../components/ItemOptions";
import usePendingActivitiesCount from "../../../../components/hooks/usePendingActivitiesCount";

const Activities = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    activityType: "",
    accountStatus: "Activated",
    isApproved: true,
  });
  const [activeTab, setActiveTab] = useState("approved");
  const navigate = useNavigate();

  // Use the custom hook to get pending activities count
  const pendingCount = usePendingActivitiesCount();

  const handleCreateActivityButton = () => {
    navigate("/admin/create-activity");
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
      accountStatus:
        prevFilters.accountStatus === "Activated"
          ? "Deactivated"
          : "Activated",
    }));
  };

  const resetFilters = () => {
    setFilters({
      department: "",
      activityType: "",
      accountStatus: "Activated",
      isApproved: activeTab === "approved",
    });
    setSearchInput("");
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      isApproved: activeTab === "approved",
    }));
  }, [activeTab]);

  return (
    <div className="card p-4 md:p-8 min-h-screen bg-base-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Manage Activities 🌍
        </h1>

        <div className="flex flex-wrap items-center mt-4 md:mt-0 space-x-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">
              Toggle{" "}
              {filters.accountStatus === "Activated"
                ? "Activated"
                : "Deactivated"}{" "}
              activities
            </p>
            <button
              className={`btn btn-xs btn-square md:w-auto ${
                filters.accountStatus === "Activated"
                  ? "btn-success"
                  : "btn-error"
              }`}
              onClick={toggleAccountStatus}
              title={`Toggle to ${
                filters.accountStatus === "Activated"
                  ? "Deactivated"
                  : "Activated"
              } activities`}
            >
              {filters.accountStatus === "Activated" ? (
                <Power className="w-5 h-5" />
              ) : (
                <PowerOff className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            className="btn bg-nucolor3 hover:bg-nucolor2 w-full md:w-auto"
            onClick={handleCreateActivityButton}
          >
            <Plus className="w-5 h-5" />
            Create Activity
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            className={`relative px-4 py-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === "approved"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
            }`}
            onClick={() => setActiveTab("approved")}
          >
            Approved Activities
          </button>
          <button
            className={`relative px-4 py-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Activities
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-red-500">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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

          {/* Activity Type Filter */}
          <div>
            <select
              value={filters.activityType}
              onChange={(e) =>
                handleFilterChange("activityType", e.target.value)
              }
              className="select select-bordered w-full"
            >
              <option value="">All Activity Types</option>
              {activityTypeItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex space-x-2">
            <select
              value={filters.department}
              onChange={(e) =>
                handleFilterChange("department", e.target.value)
              }
              className="select select-bordered w-full"
            >
              <option value="">All Departments</option>
              {departmentItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            {/* Reset Filters Button */}
            <button
              className="btn"
              onClick={resetFilters}
              title="Reset Filters"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="rounded-lg">
        <ActivityTable searchInput={searchInput} filters={filters} />
      </div>
    </div>
  );
};

export default Activities;
