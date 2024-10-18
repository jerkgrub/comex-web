import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib"; // Import pdf-lib for PDF generation
import certificateTemplate from "/public/images/certificate_template.png"; // Adjust the path if needed

const CertTest = () => {
  // State to control text positions and values
  const [positions, setPositions] = useState({
    nameX: 320,
    nameY: 340,
    hoursX: 100,
    hoursY: 300,
    titleX: 100,
    titleY: 280,
    dateX: 100,
    dateY: 240,
  });

  const [userInput, setUserInput] = useState({
    name: "John Doe",
    hours: "15",
    title: "Community Outreach",
    date: new Date().toLocaleDateString(),
  });

  // Update positions dynamically when inputs change
  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPositions({ ...positions, [name]: parseFloat(value) });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  // Function to generate a preview of the certificate
  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([850, 650]);

    // Load the certificate template image
    const templateBytes = await fetch(certificateTemplate).then((res) => res.arrayBuffer());
    const templateImage = await pdfDoc.embedPng(templateBytes);
    const { width, height } = templateImage.scale(1);

    // Draw the certificate template on the PDF
    page.drawImage(templateImage, {
      x: 0,
      y: 0,
      width: 850,
      height: 650,
    });

    // Add dynamic text based on the state and positions
    page.drawText(userInput.name, {
      x: positions.nameX,
      y: positions.nameY,
      size: 24,
      color: rgb(0, 0, 0),
    });

    page.drawText(`for rendering ${userInput.hours} hours`, {
      x: positions.hoursX,
      y: positions.hoursY,
      size: 18,
      color: rgb(0, 0, 0),
    });

    page.drawText(`at ${userInput.title}`, {
      x: positions.titleX,
      y: positions.titleY,
      size: 18,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Given this ${userInput.date}`, {
      x: positions.dateX,
      y: positions.dateY,
      size: 18,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDF and create a preview link
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `test-certificate.pdf`;
    link.click();
  };

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Certificate Generator Test</h2>

      {/* Certificate preview */}
      <div className="relative bg-gray-200 p-4 rounded-lg shadow-lg w-[850px] h-[650px] mb-6 overflow-hidden">
        <img
          src={certificateTemplate}
          alt="Certificate Template"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          style={{ position: "absolute", left: `${positions.nameX}px`, top: `${positions.nameY}px` }}
          className="text-2xl font-bold"
        >
          {userInput.name}
        </div>
        <div
          style={{ position: "absolute", left: `${positions.hoursX}px`, top: `${positions.hoursY}px` }}
          className="text-lg"
        >
          for rendering {userInput.hours} hours
        </div>
        <div
          style={{ position: "absolute", left: `${positions.titleX}px`, top: `${positions.titleY}px` }}
          className="text-lg"
        >
          at {userInput.title}
        </div>
        <div
          style={{ position: "absolute", left: `${positions.dateX}px`, top: `${positions.dateY}px` }}
          className="text-lg"
        >
          Given this {userInput.date}
        </div>
      </div>

      {/* Control panel for text inputs */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Certificate Inputs</h3>
          <InputField label="Name" name="name" value={userInput.name} onChange={handleInputChange} />
          <InputField label="Hours" name="hours" value={userInput.hours} onChange={handleInputChange} />
          <InputField label="Title" name="title" value={userInput.title} onChange={handleInputChange} />
          <InputField label="Date" name="date" value={userInput.date} onChange={handleInputChange} />
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Position Controls</h3>
          <PositionField
            label="Name Position (X, Y)"
            nameX="nameX"
            nameY="nameY"
            valueX={positions.nameX}
            valueY={positions.nameY}
            onChange={handlePositionChange}
          />
          <PositionField
            label="Hours Position (X, Y)"
            nameX="hoursX"
            nameY="hoursY"
            valueX={positions.hoursX}
            valueY={positions.hoursY}
            onChange={handlePositionChange}
          />
          <PositionField
            label="Title Position (X, Y)"
            nameX="titleX"
            nameY="titleY"
            valueX={positions.titleX}
            valueY={positions.titleY}
            onChange={handlePositionChange}
          />
          <PositionField
            label="Date Position (X, Y)"
            nameX="dateX"
            nameY="dateY"
            valueX={positions.dateX}
            valueY={positions.dateY}
            onChange={handlePositionChange}
          />
        </div>
      </div>

      {/* Save and Generate Buttons */}
      <div className="mt-6">
        <button
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 mr-4"
        >
          Generate PDF
        </button>
        <button
          onClick={() => console.log(JSON.stringify(positions))}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800"
        >
          Save Config
        </button>
      </div>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-600">{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 p-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>
);

// Reusable Position Field Component for X and Y positions
const PositionField = ({ label, nameX, nameY, valueX, valueY, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-600">{label}:</label>
    <div className="flex gap-4 mt-2">
      <input
        type="number"
        name={nameX}
        value={valueX}
        onChange={onChange}
        className="p-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <input
        type="number"
        name={nameY}
        value={valueY}
        onChange={onChange}
        className="p-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  </div>
);

export default CertTest;
