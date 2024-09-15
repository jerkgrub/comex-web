import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default Calendar CSS
import './CustomCalendar.css'; // Custom CSS for enhanced styling

const ViewAllActivities = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="flex w-scren min-h-[91.3vh] py-9 flex-col lg:flex-row gap-8">
            {/* Left side: List of Upcoming Activities */}
            <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">List of Upcoming Activities</h2>
                <div className="mb-6 p-4 border-2 border-gray-300 rounded-lg flex flex-row items-center gap-6">
                    <div className="text-center">
                        <p className="text-lg font-semibold text-indigo-600">FEB</p>
                        <p className="text-5xl font-extrabold">6</p>
                    </div>
                    <div className="flex-grow">
                        <p className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium inline-block">INSTITUTIONAL</p>
                        <p className="text-lg text-gray-700 mt-2 font-semibold">4:00 pm - 7:30 pm</p>
                        <p className="text-xl font-bold text-gray-900">COASTAL CLEAN-UP</p>
                    </div>
                </div>
                <div className="mb-6 p-4 border-2 border-gray-300 rounded-lg flex flex-row items-center gap-6">
                    <div className="text-center">
                        <p className="text-lg font-semibold text-indigo-600">FEB</p>
                        <p className="text-5xl font-extrabold">26</p>
                    </div>
                    <div className="flex-grow">
                        <p className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium inline-block">INSTITUTIONAL</p>
                        <p className="text-lg text-gray-700 mt-2 font-semibold">12:30 pm - 2:00 pm</p>
                        <p className="text-xl font-bold text-gray-900">Community Service: A Beacon of Hope for Street Children</p>
                    </div>
                </div>
            </div>

            {/* Right side: Calendar */}
            <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">February 2024</h2>
                <div className="border-2 border-gray-300 p-4 rounded-lg">
                    <Calendar
                        onChange={onChange}
                        value={date}
                        className="clean-calendar"
                        showNavigation={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewAllActivities;