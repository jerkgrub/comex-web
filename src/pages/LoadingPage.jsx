import React from "react";
import { useLoading, ThreeDots } from "@agney/react-loading";

const LoadingPage = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <section {...containerProps} className="mb-4">
        {indicatorEl} {/* Displays the loading spinner */}
      </section>
      {/* <h2 className="text-black text-2xl font-bold animate-pulse">Loading...</h2> */}
    </div>
  );
};

export default LoadingPage;
