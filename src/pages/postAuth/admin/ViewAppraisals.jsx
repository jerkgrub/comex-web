import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  BookOpen,
  Settings,
  Layers,
  ExternalLink,
} from "lucide-react";
import { useFetchActivities } from "../../../components/hooks/useFetchActivities";
import LoadingPage from "../../LoadingPage";

const cardData = [
  {
    id: 3,
    title: "Extension Services",
    icon: <Settings className="w-14 h-14" />,
    filter: "extension",
  },
  {
    id: 4,
    title: "Capacity Building",
    icon: <Layers className="w-14 h-14" />,
    filter: "capacity",
  },
];

const ViewAppraisals = () => {
  const navigate = useNavigate();
  const { activities, loading, error } = useFetchActivities();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  const normalizeActivityType = (type) => {
    switch (type.toLowerCase()) {
      case "extension services":
        return "extension";
      case "capacity-building services":
        return "capacity";
      case "college driven":
        return "college";
      case "institutional evaluation":
        return "institutional";
      case "external participation":
        return "external";
      default:
        return "";
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const normalizedType = normalizeActivityType(activity.type);
    const matchesType = activeFilter ? normalizedType === activeFilter : true;
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) return <LoadingPage/>;
  if (error) return <div>Error loading activities: {error}</div>;

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="max-w-7xl mx-auto p-8 flex-grow">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          "ADMIN" Evaluate Application for Engagement Appraisals
        </h2>

        {/* Filter Button Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {cardData.map((card) => (
            <div
              key={card.id}
              className={`bg-nucolor1 text-white flex flex-col items-center justify-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer ${
                activeFilter === card.filter ? "ring-4 ring-nucolor3" : ""
              }`}
              onClick={() =>
                setActiveFilter((prevFilter) =>
                  prevFilter === card.filter ? null : card.filter
                )
              }
            >
              <div className="mb-4">{card.icon}</div>
              <p className="text-center text-lg font-semibold tracking-wide select-none">
                {card.title}
              </p>
            </div>
          ))}
        </div>

        {/* Search Box */}
        {/* <div className="mb-6">
          <input
            type="text"
            placeholder="Search activities by title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}

        {/* Display Filtered Activities */}
        <div>
          {filteredActivities.length > 0 ? (
            <ul className="space-y-4">
              {filteredActivities.map((activity) => (
                <li
                  key={activity._id}
                  className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/engagement-appraisals/${activity._id}`)
                  }
                >
                  {activity.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>No activities found matching the search or filter criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppraisals;
