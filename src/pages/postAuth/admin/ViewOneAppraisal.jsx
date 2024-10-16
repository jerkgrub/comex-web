// src/pages/postAuth/admin/ViewOneAppraisal.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api'; // Adjust the path as necessary
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ArrowLeft } from 'lucide-react';

const ViewOneAppraisal = () => {
  const { appraisalId } = useParams();
  const navigate = useNavigate();
  const [appraisal, setAppraisal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch appraisal details on component mount
  useEffect(() => {
    const fetchAppraisal = async () => {
      try {
        const response = await api.get(`/credit/id/${appraisalId}`);
        setAppraisal(response.data.credit); // Adjust based on your API response structure
        console.log('Appraisal details:', response.data.credit);
      } catch (err) {
        console.error('Error fetching appraisal:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAppraisal();
  }, [appraisalId]);

  if (loading) {
    // Render skeletons while loading
    return (
      <div className="p-6">
        <Skeleton height={30} width={200} />
        <Skeleton count={10} />
      </div>
    );
  }

  if (error || !appraisal) {
    // Render error message
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p>Unable to fetch appraisal details. Please try again later.</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Destructure appraisal details for easier access
  const {
    isRegisteredEvent,
    userId,
    type,
    title,
    isVoluntary,
    beneficiaries,
    startDate,
    endDate,
    totalHoursRendered,
    supportingDocuments,
    facultyReflection,
    status,
    createdAt,
    updatedAt,
  } = appraisal;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mt-6">
      <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      <h1 className="text-3xl font-bold mb-4">Appraisal Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Is Voluntary:</strong> {isVoluntary ? 'Yes' : 'No'}</p>
          <p><strong>Beneficiaries:</strong> {beneficiaries}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>

        {/* Right Column */}
        <div>
          <p><strong>User Name:</strong> {`${userId.firstName} ${userId.middleName} ${userId.lastName}`}</p>
          <p><strong>Email:</strong> {userId.email}</p>
          <p><strong>Mobile Number:</strong> {userId.mobileNumber}</p>
          <p><strong>Department:</strong> {userId.department}</p>
          <p><strong>Registered Event:</strong> {isRegisteredEvent ? 'Yes' : 'No'}</p>
          <p><strong>Total Hours Rendered:</strong> {totalHoursRendered}</p>
          <p><strong>Faculty Reflection:</strong> {facultyReflection}</p>
          <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Supporting Documents */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Supporting Documents</h2>
        {supportingDocuments ? (
          <a href={supportingDocuments} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View Document
          </a>
        ) : (
          <p>No supporting documents provided.</p>
        )}
      </div>

      {/* Timestamps */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewOneAppraisal;
