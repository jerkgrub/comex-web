import { ArrowLeft, Plus, Power, PowerOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppraisalTable from "./AppraisalTable";

const ManageAppraisals = () => {
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
      accountStatus:
        prevFilters.accountStatus === "Activated" ? "Deactivated" : "Activated",
    }));
  };

  // Add the resetFilters function
  const resetFilters = () => {
    setFilters({
      department: "",
      userType: "",
      accountStatus: "Activated",
    });
    setSearchInput("");
  };

  return (
    <div className="p-4 md:p-8 min-h-screen card bg-base-100 shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <button
          onClick={() => navigate('/admin/review-evaluation-forms')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Manage Forms 📄
        </h1>

        <div className="flex flex-wrap items-center mt-4 md:mt-0 space-x-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">
              Toggle{" "}
              {filters.accountStatus === "Activated" ? "Activated" : "Deactivated"} users
            </p>
            <button
              className={`btn btn-xs btn-square md:w-auto ${
                filters.accountStatus === "Activated" ? "btn-success" : "btn-error"
              }`}
              onClick={toggleAccountStatus}
              title={`Toggle to ${
                filters.accountStatus === "Activated" ? "Deactivated" : "Activated"
              } users`}
            >
              {filters.accountStatus === "Activated" ? (
                <Power className="w-5 h-5" />
              ) : (
                <PowerOff className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* <button
            className="btn bg-nucolor3 hover:bg-nucolor2 w-full md:w-auto"
            onClick={handleCreateUserButton}
          >
            <Plus className="w-5 h-5" />
            Create User
          </button> */}
        </div>
      </div>



      {/* User Table */}
      <div className="rounded-lg">
        <AppraisalTable searchInput={searchInput} filters={filters} />
      </div>
    </div>
  );
};

export default ManageAppraisals;
