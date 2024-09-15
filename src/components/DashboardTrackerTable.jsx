import React from "react";
import ButtonGeneric from "./inputs/ButtonGeneric";
import { ArrowDownToLine } from "lucide-react";

const DashboardTrackerTable = () => {
  return (
    <div className="bg-white rounded-lg overflow-x-auto w-full p-6 shadow-lg">
      <div className="flex flex-row justify-between items-center mb-4 border-b p-3">
        <p className="font-bold text-xl">ENGAGEMENT TRACKER</p>
        <ButtonGeneric
          icon={ArrowDownToLine}
          label={"Generate Report"}
          className="text-white p-2 rounded-md bg-[#485ce2]"
        />
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Title of Activity</th>
            <th>Activity Type</th>
            <th>Registered Users</th>
            <th>Hours</th>
            <th>Progress</th>
            <th>Engagement Rate</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            {/* index number */}
            <th>1</th>
            {/* {startDate} - {endDate} */}
            <td>05/01/24 - 05/02/24</td>
            {/* {title} */}
            <td>Coastal Cleanup</td>
            {/* {type} */}
            <td>Institutional</td>
            {/* total number of {respondents} */} 
            <td>222</td>
            {/* {hours} */}
            <td>5</td>
            {/* {progress} */}
            <td>Completed</td>
            {/* % or number of respondents/total USERS IN THE SYSTEM = engagement rate */}
            <td>12.33%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTrackerTable;
