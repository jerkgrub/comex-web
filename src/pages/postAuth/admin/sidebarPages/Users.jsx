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

  return (
    <>
      <div className="bg-white flex p-12 justify-start w-full h-full">
        <div className="bg-white w-full">
          {/* 1st section */}
          <div className="text-4xl text-blue mb-3 font-bold">Manage Users</div>

          {/* 2nd section */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <div className="flex w-full">
              <SearchInput
                placeholder="Search by name.."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div className="divider divider-horizontal"></div>
            <p className="select-none">Filters:</p>
            <DropdownGeneric
              icon={UsersRound}
              items={usertypeItems}
            />
            <DropdownGeneric
              icon={School}
              items={departmentItems}
            />
            <div className="divider divider-horizontal"></div>
            <ButtonGeneric
              icon={Plus}
              label="Create User"
              className="bg-nucolor3 hover:bg-nucolor2 hover:text-white3"
            />
          </div>

          {/* 3rd section */}
          {/* Pass the search input to UserTable as a prop */}
          <UserTable searchInput={searchInput} />
        </div>
      </div>
    </>
  );
};

export default Users;
