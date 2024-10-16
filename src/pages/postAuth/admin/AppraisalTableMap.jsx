// src/pages/postAuth/admin/AppraisalTableMap.jsx

import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AppraisalTableMap = ({ credits, loading }) => {
  const navigate = useNavigate();

  // Handler for viewing the appraisal details
  const handleViewCredit = (credit) => {
    navigate(`/admin/review-evaluation-forms/view/${credit._id}`);
  };

  // Placeholder handlers for Approve and Reject buttons
  const handleApproveCredit = (credit) => {
    // Implement approve functionality here
    console.log(`Approve credit with ID: ${credit._id}`);
    // Example: api.post(`/credit/approve/${credit._id}`)
  };

  const handleRejectCredit = (credit) => {
    // Implement reject functionality here
    console.log(`Reject credit with ID: ${credit._id}`);
    // Example: api.post(`/credit/reject/${credit._id}`)
  };

  if (loading) {
    // Render simplified skeleton placeholders when data is loading
    return (
      <>
        {Array(3)
          .fill()
          .map((_, index) => (
            <tr className="hover:bg-gray-100" key={index}>
              <th>
                <label>
                  {/* Skeleton for checkbox or avatar */}
                  <Skeleton circle={true} height={24} width={24} />
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

  if (credits.length === 0) {
    // No credits found
    return (
      <tr>
        <td colSpan="5" className="text-center">
          No credits found.
        </td>
      </tr>
    );
  }

  // Render actual credit data when loading is complete
  return (
    <>
      {credits.map((credit) => (
        <tr className="hover:bg-gray-100" key={credit._id}>
          <th>
            <label>
              {/* Uncomment the checkbox if needed */}
              {/* <input type="checkbox" className="checkbox" /> */}
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar select-none pointer-events-none">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    className="rounded-full"
                    src={credit.userId.avatar || '/default-avatar.png'}
                    alt={`${credit.userId.firstName} ${credit.userId.lastName}`}
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">
                  {credit.userId.firstName} {credit.userId.lastName}
                </div>
                <div className="text-sm opacity-50">{credit.userId.email}</div>
              </div>
            </div>
          </td>
          <td>{credit.title}</td>
          <td>{credit.totalHoursRendered}</td>
          <td>
            <div className='flex gap-3'>
              <button
                className="btn btn-ghost btn-md"
                onClick={() => handleViewCredit(credit)}
              >
                View
              </button>
              <button
                className="btn btn-rounded bg-lime-200 btn-md"
                onClick={() => handleApproveCredit(credit)}
              >
                Approve
              </button>
              <button
                className="btn btn-rounded bg-red-400 btn-md"
                onClick={() => handleRejectCredit(credit)}
              >
                Reject
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default AppraisalTableMap;
