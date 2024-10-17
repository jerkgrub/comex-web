import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Dummy data for now
const dummyActivities = [
  { title: "Angel's walk", extensionServices: "", collegeDriven: "", institutional: 8, capacityBuilding: "" },
  { title: "ICC_2024", extensionServices: 8, collegeDriven: "", institutional: "", capacityBuilding: "" },
  { title: "Project 123", extensionServices: "", collegeDriven: 12, institutional: "", capacityBuilding: "" },
  { title: "Buwan ng Wika 2024", extensionServices: "", collegeDriven: "", institutional: "", capacityBuilding: 8 },
  { title: "Mental Health Awareness", extensionServices: "", collegeDriven: "", institutional: 12, capacityBuilding: "" },
  { title: "Coastal Clean Up", extensionServices: "", collegeDriven: "", institutional: "", capacityBuilding: 12 },
  { title: "Total number of hours rendered", extensionServices: 8, collegeDriven: 12, institutional: 20, capacityBuilding: 20, isTotal: true },
  { title: "Equivalent Points", extensionServices: 1.5, collegeDriven: 3.5, institutional: 7, capacityBuilding: 4, isTotal: true },
];

const ViewParticipatedActivitiesPage = () => {
  const navigate = useNavigate();

  // Dummy data for the progress meters
  const accumulatedHours = 40;
  const totalRequiredHours = 78;
  const equivalentTotalPoints = 16;
  const maxPoints = 18;

  return (
    <div className="p-8 min-h-screen">
      {/* Back Button */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-blue-700 text-black">
              <th className="p-4 text-left border">Title Of Activities/Project/Program</th>
              <th className="p-4 text-left border">Extension Services</th>
              <th className="p-4 text-left border">College Driven</th>
              <th className="p-4 text-left border">Institutional</th>
              <th className="p-4 text-left border">Capacity Building Services</th>
            </tr>
          </thead>
          <tbody>
            {dummyActivities.map((activity, index) => (
              <tr
                key={index}
                className={`border ${activity.isTotal ? 'bg-blue-100 font-bold' : ''}`}
              >
                <td className="p-4 border">{activity.title}</td>
                <td className="p-4 border text-center">{activity.extensionServices || '-'}</td>
                <td className="p-4 border text-center">{activity.collegeDriven || '-'}</td>
                <td className="p-4 border text-center">{activity.institutional || '-'}</td>
                <td className="p-4 border text-center">{activity.capacityBuilding || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Progress Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Accumulated Hours of Community Service */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Accumulated Hours of Community Service
          </h3>
          <div className="relative w-full h-32 flex justify-center items-center">
            <div className="absolute w-28 h-28 rounded-full border-4 border-gray-300"></div>
            <div className="absolute w-28 h-28 rounded-full border-8 border-blue-700" style={{ borderTopColor: 'transparent' }}></div>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold">{accumulatedHours}/{totalRequiredHours} hrs</span>
              <span className="text-sm text-gray-500">
                {((accumulatedHours / totalRequiredHours) * 100).toFixed(0)}% Completed
              </span>
            </div>
          </div>
        </div>

        {/* Equivalent Total Points */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Equivalent Total Points
          </h3>
          <div className="text-4xl font-bold text-nucolor3 mb-2">
            {equivalentTotalPoints}/{maxPoints}
          </div>
          <div className="text-sm text-gray-500">
            {((equivalentTotalPoints / maxPoints) * 100).toFixed(0)}% Completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewParticipatedActivitiesPage;