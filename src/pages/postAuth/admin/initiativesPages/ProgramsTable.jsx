// src/pages/postAuth/admin/initiativesPages/ProgramsTable.jsx

import { useEffect, useState, useCallback } from "react";
import api from "../../../../api";
import ProgramsTableMap from "./ProgramsTableMap";
import PropTypes from "prop-types";

const ProgramsTable = ({ searchInput, filters }) => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = filters.isApproved
        ? "/program/approved/all"
        : "/program/unapproved/all";
      const response = await api.get(endpoint);
      console.log("API response data:", response.data);

      // Ensure that response.data is an array
      const programsData = Array.isArray(response.data)
        ? response.data
        : response.data.programs;

      if (!Array.isArray(programsData)) {
        console.error("Expected an array of programs but got:", programsData);
        setPrograms([]);
      } else {
        setPrograms(programsData);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, [filters.isApproved]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  useEffect(() => {
    if (!Array.isArray(programs)) {
      console.error("Programs is not an array:", programs);
      setFilteredPrograms([]);
      return;
    }
    // Filter programs based on search input
    const filtered = programs.filter((program) => {
      const title = program.title ? program.title.toLowerCase() : "";
      const description = program.description
        ? program.description.toLowerCase()
        : "";
      const search = searchInput.toLowerCase();

      return title.includes(search) || description.includes(search);
    });

    setFilteredPrograms(filtered);
  }, [searchInput, programs]);

  return (
    <div className="mt-6 card bg-white max-w max-h ">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="select-none">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created By</th>
              {!filters.isApproved && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            <ProgramsTableMap
              programs={filteredPrograms}
              loading={loading}
              isApproved={filters.isApproved}
              setPrograms={setPrograms} // Pass setPrograms to update state after approve/reject
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

ProgramsTable.propTypes = {
  searchInput: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    isApproved: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProgramsTable;
