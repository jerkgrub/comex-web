import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Layers, School, GraduationCap, Earth } from 'lucide-react';
import { useFetchActivities } from '../../../components/hooks/useFetchActivities'; 
import LoadingPage from '../../LoadingPage';

// Define card data with LucideReact icons and routes
const cardData = [
  { id: 1, title: 'Institutional', icon: <School className='w-14 h-14' />, filter: 'extension', route: '/client/engagement-appraisals/' },
  { id: 2, title: 'College-Driven', icon: <GraduationCap className='w-14 h-14' />, filter: 'capacity', route: '/client/engagement-appraisals/College%20Driven' },
  { id: 3, title: 'Extension Services', icon: <Earth className='w-14 h-14' />, filter: 'capacity', route: '/client/engagement-appraisals/Extension%20Services' },
  { id: 4, title: 'Capacity-Building Services', icon: <Layers className='w-14 h-14' />, filter: 'capacity', route: '/client/engagement-appraisals/Capacity%20Building' },
];

const ClientAppraisals = () => {
  const navigate = useNavigate();
  const { activities, loading, error } = useFetchActivities();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(null); 

  const handleCardClick = (card) => {
    if (card.route) {
      navigate(card.route);  // Navigate to the route with title as a URL parameter
    } else {
      setActiveFilter((prevFilter) => (prevFilter === card.filter ? null : card.filter));
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <div>Error loading activities: {error}</div>;

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="max-w-7xl mx-auto p-8 flex-grow">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Apply for Crediting Hours</h2>

        {/* Filter Button Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {cardData.map((card) => (
            <div
              key={card.id}
              className={`bg-nucolor1 text-white flex flex-col items-center justify-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 cursor-pointer ${
                activeFilter === card.filter ? 'ring-4 ring-nucolor3' : ''
              }`}
              onClick={() => handleCardClick(card)} // Updated click handler
            >
              <div className="mb-4">{card.icon}</div> 
              <p className="text-center text-lg font-semibold tracking-wide select-none">{card.title}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ClientAppraisals;
