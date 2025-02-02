// src/pages/postAuth/admin/initiativesPages/Programs.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgramsTable from "./ProgramsTable";
import usePendingProgramsCount from "../../../../components/hooks/usePendingProgramsCount";
import { Plus } from "lucide-react";

const Programs = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState("approved");
  const [filters, setFilters] = useState({
    isApproved: true,
  });
  const navigate = useNavigate();

  // Use the custom hook to get pending programs count
  const pendingCount = usePendingProgramsCount();

  const handleCreateProgramButton = () => {
    navigate("/admin/initiatives/programs/new");
  };

  useEffect(() => {
    setFilters({
      isApproved: activeTab === "approved",
    });
  }, [activeTab]);

  return (
    <div className="card p-4 md:p-8 min-h-screen bg-base-100 shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Manage Programs 🎓
        </h1>

        <div className="flex flex-wrap items-center mt-4 md:mt-0 space-x-4">
          <button
            className="btn bg-nucolor3 hover:bg-nucolor2 w-full md:w-auto"
            onClick={handleCreateProgramButton}
          >
            <Plus className="w-5 h-5" />
            Create Program
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
            Approved Programs
          </button>
          <button
            className={`relative px-4 py-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Programs
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-red-500">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by program title..."
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
              {/* Clear Icon */}
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

      {/* Programs Table */}
      <div className="rounded-lg">
        <ProgramsTable searchInput={searchInput} filters={filters} />
      </div>
    </div>
  );
};

export default Programs;
