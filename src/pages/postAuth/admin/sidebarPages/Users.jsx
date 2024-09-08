import { Archive, Plus, Power, PowerOff, School, UsersRound } from "lucide-react";
import { useState } from "react";
import ButtonGeneric from "../../../../components/inputs/ButtonGeneric";
import SearchInput from "../../../../components/inputs/SearchInput";
import UserTable from "../../../../components/UserTable";
import DropdownGeneric from "../../../../components/inputs/DropdownGeneric";
import { departmentItems, usertypeItems } from "../../../../components/ItemOptions";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [filters, setFilters] = useState({
    department: "",
    userType: "",
    accountStatus: "Activated", // New filter for account status
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
    console.log(`Filter updated: ${filterName} = ${value}`);
  };

  const toggleAccountStatus = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      accountStatus: prevFilters.accountStatus === "Activated" ? "Deactivated" : "Activated",
    }));
  };

  return (
    <>
      <div className="bg-white flex p-6 sm:p-12 justify-start w-full h-full">
        <div className="bg-white w-full">
          {/* 1st section */}
          <div className="text-2xl sm:text-4xl text-blue mb-3 font-bold">Manage Users</div>

          {/* 2nd section */}
          <div className="flex flex-col lg:flex-row gap-3 justify-center items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
            <div className="flex w-full">
              <SearchInput
                placeholder="Search by name.."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="divider hidden lg:block divider-horizontal"></div>
            <p className="select-none font-semibold text-gray-700 hidden lg:block">Filters:</p>

            {/* usertype filter */}
            <DropdownGeneric
              icon={UsersRound}
              items={usertypeItems}
              value={filters.userType}
              onChange={(value) => handleFilterChange("userType", value)}
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

            {/* Toggle account status button with dynamic icon and color */}
            <ButtonGeneric
              icon={filters.accountStatus === "Activated" ? Power : PowerOff}
              label={filters.accountStatus === "Activated" ? "Activated Users" : "Deactivated Users"}
              onClick={toggleAccountStatus}
              className={`w-full lg:w-auto p-2 rounded-md ${
                filters.accountStatus === "Activated" ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            />

            {/* create user button */}
            <ButtonGeneric
              icon={Plus}
              label="Create User"
              onClick={handleCreateUserButton}
              className="w-full lg:w-auto bg-nucolor3 hover:bg-nucolor2 hover:text-white3 p-2 rounded-md"
            />
          </div>

          {/* 3rd section */}
          {/* Pass the search input and filters to UserTable as props */}
          <div className="mt-4">
            <UserTable searchInput={searchInput} filters={filters} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;