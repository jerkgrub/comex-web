import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import ButtonGeneric from './inputs/ButtonGeneric';
import { ArrowDownToLine } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ActivitiesAccomplishedPerDepartment = () => {
  const data = {
    labels: ['Department 1', 'Dept 2', 'Dept 3', 'Dept 4', 'Dept 5'],
    datasets: [
      {
        label: 'Completed',
        data: [123, 120, 143, 1173, 111],
        backgroundColor: '#6B48FF', // Purple
        hoverBackgroundColor: '#6B48FF',
      },
      {
        label: 'Ongoing',
        data: [80, 90, 60, 150, 75],
        backgroundColor: '#4AB0FF', // Blue
        hoverBackgroundColor: '#4AB0FF',
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Horizontal bar chart
    plugins: {
      legend: {
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg w-full p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-base">ACTIVITIES ACCOMPLISHED PER DEPARTMENT</p>
        <ButtonGeneric
          icon={ArrowDownToLine}
          label="Generate Report"
          className="text-white p-2 rounded-md bg-[#485ce2]"
        />
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ActivitiesAccomplishedPerDepartment;