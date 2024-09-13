import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">About Us</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
        <p className="text-center text-gray-700 mb-6">
          The Community Extension Office is responsible for the development and
          implementation of sustainable community projects, social
          responsibility, and long-term learning programs on behalf of National
          University.
        </p>

        <div className="flex flex-col lg:flex-row justify-between mb-6">
          <div className="lg:w-1/2">
            <h2 className="text-xl font-bold mb-4">Mission</h2>
            <p className="text-gray-700">
              Guided by the core values and characterized by our cultural
              heritage of Dynamic Filipinism, National University is committed
              to provide relevant, innovative, and accessible quality education
              and other development programs to its students, associates,
              faculty, alumni, and other stakeholders to be pro-active in
              socio-economic-environmental problems both local and national
              through the Community Extension Office program and services
              addressing local and international concerns as well as
              contributing to global priorities.
            </p>
          </div>

          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <h2 className="text-xl font-bold mb-4">Vision</h2>
            <p className="text-gray-700">
              The Community Extension Unit of National University will be the
              primary facilitator and provider of effective programs and
              projects to help empower communities and sectors in addressing
              socio-economic environmental problems as well as promoting
              volunteerism by using dynamic, science-based educational
              resources.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <p className="text-gray-700">Mobile Number: 09123456789</p>
        <p className="text-gray-700">Email: comexoffice@nu-moa.edu.ph</p>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold mb-4">Administration & Staff</h2>
        <div className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/xHQfWxh.png"
            alt="Zoren Matthew M.Blardonny"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <p className="text-gray-700 font-semibold">
            Zoren Matthew M.Blardonny
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
