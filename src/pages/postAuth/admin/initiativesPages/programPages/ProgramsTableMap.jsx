// src/pages/postAuth/admin/initiativesPages/ProgramsTableMap.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../../api';
import { showToast } from '../../../../../components/Toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProgramsTableMap = ({ programs, loading, isApproved, setPrograms }) => {
  const [processingIds, setProcessingIds] = useState([]);

  const handleApproveProgram = async programId => {
    setProcessingIds(prev => [...prev, programId]);

    try {
      const response = await api.put(`/program/approve/${programId}`);
      if (response.status === 200) {
        showToast('success', 'Program approved successfully');
        // Remove the approved program from the list
        setPrograms(prevPrograms => prevPrograms.filter(program => program._id !== programId));
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error approving program:', error);
      showToast('error', 'Failed to approve program');
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== programId));
    }
  };

  const handleRejectProgram = async programId => {
    setProcessingIds(prev => [...prev, programId]);

    try {
      const response = await api.delete(`/program/${programId}`);
      if (response.status === 200) {
        showToast('success', 'Program rejected successfully');
        // Remove the rejected program from the list
        setPrograms(prevPrograms => prevPrograms.filter(program => program._id !== programId));
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error rejecting program:', error);
      showToast('error', 'Failed to reject program');
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== programId));
    }
  };

  if (loading) {
    // Render skeleton placeholders
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            <td>
              <Skeleton height={20} width={`80%`} />
            </td>
            <td>
              <Skeleton height={20} width={`80%`} />
            </td>
            <td>
              <Skeleton height={20} width={`60%`} />
            </td>
            {!isApproved && (
              <td>
                <div className="flex gap-2">
                  <Skeleton width={80} height={30} />
                  <Skeleton width={80} height={30} />
                </div>
              </td>
            )}
          </tr>
        ))}
      </>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <tr>
        <td colSpan={isApproved ? 3 : 4} className="text-center py-4">
          No programs found.
        </td>
      </tr>
    );
  }

  return (
    <>
      {programs.map(program => {
        const isProcessing = processingIds.includes(program._id);

        return (
          <tr key={program._id}>
            <td>{program.title}</td>
            <td>{program.description}</td>
            <td>{program.createdBy}</td>
            {!isApproved && (
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleApproveProgram(program._id)}
                    disabled={isProcessing}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleRejectProgram(program._id)}
                    disabled={isProcessing}
                  >
                    Reject
                  </button>
                </div>
              </td>
            )}
          </tr>
        );
      })}
    </>
  );
};

ProgramsTableMap.propTypes = {
  programs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      createdBy: PropTypes.string
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  isApproved: PropTypes.bool.isRequired,
  setPrograms: PropTypes.func.isRequired
};

export default ProgramsTableMap;
