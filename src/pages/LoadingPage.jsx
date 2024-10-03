import React from 'react';
import { useLoading, Puff } from '@agney/react-loading';

const LoadingPage = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="50" />,
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <section {...containerProps} className="mb-4">
        {indicatorEl} {/* Displays the loading spinner */}
      </section>
      <h2 className="text-white text-2xl font-bold animate-pulse">Loading...</h2>
    </div>
  );
};

export default LoadingPage;
