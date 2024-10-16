import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import PropTypes from 'prop-types'; // Added for prop type checking
import api from '../../../api'; // Adjust the path based on your project structure
import { showToast } from '../../../components/Toast'; // Assuming you have this utility to show toasts

const AppraisalTableMap = ({ credits, loading, setCredits }) => {
  const navigate = useNavigate();
  const [processingIds, setProcessingIds] = useState([]); // Manage processing state per credit

  // Handler for viewing the appraisal details
  const handleViewCredit = (credit) => {
    navigate(`/admin/review-evaluation-forms/view/${credit._id}`);
  };

  // Approve Credit Handler
  const handleApproveCredit = async (credit) => {
    if (typeof setCredits !== 'function') {
      console.error('setCredits prop is not a function');
      showToast('error', 'Internal error: Unable to update credits.');
      return;
    }

    setProcessingIds((prev) => [...prev, credit._id]);
    console.log(`Approving credit with ID: ${credit._id}`);

    try {
      const response = await api.put(`/credit/approve/${credit._id}`);
      
      // Optional: Check response status or data if necessary
      if (response.status === 200) {
        showToast('success', 'Approved'); // Show approval toast

        // Update the UI: Remove the approved credit from the list
        setCredits((prevCredits) =>
          prevCredits.filter((item) => item._id !== credit._id)
        );
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error approving credit:', error);
      showToast('error', 'Failed to approve');
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== credit._id));
    }
  };

  // Reject Credit Handler
  const handleRejectCredit = async (credit) => {
    if (typeof setCredits !== 'function') {
      console.error('setCredits prop is not a function');
      showToast('error', 'Internal error: Unable to update credits.');
      return;
    }

    setProcessingIds((prev) => [...prev, credit._id]);
    console.log(`Rejecting credit with ID: ${credit._id}`);

    try {
      const response = await api.put(`/credit/reject/${credit._id}`);
      
      // Optional: Check response status or data if necessary
      if (response.status === 200) {
        showToast('success', 'Rejected'); // Show rejection toast

        // Update the UI: Remove the rejected credit from the list
        setCredits((prevCredits) =>
          prevCredits.filter((item) => item._id !== credit._id)
        );
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error rejecting credit:', error);
      showToast('error', 'Failed to reject');
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== credit._id));
    }
  };

  if (loading) {
    // Render simplified skeleton placeholders when data is loading
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <tr className="hover:bg-gray-100" key={index}>
            <th>
              <label>
                <Skeleton circle height={24} width={24} />
              </label>
            </th>
            <td>
              <Skeleton width={150} height={20} />
            </td>
            <td>
              <Skeleton width={100} height={20} />
            </td>
            <td>
              <Skeleton width={80} height={20} />
            </td>
            <td>
              <div className='flex flex-row gap-3'>
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }

  if (!credits || credits.length === 0) {
    return (
      <tr>
        <td colSpan="5" className="text-center">
          No credits found.
        </td>
      </tr>
    );
  }

  return (
    <>
      {credits.map((credit) => {
        const user = credit.userId || {};
        const fullName = `${user.firstName || 'First'} ${user.lastName || 'Last'}`;
        const email = user.email || 'No email';
        const isProcessing = processingIds.includes(credit._id);

        return (
          <tr className="hover:bg-gray-100" key={credit._id}>
            <th>
              <label>
                {/* If you intend to have a checkbox or similar, add it here */}
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar select-none pointer-events-none">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      className="rounded-full"
                      src={user.avatar || '/default-avatar.png'}
                      alt={fullName}
                      onError={(e) => { e.target.src = '/default-avatar.png'; }}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{fullName}</div>
                  <div className="text-sm opacity-50">{email}</div>
                </div>
              </div>
            </td>
            <td>{credit.title || 'No Title'}</td>
            <td>{credit.totalHoursRendered !== undefined ? credit.totalHoursRendered : 'N/A'}</td>
            <td>
              <div className='flex gap-3'>
                <button
                  className="btn btn-ghost btn-md"
                  onClick={() => handleViewCredit(credit)}
                  disabled={isProcessing}
                  aria-label={`View details for ${fullName}`}
                >
                  View
                </button>
                <button
                  className="btn btn-rounded bg-lime-200 btn-md"
                  onClick={() => handleApproveCredit(credit)}
                  disabled={isProcessing}
                  aria-label={`Approve credit for ${fullName}`}
                >
                  Approve
                </button>
                <button
                  className="btn btn-rounded bg-red-400 btn-md"
                  onClick={() => handleRejectCredit(credit)}
                  disabled={isProcessing}
                  aria-label={`Reject credit for ${fullName}`}
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

// Adding PropTypes for better type checking and developer experience
AppraisalTableMap.propTypes = {
  credits: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.shape({
        avatar: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        department: PropTypes.string,
        usertype: PropTypes.string,
        isActivated: PropTypes.bool,
      }),
      title: PropTypes.string,
      totalHoursRendered: PropTypes.number,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  setCredits: PropTypes.func.isRequired, // Ensure setCredits is a function
};

export default AppraisalTableMap;
