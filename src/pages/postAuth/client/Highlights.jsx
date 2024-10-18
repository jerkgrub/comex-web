import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { BarChart2 } from "lucide-react"; // Add Lucide icons
import Skeleton from "react-loading-skeleton"; // Import Skeleton for loading states
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS
import api from "../../../api"; // Assuming you are using Axios for API calls

const Highlights = () => {
  // State to store the data from the API and loading status
  const [activityData, setActivityData] = useState(null); // Initialize with null to show loading state
  const [topDepartment, setTopDepartment] = useState("");
  const [topDepartmentColor, setTopDepartmentColor] = useState("#FFFFFF"); // Store top department color
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await api.get("/activity/highlights"); // Adjust API path if necessary
        const fetchedActivities = response.data.Activities; // Ensure the data structure matches your backend

        setActivityData(fetchedActivities);
        findTopPerformingDepartment(fetchedActivities);
      } catch (error) {
        console.error("Error fetching highlights:", error);
        setActivityData([]); // If there's an error, set activities to an empty array to show a fallback state
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []);

  // Calculate the department with the most activities
  const findTopPerformingDepartment = (activities) => {
    // Count the occurrences of each department
    const departmentCount = activities.reduce((acc, activity) => {
      const department = activity.department;
      acc[department] = (acc[department] || 0) + 1; // Count the occurrences of each department
      return acc;
    }, {});

    // Find the department with the most activities
    const topDept = Object.keys(departmentCount).reduce((a, b) =>
      departmentCount[a] > departmentCount[b] ? a : b
    );

    setTopDepartment(topDept);
    setTopDepartmentColor(getDepartmentGradient(topDept)); // Set the gradient of the top department
  };

  // Prepare data for the Pie chart based on fetched activities
  const labels = [
    ...new Set(activityData?.map((activity) => activity.department)),
  ]; // Unique department labels
  const dataCounts = labels.map(
    (department) =>
      activityData?.filter((activity) => activity.department === department)
        .length
  );

  // Color mapping for departments
  const colorMapping = {
    "School of Health Sciences": ["#4bbd6a", "#227a3a"],
    "School of Information Technology": ["#00B3E6", "#33CCFF"], // Gradient from darker to lighter blue
    "School of Optometry": ["#FFB399", "#FFD1B3"], // Gradient from darker to lighter pink
    // Add more departments as needed
  };

  // Helper to get the gradient of a department
  const getDepartmentGradient = (department) => {
    const colors = colorMapping[department] || ["#CCCCCC", "#E0E0E0"]; // Fallback color
    return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Departments",
        data: dataCounts, // Count of activities per department
        backgroundColor: labels.map(
          (label) => colorMapping[label]?.[0] || "#CCCCCC"
        ), // Use the primary color of the gradient for the pie chart with a fallback color
        borderColor: "#ffffff", // Add border color for better visibility
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#333", // Ensure legend text is visible
        },
      },
      title: {
        display: true,
        text: "Department Activity Statistics",
        color: "#333", // Ensure title text is visible
        font: {
          size: 20,
          weight: "bold",
          family: "'Helvetica Neue', 'Arial', sans-serif",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    interaction: {
      mode: false, // Disable all interaction modes
    },
    events: [], // Disable all events like clicks, hovers, etc.
    animation: {
      duration: 0, // Disable animations if needed
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-between min-h-[91.3vh] bg-gradient-to-b from-gray-50 to-gray-100/">
        <div className="max-w-7xl mx-auto p-8 flex-grow my-4">
          <h1 className="text-4xl font-extrabold mb-12 text-blue-900 text-center">
            <Skeleton width={300} />
          </h1>
          <div className="bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC] text-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-6xl mb-8 md:mb-12 mx-auto">
            <h2 className="text-3xl font-semibold text-center -mb-9">
              <Skeleton width={250} />
            </h2>
            <div className="relative w-full h-[400px] flex justify-center items-center">
              <Skeleton height={300} width={`100%`} />
            </div>
          </div>

          <Skeleton height={150} width={`100%`} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-[91.3vh] bg-gradient-to-b from-gray-50 to-gray-100/">
      <div className="max-w-7xl mx-auto p-8 flex-grow my-4">
        {/* Section Title */}
        <h1 className="text-4xl font-extrabold mb-12 text-blue-900 text-center">
          Highlights 📊
        </h1>

        {/* Chart Section */}
        <div className="bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC] text-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-6xl mb-8 md:mb-12 mx-auto">
          <h2 className="text-3xl font-semibold text-center -mb-9">
            Department Classification
          </h2>
          <div className="relative w-full h-[400px] flex justify-center items-center">
            {activityData === null ? (
              <Skeleton height={300} width={`100%`} />
            ) : (
              <Pie data={data} options={options} />
            )}
          </div>
        </div>

        {/* Top Performing Department */}
        {topDepartment ? (
          <div
            className="text-white p-6 rounded-2xl shadow-lg w-full max-w-3xl text-center mx-auto mt-12"
            style={{ background: topDepartmentColor }} // Apply the dynamic gradient background
          >
            <div className="flex justify-center items-center mb-4">
              <BarChart2 className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Top Performing Department</h3>
            <p className="text-lg mt-2">{topDepartment}</p>
            <p className="text-sm opacity-80 mt-2">
              This department made the most significant contributions with its
              number of activities.
            </p>
          </div>
        ) : activityData === null ? (
          <Skeleton height={150} width={`100%`} />
        ) : null}
      </div>
    </div>
  );
};

export default Highlights;
