import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Settings, Layers, ExternalLink } from 'lucide-react';
import { useFetchActivities }  from '../../../components/hooks/useFetchActivities'; 
import LoadingPage from '../../LoadingPage';

// Define card data with LucideReact icons
const cardData = [
  // { id: 1, title: 'Evaluation for Institutional Activities', icon: <FileText className='w-14 h-14' />, filter: 'institutional' },
  // { id: 2, title: 'College-Driven', icon: <BookOpen className='w-14 h-14'/>, filter: 'college' },
  { id: 3, title: 'Extension Services', icon: <Settings className='w-14 h-14' />, filter: 'extension' },
  { id: 4, title: 'Capacity Building', icon: <Layers className='w-14 h-14' />, filter: 'capacity' },
  // { id: 5, title: 'External Participation', icon: <ExternalLink className='w-14 h-14' />, filter: 'external' }
];

const ClientAppraisals = () => {
  const navigate = useNavigate();
  const { activities, loading, error } = useFetchActivities();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(null); 

  const handleCardClick = (card) => {
    if (card.id === 3) {
      navigate('/client/engagement-appraisals/blank/');
    } else {
      setActiveFilter((prevFilter) => (prevFilter === card.filter ? null : card.filter));
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesType = activeFilter ? activity.type.toLowerCase().includes(activeFilter) : true;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) return <LoadingPage/>;
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


        {/* Display Filtered Activities */}
      </div>
    </div>
  );
};

export default ClientAppraisals;