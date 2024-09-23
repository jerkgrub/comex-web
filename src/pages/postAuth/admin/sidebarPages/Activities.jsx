import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Power, PowerOff, UsersRound, School } from "lucide-react";
import ButtonGeneric from "../../../../components/inputs/ButtonGeneric";
import SearchInput from "../../../../components/inputs/SearchInput";
import DropdownGeneric from "../../../../components/inputs/DropdownGeneric";
import ActivityTable from "../../../../components/ActivityTable";
import {
  departmentItems,
  activityTypeItems, // For Institutional or College Driven
} from "../../../../components/ItemOptions";

const Activities = () => {
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [filters, setFilters] = useState({
    department: "",
    activityType: "", // New filter for activity type
    accountStatus: "Activated", // Filter for activated/deactivated
  });
  const [activeTab, setActiveTab] = useState("approved"); // Tab state
  const navigate = useNavigate();

  const handleCreateActivityButton = () => {
    navigate("/admin/create-activity");
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    console.log(`Filter updated: ${filterName} = ${value}`);
  };

  const toggleAccountStatus = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      accountStatus:
        prevFilters.accountStatus === "Activated" ? "Deactivated" : "Activated",
    }));
  };

  return (
    <>
      <div className="bg-gray-200  flex p-6 sm:p-12 justify-start w-full h-full">
        <div className="bg-gray-200  w-full">
          {/* 1st section */}
          <div className="text-2xl sm:text-4xl  mb-3 font-bold">
            MANAGE ACTIVITIES
          </div>

          {/* Tabs for Approved and Pending Activities */}
          <div className="tabs tabs-lg tabs-lifted">
            <a
              className={`tab ${
                activeTab === "approved" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("approved")}
            >
              Approved Activities
            </a>
            <a
              className={`tab ${
                activeTab === "pending" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Activities
            </a>
          </div>

          {/* 2nd section */}
          <div className="flex flex-col lg:flex-row gap-3 justify-center items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
            <div className="flex w-full">
              <SearchInput
                placeholder="Search by name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="divider hidden lg:block divider-horizontal"></div>

            <p className="select-none font-semibold text-gray-700 hidden lg:block">
              Filters:
            </p>

            {/* activityType filter */}
            <DropdownGeneric
              icon={UsersRound}
              items={activityTypeItems}
              value={filters.activityType}
              onChange={(value) => handleFilterChange("activityType", value)}
              className="w-full lg:w-auto p-2 border border-gray-300 rounded-md"
            />

            {/* department filter */}
            <DropdownGeneric
              icon={School}
              items={departmentItems}
              value={filters.department}
              onChange={(value) => handleFilterChange("department", value)}
              className="w-full lg:w-auto p-2 border border-gray-300 rounded-md"
            />

            <div className="divider hidden lg:block divider-horizontal"></div>

            {/* Toggle account status button */}
            <ButtonGeneric
              icon={filters.accountStatus === "Activated" ? Power : PowerOff}
              label={
                filters.accountStatus === "Activated"
                  ? "Activated Activities"
                  : "Deactivated Activities"
              }
              onClick={toggleAccountStatus}
              className={`w-full lg:w-auto p-2 rounded-md ${
                filters.accountStatus === "Activated"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            />

            {/* create activity button */}
            <ButtonGeneric
              icon={Plus}
              label="Create Activity"
              onClick={handleCreateActivityButton}
              className="w-full lg:w-auto bg-nucolor3 hover:bg-nucolor2 hover:text-white3 p-2 rounded-md"
            />
          </div>

          {/* 3rd section */}
          {/* Pass the search input and filters to ActivityTable as props */}
          <div className="mt-4">
            {activeTab === "approved" ? (
              <ActivityTable
                searchInput={searchInput}
                filters={{ ...filters, isApproved: true }} // Filter for approved activities
              />
            ) : (
              <ActivityTable
                searchInput={searchInput}
                filters={{ ...filters, isApproved: false }} // Filter for pending activities
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activities;


// college-driven + institutional = activities