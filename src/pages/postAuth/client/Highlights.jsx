import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Highlights = () => {
    const data = {
        labels: [
            'Dentistry',
            'Optometry',
            'Health Sciences',
            'Accountancy',
            'IT',
            'Arts and Sciences',
            'Architecture',
            'SHS'
        ],
        datasets: [
            {
                label: 'Departments',
                data: [15, 10, 12, 13, 20, 8, 12, 10], // Example data
                backgroundColor: [
                    '#007bff',
                    '#28a745',
                    '#17a2b8',
                    '#dc3545',
                    '#ffc107',
                    '#6f42c1',
                    '#fd7e14',
                    '#20c997'
                ],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Statistics',
            },
        },
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 py-8 px-4">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">HIGHLIGHTS</h1>
            <h2 className="text-xl font-semibold text-blue-700 mb-6">CLASSEMENT</h2>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full mb-8">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="md:w-1/2">
                        <Pie data={data} options={options} />
                    </div>
                </div>
            </div>

            {/* Top Performing Department */}
            <div className="bg-white p-4 rounded-lg shadow-md max-w-4xl w-full text-center">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/NU_shield.svg/1200px-NU_shield.svg.png"
                    alt="National University College of Dentistry"
                    className="w-20 h-20 mb-4"
                />
                <h3 className="text-lg font-bold">TOP PERFORMING DEPARTMENT</h3>
                <p className="text-gray-700 mt-2">
                    To honor the significant contributions of this department to the [name of activity] on [date of event].
                </p>
            </div>
        </div>
    );
};

export default Highlights;
