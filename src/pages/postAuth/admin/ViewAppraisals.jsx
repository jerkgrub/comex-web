// src/pages/postAuth/admin/ViewAppraisals.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, GraduationCap, Earth, Building } from 'lucide-react';
import api from '../../../api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Ensure Skeleton styles are imported

// Define the card data with appraisal types and routes
const cardData = [
  {
    id: 1,
    title: 'Institutional',
    icon: <Building className="w-14 h-14 text-[#d1d5db]" />,
    type: 'Institutional', // Type to be passed as URL param
  },
  {
    id: 2,
    title: 'College-Driven',
    icon: <GraduationCap className="w-14 h-14 text-[#d1d5db]" />,
    type: 'College Driven', // Type to be passed as URL param
  },
  {
    id: 3,
    title: 'Extension Services',
    icon: <Earth className="w-14 h-14 text-[#d1d5db]" />,
    type: 'Extension Services',
  },
  {
    id: 4,
    title: 'Capacity Building',
    icon: <Layers className="w-14 h-14 text-[#d1d5db]" />,
    type: 'Capacity Building',
  }
];

const ViewAppraisals = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true); // New loading state

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch counts for each card type
        const promises = cardData.map(card =>
          api.get(`/credit/pending/${card.type}/count`)
        );

        const results = await Promise.all(promises);
        const newCounts = {};
        results.forEach((response, index) => {
          // Check if response.data.credits is an array
          if (response.data.credits && Array.isArray(response.data.credits)) {
            newCounts[cardData[index].id] = response.data.credits.length;
          } else if (response.data.count !== undefined) {
            // Fallback in case the API returns a count property
            newCounts[cardData[index].id] = response.data.count;
          } else {
            console.error(`Unexpected response structure for card ID ${cardData[index].id}:`, response.data);
            newCounts[cardData[index].id] = 0; // Default to 0 if structure is unexpected
          }
        });

        setCounts(newCounts);
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      } finally {
        setLoadingCounts(false); // Set loading to false regardless of success or failure
      }
    };

    fetchCounts();
  }, []);

  // Navigate to the route with the appropriate appraisal type
  const handleCardClick = (card) => {
    navigate(`/admin/review-evaluation-forms/${encodeURIComponent(card.type)}`);
  };

  return (
    <div className="card flex flex-col justify-between min-h-screen bg-base-100 shadow-lg">
      <div className="max-w-7xl mx-auto p-8 flex-grow my-4">
        <h2 className="text-4xl font-extrabold mb-12 text-blue-900 text-center">
          Review Appraisal Forms 📄
        </h2>

        {/* Appraisal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map(card => (
            <div
              key={card.id}
              className="gap-3 bg-gradient-to-br from-[#2b3476] to-[#525db3] text-white flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(card)}
            >
              <div className="flex flex-row">
                <div className="mb-6">{card.icon}</div>
                <p className="text-center text-2xl font-semibold tracking-wider select-none">
                  {card.title}
                </p>
              </div>
              <p className="text-center text-4xl font-semibold tracking-wider select-none">
                {loadingCounts ? (
                  <Skeleton baseColor='#3B469C' width={40} height={40} />
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

export default ViewAppraisals;
