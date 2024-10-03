import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewOneCredit = () => {
  const { creditid } = useParams(); // Retrieve credit ID from the URL params
  const [credit, setCredit] = useState(null); // State to hold credit details
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Use navigate for back button

  // Fetch the credit details when the component mounts
  useEffect(() => {
    const fetchCreditDetails = async () => {
      try {
        console.log('Fetching credit details for credit ID:', creditid); // Log the credit ID to ensure it's correct
        const response = await axios.get(`https://comex-server.vercel.app/api/credit/${creditid}`);
        console.log('Credit data:', response.data); // Log the response to see what is being fetched
        setCredit(response.data.credit);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching credit:', error); // Log the error for debugging
        setError('Failed to fetch credit details.');
        setLoading(false);
      }
    };

    fetchCreditDetails();
  }, [creditid]);

  if (loading) {
    return <div>Loading credit details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!credit) {
    return <div>No credit details available for this entry.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-blue-100 rounded-lg shadow-lg">
      {/* Back Button */}
      <button
        className="text-blue-600 underline mb-4"
        onClick={() => navigate(-1)} // Go back to previous page
      >
        Go Back
      </button>

      <h2 className="text-3xl font-bold mb-4">Credit Details</h2>

      <div className="mb-4">
        <label className="block text-lg font-bold mb-2">Activity ID</label>
        <p className="p-2 border rounded-lg bg-white">{credit.activityId}</p>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-bold mb-2">User ID</label>
        <p className="p-2 border rounded-lg bg-white">{credit.userId}</p>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-bold mb-2">Total Hours Rendered</label>
        <p className="p-2 border rounded-lg bg-white">{credit.totalHoursRendered}</p>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-bold mb-2">Faculty Reflection</label>
        <p className="p-2 border rounded-lg bg-white">{credit.facultyReflection}</p>
      </div>

      {credit.supportingDocuments && (
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Supporting Documents</label>
          <p className="p-2 border rounded-lg bg-white">
            <a href={`path_to_documents/${credit.supportingDocuments}`} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewOneCredit;