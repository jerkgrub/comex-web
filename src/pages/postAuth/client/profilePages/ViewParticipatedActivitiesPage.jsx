import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowDownToLine } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import useFetchUserData from "../../../../components/hooks/useFetchUserData";
import api from "../../../../api";
import { Circle } from "rc-progress";

const ViewParticipatedActivitiesPage = () => {
  const { user, loading: userLoading } = useFetchUserData();
  const [approvedCredits, setApprovedCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && user?._id) {
      const fetchApprovedCredits = async () => {
        try {
          const { data } = await api.get(`/credit/approved-credits/${user._id}`);
          const { approvedCredits } = data;

          if (Array.isArray(approvedCredits)) {
            setApprovedCredits(approvedCredits);
          } else {
            throw new Error("Unexpected response format: approvedCredits is not an array.");
          }

          setIsLoading(false);
        } catch (err) {
          setError("Failed to load data");
          setIsLoading(false);
        }
      };

      fetchApprovedCredits();
    }
  }, [user, userLoading]);

  // Calculate total hours for each type using useMemo
  const totals = useMemo(() => {
    const initialTotals = {
      institutional: 0,
      extensionServices: 0,
      collegeDriven: 0,
      capacityBuilding: 0,
    };

    approvedCredits.forEach((credit) => {
      switch (credit.type) {
        case "Institutional":
          initialTotals.institutional += credit.totalHoursRendered || 0;
          break;
        case "Extension Services":
          initialTotals.extensionServices += credit.totalHoursRendered || 0;
          break;
        case "College Driven":
          initialTotals.collegeDriven += credit.totalHoursRendered || 0;
          break;
        case "Capacity Building":
          initialTotals.capacityBuilding += credit.totalHoursRendered || 0;
          break;
        default:
          break;
      }
    });

    return initialTotals;
  }, [approvedCredits]);

  // Define totalAccumulatedHours using useMemo
  const totalAccumulatedHours = useMemo(() => {
    return (
      totals.institutional +
      totals.extensionServices +
      totals.collegeDriven +
      totals.capacityBuilding
    );
  }, [totals]);

  // Function to get points based on hours
  const getPointsForHours = (hours) => {
    if (hours >= 7 && hours <= 16.99)
      return {
        extensionServices: 1.5,
        collegeDriven: 3.5,
        institutional: 3.5,
        capacityBuilding: 2,
      };
    if (hours >= 17 && hours <= 48.99)
      return {
        extensionServices: 3,
        collegeDriven: 7,
        institutional: 7,
        capacityBuilding: 4,
      };
    if (hours >= 49 && hours <= 64.99)
      return {
        extensionServices: 4.5,
        collegeDriven: 10.5,
        institutional: 10.5,
        capacityBuilding: 6,
      };
    if (hours >= 65 && hours <= 77.99)
      return {
        extensionServices: 6,
        collegeDriven: 14,
        institutional: 14,
        capacityBuilding: 8,
      };
    if (hours >= 78)
      return {
        extensionServices: 7.5,
        collegeDriven: 18,
        institutional: 18,
        capacityBuilding: 10,
      };
    return {
      extensionServices: 0,
      collegeDriven: 0,
      institutional: 0,
      capacityBuilding: 0,
    };
  };

  // Get equivalent points
  const equivalentPoints = {
    extensionServices: getPointsForHours(totals.extensionServices)
      .extensionServices,
    collegeDriven: getPointsForHours(totals.collegeDriven).collegeDriven,
    institutional: getPointsForHours(totals.institutional).institutional,
    capacityBuilding: getPointsForHours(totals.capacityBuilding).capacityBuilding,
  };

  // Calculate the total equivalent points
  const equivalentTotalPoints = useMemo(() => {
    return Object.values(equivalentPoints).reduce((acc, val) => acc + val, 0);
  }, [equivalentPoints]);

  const totalRequiredHours = 78;
  const maxPoints = 18;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Participated Activities Report", 14, 20);
    doc.text(`Member: ${user?.firstName} ${user?.lastName}`, 14, 30);
  
    autoTable(doc, {
      startY: 40,
      head: [
        [
          "Title Of Activities/Project/Program",
          "Extension Services",
          "College Driven",
          "Institutional",
          "Capacity Building Services",
        ],
      ],
      body: [
        ...approvedCredits.map((credit) => [
          credit.title || "-",
          credit.type === "Extension Services" ? credit.totalHoursRendered : "-",
          credit.type === "College Driven" ? credit.totalHoursRendered : "-",
          credit.type === "Institutional" ? credit.totalHoursRendered : "-",
          credit.type === "Capacity Building" ? credit.totalHoursRendered : "-",
        ]),
        // Adding Total Hours Rendered Row
        [
          "Total Hours Rendered",
          totals.extensionServices,
          totals.collegeDriven,
          totals.institutional,
          totals.capacityBuilding,
        ],
        // Adding Equivalent Points Row
        [
          "Equivalent Points",
          equivalentPoints.extensionServices,
          equivalentPoints.collegeDriven,
          equivalentPoints.institutional,
          equivalentPoints.capacityBuilding,
        ],
      ],
    });
    
    doc.text("Summary", 14, doc.previousAutoTable.finalY + 10);
    // Summary section
    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 20,
      body: [
        [
          "Accumulated Hours of Community Service",
          totalAccumulatedHours,
          "",
          "",
          "",
        ],
        ["Equivalent Total Points", equivalentTotalPoints, "", "", ""],
      ],
    });
  
    const filename = `REPORT_${user?.firstName || "User"}_${
      user?.lastName || "Report"
    }.pdf`;
    doc.save(filename);
  };
  

  if (isLoading || userLoading) {
    return (
      <div className="p-8 min-h-screen">
        <Skeleton height={50} width={250} className="mb-6" />
        <Skeleton height={400} width={"100%"} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="p-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/client/profile`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={generatePDF}
          className="btn bg-nucolor1 hover:bg-nucolor5 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-800"
        >
          <ArrowDownToLine className="w-5 h-5" />
          Generate Report
        </button>
      </div>

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
        Participated Activities
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-nucolor1 text-nucolor3">
              <th className="p-4 text-left border">
                Title Of Activities/Project/Program
              </th>
              <th className="p-4 text-left border">Extension Services</th>
              <th className="p-4 text-left border">College Driven</th>
              <th className="p-4 text-left border">Institutional</th>
              <th className="p-4 text-left border">
                Capacity Building Services
              </th>
            </tr>
          </thead>
          <tbody>
            {approvedCredits.map((credit, index) => (
              <tr key={index} className="border">
                <td className="p-4 border">{credit.title || "-"}</td>
                <td className="p-4 border text-center">
                  {credit.type === "Extension Services"
                    ? credit.totalHoursRendered
                    : "-"}
                </td>
                <td className="p-4 border text-center">
                  {credit.type === "College Driven"
                    ? credit.totalHoursRendered
                    : "-"}
                </td>
                <td className="p-4 border text-center">
                  {credit.type === "Institutional"
                    ? credit.totalHoursRendered
                    : "-"}
                </td>
                <td className="p-4 border text-center">
                  {credit.type === "Capacity Building"
                    ? credit.totalHoursRendered
                    : "-"}
                </td>
              </tr>
            ))}
            <tr className="bg-[#edfcff] font-bold">
              <td className="p-4 border">Total number of hours rendered</td>
              <td className="p-4 border text-center">
                {totals.extensionServices || "-"}
              </td>
              <td className="p-4 border text-center">
                {totals.collegeDriven || "-"}
              </td>
              <td className="p-4 border text-center">
                {totals.institutional || "-"}
              </td>
              <td className="p-4 border text-center">
                {totals.capacityBuilding || "-"}
              </td>
            </tr>

            <tr className="bg-[#edfcff] font-bold">
              <td className="p-4 border">Equivalent Points</td>
              <td className="p-4 border text-center">
                {equivalentPoints.extensionServices}
              </td>
              <td className="p-4 border text-center">
                {equivalentPoints.collegeDriven}
              </td>
              <td className="p-4 border text-center">
                {equivalentPoints.institutional}
              </td>
              <td className="p-4 border text-center">
                {equivalentPoints.capacityBuilding}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Updated Progress Bars using rc-progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Accumulated Hours Progress Bar */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Accumulated Hours of Community Service
          </h3>
          <div className="relative w-40 h-40 flex justify-center items-center">
            <Circle
              percent={(totalAccumulatedHours / totalRequiredHours) * 100}
              strokeWidth={4}
              strokeColor="#4A90E2"
              trailWidth={4}
              trailColor="#d9d9d9"
              className="w-full h-full"
            />
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold">
                {totalAccumulatedHours} hrs
              </span>
            </div>
          </div>
        </div>

        {/* Equivalent Total Points Progress Bar */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Equivalent Total Points
          </h3>
          <div className="relative w-40 h-40 flex justify-center items-center">
            <Circle
              percent={(equivalentTotalPoints / maxPoints) * 100}
              strokeWidth={4}
              strokeColor="#FF9800"
              trailWidth={4}
              trailColor="#d9d9d9"
              className="w-full h-full"
            />
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold text-nucolor3 mt-4">
                {equivalentTotalPoints}/{maxPoints}
              </span>
              <span className="text-sm text-gray-500">
                {((equivalentTotalPoints / maxPoints) * 100).toFixed(0)}% Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewParticipatedActivitiesPage;
