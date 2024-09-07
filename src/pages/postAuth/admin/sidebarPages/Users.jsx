import { Plus, School, UsersRound } from "lucide-react";
import { useState } from "react";
import ButtonGeneric from "../../../../components/inputs/ButtonGeneric";
import SearchInput from "../../../../components/inputs/SearchInput";
import UserTable from "../../../../components/UserTable";
import DropdownGeneric from "../../../../components/inputs/DropdownGeneric";
import {
  departmentItems,
  usertypeItems,
} from "../../../../components/ItemOptions";

const Users = () => {
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [filters, setFilters] = useState({ department: "", userType: "" }); // State for filters

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
    console.log(`Filter updated: ${filterName} = ${value}`);
  };

  return (
    <>
      <div className="bg-white flex p-12 justify-start w-full h-full">
        <div className="bg-white w-full">
          {/* 1st section */}
          <div className="text-4xl text-blue mb-3 font-bold">Manage Users</div>

          {/* 2nd section */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
            <div className="flex w-full">
              <SearchInput
                placeholder="Search by name.."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="divider divider-horizontal"></div>
            <p className="select-none font-semibold text-gray-700">Filters:</p>

            {/* usertype filter */}
            <DropdownGeneric
              icon={UsersRound}
              items={usertypeItems}
              value={filters.userType}
              onChange={(value) => handleFilterChange('userType', value)}
              className="p-2 border border-gray-300 rounded-md"
            />

            {/* department filter */}
            <DropdownGeneric
              icon={School}
              items={departmentItems}
              value={filters.department}
              onChange={(value) => handleFilterChange('department', value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <div className="divider divider-horizontal"></div>

            {/* create user button */}
            <ButtonGeneric
              icon={Plus}
              label="Create User"
              className="bg-nucolor3 hover:bg-nucolor2 hover:text-white3 p-2 rounded-md"
            />
          </div>

          {/* 3rd section */}
          {/* Pass the search input and filters to UserTable as props */}
          <UserTable searchInput={searchInput} filters={filters} />
        </div>
      </div>
    </>
  );
};

export default Users;