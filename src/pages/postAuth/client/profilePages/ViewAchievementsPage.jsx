import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ViewAchievementsPage = () => {
  const navigate = useNavigate();

  // Dummy achievements data for UI backbone
  const achievements = [
    {
      _id: "1",
      title: "First Place in Hackathon",
      description: "Won the national hackathon in 2024",
      dateAchieved: "2024-06-15T00:00:00.000Z",
      hours: 10,
    },
    {
      _id: "2",
      title: "Best Project Award",
      description: "Received the best project award in IT department",
      dateAchieved: "2023-12-01T00:00:00.000Z",
      hours: 15,
    },
  ];

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

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">My Certificates</h2>

      {achievements.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement._id}
              className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {achievement.title}
                </h3>
                <p className="text-gray-600">{achievement.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(achievement.dateAchieved).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-bold text-nucolor3">
                  {achievement.hours} Hours
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          You have not achieved anything yet.
        </div>
      )}
    </div>
  );
};

export default ViewAchievementsPage;