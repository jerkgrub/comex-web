import {
  BookCopy,
  CalendarClock,
  ClipboardCheck,
  FileText,
  SquareCheckBig,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DataCard from "../../../../components/DataCard";
import DashboardTrackerTable from "../../../../components/DashboardTrackerTable";
import HighestEngagementParticipation from "../../../../components/HighestEngagementParticipation";
import ActivitiesAccomplishedPerDepartment from "../../../../components/ActivitiesAccomplishedPerDepartment";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-200 space-y-8">
      {/* Label Section */}
      <h1 className="text-3xl font-bold">DASHBOARD</h1>

      {/* Data Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DataCard
          title="NSTP Hardcopy Requests"
          count={0}
          icon={<FileText size={40} />}
          color="border-red-300"
        />
        <DataCard
          title="Pending Activities"
          count={0}
          icon={<CalendarClock size={40} />}
          color="border-[#E7DF94]"
        />
        <DataCard
          title="Pending Applications"
          count={0}
          icon={<ClipboardCheck size={40} />}
          color="border-green-300"
        />
      </div>

      {/* Tracker Table and Charts Section */}
      <div className="space-y-6">
        <DashboardTrackerTable />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col h-auto">
            <HighestEngagementParticipation />
          </div>
          <div className="flex flex-col h-auto">
            <ActivitiesAccomplishedPerDepartment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;