// src/pages/postAuth/admin/AppraisalTable.jsx

import { useEffect, useState } from "react";
import api from "../../../api";
import AppraisalTableMap from "./AppraisalTableMap";

const AppraisalTable = ({ searchInput, filters, appraisalType }) => {
  const [credits, setCredits] = useState(null); // Initialize credits as null
  const [filteredCredits, setFilteredCredits] = useState([]); // State for filtered credits
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        // Fetch credits based on appraisalType and status 'pending'
        const response = await api.get(`/credit/pending/${appraisalType}`);
        const data = response.data;
        if (data.credits && Array.isArray(data.credits)) { // Changed from data.Credits to data.credits
          setCredits(data.credits);
          setFilteredCredits(data.credits); // Initialize filtered credits
        } else {
          console.error("Expected an array but got:", data);
          setCredits([]); // Set credits to an empty array on error
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
        setCredits([]); // Set credits to an empty array on error
      } finally {
        setLoading(false); // Set loading to false when API call completes
      }
    };

    fetchCredits();
  }, [appraisalType]);

  useEffect(() => {
    if (credits === null) {
      // Credits are still loading; do not update filteredCredits
      return;
    }
    // Filter credits based on search input and filters
    const filtered = credits.filter((credit) => {
      const applicantName = `${credit.userId.firstName} ${credit.userId.lastName}`.toLowerCase();
      const applicantEmail = credit.userId.email.toLowerCase();
      const matchesSearch =
        applicantName.includes(searchInput.toLowerCase()) ||
        applicantEmail.includes(searchInput.toLowerCase());

      const matchesDepartment =
        filters.department === "All Departments" || filters.department === ""
          ? true
          : credit.userId.department === filters.department;

      const matchesUserType =
        filters.userType === "All Usertypes" || filters.userType === ""
          ? true
          : credit.userId.usertype === filters.userType;

      const matchesAccountStatus =
        filters.accountStatus === "Activated"
          ? credit.userId.isActivated
          : !credit.userId.isActivated;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesUserType &&
        matchesAccountStatus
      );
    });
    setFilteredCredits(filtered);
  }, [searchInput, filters, credits]);

  return (
    <div className="mt-6 card bg-white max-w max-h ">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="select-none">
            <tr>
              <th>
                <label>
                  {/* Uncomment the checkbox if needed */}
                  {/* <input type="checkbox" className="checkbox" /> */}
                </label>
              </th>
              <th>Applicant Name</th>
              <th>Activity Participated</th>
              <th>Hours Rendered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AppraisalTableMap credits={filteredCredits} loading={loading} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppraisalTable;
