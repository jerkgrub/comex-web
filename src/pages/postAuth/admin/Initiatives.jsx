import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Folder, Activity } from 'lucide-react';
import api from '../../../api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cardData = [
  {
    id: 1,
    title: 'Programs',
    icon: <BookOpen className="w-14 h-14 text-[#d1d5db]" />,
    endpoint: '/program/pending/count',
    route: '/admin/initiatives/programs', // Add corresponding route
  },
  {
    id: 2,
    title: 'Projects',
    icon: <Folder className="w-14 h-14 text-[#d1d5db]" />,
    endpoint: '/project/pending/count',
    route: '/admin/initiatives/projects', // Add corresponding route
  },
  {
    id: 3,
    title: 'Activities',
    icon: <Activity className="w-14 h-14 text-[#d1d5db]" />,
    endpoint: '/project/pending/count',
    route: '/admin/initiatives/activities', // Add corresponding route
  },
];

const Initiatives = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const promises = cardData.map(card => api.get(card.endpoint));
        const results = await Promise.all(promises);
        const newCounts = {};

        results.forEach((response, index) => {
          if (response.data.count !== undefined) {
            newCounts[cardData[index].id] = response.data.count;
          } else {
            console.error(
              `Unexpected response structure for card ID ${cardData[index].id}:`,
              response.data
            );
            newCounts[cardData[index].id] = 0; // Default to 0 if structure is unexpected
          }
        });

        setCounts(newCounts);
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      } finally {
        setLoadingCounts(false);
      }
    };

    fetchCounts();
  }, []);

  const handleCardClick = (card) => {
    navigate(card.route); // Navigate to the respective route
  };

  return (
    <div className="card flex flex-col justify-between min-h-screen bg-base-100 shadow-lg">
      <div className="max-w-7xl mx-auto p-8 flex-grow my-4">
        <h2 className="text-4xl font-extrabold mb-12 text-blue-900 text-center">
          Manage Initiatives
        </h2>

        {/* Initiatives Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map(card => (
            <div
              key={card.id}
              className="gap-3 bg-gradient-to-br from-[#2b3476] to-[#525db3] text-white flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(card)}
            >
              <div className="flex flex-row items-center mb-6">
                {card.icon}
                <p className="text-center text-2xl font-semibold tracking-wider select-none ml-4">
                  {card.title}
                </p>
              </div>
              <p className="text-center text-4xl font-semibold tracking-wider select-none">
                {loadingCounts ? (
                  <Skeleton baseColor="#3B469C" width={40} height={40} />
                ) : (
                  counts[card.id] !== undefined ? counts[card.id] : 0
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Initiatives;
