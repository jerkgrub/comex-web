import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ButtonGeneric from "./inputs/ButtonGeneric";
import { ArrowDownToLine } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const HighestEngagementParticipation = () => {
  const data = {
    labels: ["Business", "Stores", "Others", "Others", "Others"],
    datasets: [
      {
        label: "Highest Engagement Participation",
        data: [30, 25, 15, 10, 20],
        backgroundColor: [
          "#6B48FF", // Business (Purple)
          "#4AB0FF", // Stores (Blue)
          "#CCCCCC", // Others (Gray)
          "#FFCE56", // Orange
          "#FF6384", // Pink
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-lg w-full p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-base">HIGHEST ENGAGEMENT PARTICIPATION</p>
        <ButtonGeneric
          icon={ArrowDownToLine}
          label="Generate Report"
          className="text-white p-2 rounded-md bg-[#485ce2]"
        />
      </div>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default HighestEngagementParticipation;