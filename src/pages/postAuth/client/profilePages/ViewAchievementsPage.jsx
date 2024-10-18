import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react"; // Import Download icon from lucide-react
import { Accordion } from "flowbite-react"; // Import Flowbite Accordion
import api from "../../../../api"; // Import API for fetching data
import useFetchUserData from "../../../../components/hooks/useFetchUserData";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS

const ViewAchievementsPage = () => {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useFetchUserData(); // Fetch user data to get user ID
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching credits

  // Fetch the credits based on the user ID from the backend
  useEffect(() => {
    const fetchCredits = async () => {
      if (user._id) {
        try {
          const response = await api.get(`/credit/certificates/${user._id}`);
          setAchievements(response.data.approvedCredits);
        } catch (error) {
          console.error("Error fetching credits:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!userLoading) {
      fetchCredits();
    }
  }, [user, userLoading]);

  return (
    <div className="p-8 min-h-screen">
      {/* Top Section: Back Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/client/profile`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
        Participated Activities
      </h2>

      {/* Display skeletons or actual achievements */}
      {loading ? (
        <Accordion collapseAll>
          {Array(5)
            .fill()
            .map((_, index) => (
              <Accordion.Panel key={index}>
                <Accordion.Title className="flex justify-between items-center">
                  <div className="flex-1">
                    <Skeleton width={`80%`} height={20} />
                  </div>
                  <Skeleton width={120} height={20} />
                </Accordion.Title>
                <Accordion.Content>
                  <Skeleton width={`90%`} height={20} />
                  <Skeleton width={`40%`} height={20} className="mt-2" />
                  <Skeleton width={120} height={30} className="mt-4" />
                </Accordion.Content>
              </Accordion.Panel>
            ))}
        </Accordion>
      ) : achievements.length > 0 ? (
        <Accordion collapseAll>
          {achievements.map((achievement) => (
            <Accordion.Panel key={achievement._id}>
              <Accordion.Title className="flex justify-between items-center">
                <div className="flex-1">{achievement.title}</div>
                <span className="text-sm text-gray-500">
                  Date Received: {new Date(achievement.endDate).toLocaleDateString()}
                </span>
              </Accordion.Title>
              <Accordion.Content>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">
                    Description: {achievement.facultyReflection || "No description available."}
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <Download className="w-5 h-5 mr-1" /> Download PDF
                  </button>
                </div>
                <div className="text-gray-600">
                  Total Hours Rendered: {achievement.totalHoursRendered || 0} hours
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      ) : (
        <div className="text-center text-gray-600">
          You have not participated in any activities yet.
        </div>
      )}
    </div>
  );
};

export default ViewAchievementsPage;
