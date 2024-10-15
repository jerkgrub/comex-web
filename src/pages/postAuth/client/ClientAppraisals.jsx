import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, School, GraduationCap, Earth, Building } from 'lucide-react';

// Define card data with LucideReact icons and routes
const cardData = [
  { id: 1, title: 'Institutional', icon: <Building className="w-14 h-14 text-[#d1d5db]" />, route: '/client/engagement-appraisals-institutional' },
  { id: 2, title: 'College-Driven', icon: <GraduationCap className="w-14 h-14 text-[#d1d5db]" />, route: '/client/engagement-appraisals/College%20Driven' },
  { id: 3, title: 'Extension Services', icon: <Earth className="w-14 h-14 text-[#d1d5db]" />, route: '/client/engagement-appraisals/Extension%20Services' },
  { id: 4, title: 'Capacity-Building Services', icon: <Layers className="w-14 h-14 text-[#d1d5db]" />, route: '/client/engagement-appraisals/Capacity%20Building' },
];

const ClientAppraisals = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);

  const handleCardClick = (card) => {
    if (card.route) {
      navigate(card.route); // Navigate to the route
    } else {
      setActiveFilter((prevFilter) => (prevFilter === card.filter ? null : card.filter));
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-8 flex-grow my-4">
        <h2 className="text-4xl font-extrabold mb-12 text-blue-900 text-center">Apply for Crediting Hours 📄</h2>

        {/* Filter Button Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card) => (
            <div
              key={card.id}
              className={`bg-gradient-to-br from-[#2b3476] to-[#525db3] text-white flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer ${
                activeFilter === card.filter ? 'ring-4 ring-[#336699]' : ''
              }`}
              onClick={() => handleCardClick(card)}
            >
              <div className="mb-6">{card.icon}</div>
              <p className="text-center text-2xl font-semibold tracking-wider select-none">{card.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientAppraisals;