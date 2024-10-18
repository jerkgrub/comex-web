import React, { useState, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // Import pdf-lib for PDF generation
import certificateTemplate from "/public/images/certificate_template.png"; // Adjust the path if needed

const CertTest = () => {
  // State to control text positions, sizes, fonts, and colors
  const [positions, setPositions] = useState({
    nameX: 425, // Center of 850px width
    nameY: 340,
    hoursX: 425,
    hoursY: 300,
    titleX: 425,
    titleY: 280,
    dateX: 425,
    dateY: 240,
    locationX: 425,
    locationY: 220,
    dateReceivedX: 425,
    dateReceivedY: 200,
  });

  const [fontSize, setFontSize] = useState({
    nameSize: 36,
    textSize: 18,
    locationSize: 18,
    dateReceivedSize: 18,
  });

  const [nameColor, setNameColor] = useState("#000000"); // Default black color for the name

  const [userInput, setUserInput] = useState({
    name: "John Doe",
    hours: "15",
    title: "COMMUNITY OUTREACH",
    date: formatDate(new Date()),
    location: "NU MOA, Pasay City",
    dateReceived: "Given this day on the 15th day of April 2024 at NU MOA, Pasay City",
  });

  // Font states for name and the rest of the text
  const [selectedFontName, setSelectedFontName] = useState("Arial");
  const [selectedFontText, setSelectedFontText] = useState("Arial");

  useEffect(() => {
    // Dynamically load Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Arial&family=Century+Gothic&family=Dancing+Script&family=Great+Vibes&family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Helper function to format date as "April 15, 2024"
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  // Update positions dynamically when inputs change
  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPositions({ ...positions, [name]: parseFloat(value) });
  };

  const handleFontSizeChange = (e) => {
    const { name, value } = e.target;
    setFontSize({ ...fontSize, [name]: parseInt(value) });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Auto-capitalize to uppercase except for 'name' and 'dateReceived'
    if (name !== "name" && name !== "dateReceived") {
      setUserInput({ ...userInput, [name]: value.toUpperCase() });
    } else {
      setUserInput({ ...userInput, [name]: value });
    }
  };

  const handleFontChangeName = (e) => {
    setSelectedFontName(e.target.value);
  };

  const handleFontChangeText = (e) => {
    setSelectedFontText(e.target.value);
  };

  const handleColorChange = (e) => {
    setNameColor(e.target.value);
  };

  // Function to generate a preview of the certificate
  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([850, 650]);

    // Load the certificate template image
    const templateBytes = await fetch(certificateTemplate).then((res) =>
      res.arrayBuffer()
    );
    const templateImage = await pdfDoc.embedPng(templateBytes);

    // Draw the certificate template on the PDF
    page.drawImage(templateImage, {
      x: 0,
      y: 0,
      width: 850,
      height: 650,
    });

    // Embed standard fonts or custom fonts as needed
    const arialFont = await pdfDoc.embedFont(StandardFonts.Helvetica); // Using Helvetica as a substitute for Arial
    // Note: For custom fonts, you need to embed them properly

    // Helper to convert hex to RGB
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.replace("#", ""), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };

    // Draw the name (centered)
    page.drawText(userInput.name, {
      x: positions.nameX,
      y: positions.nameY,
      size: fontSize.nameSize,
      font: arialFont,
      color: rgb(...hexToRgb(nameColor)),
      // Since pdf-lib doesn't support text alignment, adjust x to center based on text width
      // For simplicity, keep x as center and accept approximate centering
    });

    // Draw the hours (all caps, centered)
    page.drawText(`${userInput.hours} HOURS`, {
      x: positions.hoursX,
      y: positions.hoursY,
      size: fontSize.textSize,
      font: arialFont,
      color: rgb(0, 0, 0),
    });

    // Draw the title (all caps, centered)
    page.drawText(`AT ${userInput.title}`, {
      x: positions.titleX,
      y: positions.titleY,
      size: fontSize.textSize,
      font: arialFont,
      color: rgb(0, 0, 0),
    });

    // Draw the date (all caps, centered)
    page.drawText(userInput.date.toUpperCase(), {
      x: positions.dateX,
      y: positions.dateY,
      size: fontSize.textSize,
      font: arialFont,
      color: rgb(0, 0, 0),
    });

    // Draw the location (all caps, centered)
    page.drawText(userInput.location.toUpperCase(), {
      x: positions.locationX,
      y: positions.locationY,
      size: fontSize.locationSize,
      font: arialFont,
      color: rgb(0, 0, 0),
    });

    // Draw the date received (as is, centered)
    page.drawText(userInput.dateReceived, {
      x: positions.dateReceivedX,
      y: positions.dateReceivedY,
      size: fontSize.dateReceivedSize,
      font: arialFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `certificate-${userInput.name}.pdf`;
    link.click();
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
        Certificate Generator Test
      </h2>

      {/* Flex container for certificate and control panel */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Certificate preview */}
        <div className="relative bg-gray-200 p-4 rounded-lg shadow-lg w-full max-w-3xl h-auto overflow-hidden">
          <div
            className="relative"
            style={{
              paddingTop: "76.47%", // 850 / 650 ≈ 1.3077, so 100% / 1.3077 ≈ 76.47%
            }}
          >
            <img
              src={certificateTemplate}
              alt="Certificate Template"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Name */}
            <div
              style={{
                position: "absolute",
                left: `${positions.nameX}px`,
                top: `${positions.nameY}px`,
                fontFamily: selectedFontName,
                fontSize: `${fontSize.nameSize}px`,
                color: nameColor,
                transform: "translateX(-50%)",
                textAlign: "center",
                whiteSpace: "nowrap", // Prevent line breaking
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className="font-"
              title={userInput.name} // Tooltip to show full name if truncated
            >
              {userInput.name}
            </div>
            {/* Hours */}
            <div
              style={{
                position: "absolute",
                left: `${positions.hoursX}px`,
                top: `${positions.hoursY}px`,
                fontFamily: selectedFontText,
                fontSize: `${fontSize.textSize}px`,
                textTransform: "uppercase",
                transform: "translateX(-50%)",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userInput.hours}
            </div>
            {/* Title */}
            <div
              style={{
                position: "absolute",
                left: `${positions.titleX}px`,
                top: `${positions.titleY}px`,
                fontFamily: selectedFontText,
                fontSize: `${fontSize.textSize}px`,
                textTransform: "uppercase",
                transform: "translateX(-50%)",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
             {userInput.title}
            </div>
            {/* Date */}
            <div
              style={{
                position: "absolute",
                left: `${positions.dateX}px`,
                top: `${positions.dateY}px`,
                fontFamily: selectedFontText,
                fontSize: `${fontSize.textSize}px`,
                textTransform: "uppercase",
                transform: "translateX(-50%)",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userInput.date}
            </div>
            {/* Location */}
            <div
              style={{
                position: "absolute",
                left: `${positions.locationX}px`,
                top: `${positions.locationY}px`,
                fontFamily: selectedFontText,
                fontSize: `${fontSize.locationSize}px`,
                textTransform: "uppercase",
                transform: "translateX(-50%)",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userInput.location}
            </div>
            {/* Date Received */}
            <div
              style={{
                position: "absolute",
                left: `${positions.dateReceivedX}px`,
                top: `${positions.dateReceivedY}px`,
                fontFamily: selectedFontText,
                fontSize: `${fontSize.dateReceivedSize}px`,
                transform: "translateX(-50%)",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userInput.dateReceived}
            </div>
          </div>
        </div>

        {/* Control panel for inputs */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg overflow-auto">
          <h3 className="text-2xl font-bold mb-4">Customize Certificate</h3>
          {/* Certificate Inputs */}
          <div className="mb-6">
            <InputField
              label="Name"
              name="name"
              value={userInput.name}
              onChange={handleInputChange}
            />
            <InputField
              label="Hours"
              name="hours"
              value={userInput.hours}
              onChange={handleInputChange}
            />
            <InputField
              label="Title"
              name="title"
              value={userInput.title}
              onChange={handleInputChange}
            />
            <InputField
              label="Date"
              name="date"
              value={userInput.date}
              onChange={handleInputChange}
            />
            <InputField
              label="Location"
              name="location"
              value={userInput.location}
              onChange={handleInputChange}
            />
            <InputField
              label="Date Received"
              name="dateReceived"
              value={userInput.dateReceived}
              onChange={handleInputChange}
            />
          </div>

          {/* Font and Color Controls */}
          <div className="mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Name Font:
              </label>
              <select
                className="mt-2 p-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                value={selectedFontName}
                onChange={handleFontChangeName}
              >
                <option value="Arial">Arial</option>
                <option value="Century Gothic">Century Gothic</option>
                <option value="Dancing Script">Dancing Script</option>
                <option value="Great Vibes">Great Vibes</option>
                <option value="Pacifico">Pacifico</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Text Font:
              </label>
              <select
                className="mt-2 p-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                value={selectedFontText}
                onChange={handleFontChangeText}
              >
                <option value="Arial">Arial</option>
                <option value="Century Gothic">Century Gothic</option>
                <option value="Dancing Script">Dancing Script</option>
                <option value="Great Vibes">Great Vibes</option>
                <option value="Pacifico">Pacifico</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600">
                Name Color:
              </label>
              <input
                type="color"
                value={nameColor}
                onChange={handleColorChange}
                className="mt-2 p-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Position & Size Controls */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Position & Size Controls</h4>
            {/* Position Controls */}
            <SliderField
              label="Name Position (X, Y)"
              nameX="nameX"
              nameY="nameY"
              valueX={positions.nameX}
              valueY={positions.nameY}
              onChange={handlePositionChange}
              min={0}
              max={850}
            />
            <SliderField
              label="Hours Position (X, Y)"
              nameX="hoursX"
              nameY="hoursY"
              valueX={positions.hoursX}
              valueY={positions.hoursY}
              onChange={handlePositionChange}
              min={0}
              max={850}
            />
            <SliderField
              label="Title Position (X, Y)"
              nameX="titleX"
              nameY="titleY"
              valueX={positions.titleX}
              valueY={positions.titleY}
              onChange={handlePositionChange}
              min={0}
              max={850}
            />
            <SliderField
              label="Date Position (X, Y)"
              nameX="dateX"
              nameY="dateY"
              valueX={positions.dateX}
              valueY={positions.dateY}
              onChange={handlePositionChange}
              min={0}
              max={850}
            />
            <SliderField
              label="Location Position (X, Y)"
              nameX="locationX"
              nameY="locationY"
              valueX={positions.locationX}
              valueY={positions.locationY}
              onChange={handlePositionChange}
              min={0}
              max={850}
            />
            <SliderField
              label="Date Received Position (X, Y)"
              nameX="dateReceivedX"
              nameY="dateReceivedY"
              valueX={positions.dateReceivedX}
              valueY={positions.dateReceivedY}
              onChange={handlePositionChange}
              min={0}
              max={850}
            />

            {/* Font Size Controls */}
            <SingleSliderField
              label="Name Font Size"
              name="nameSize"
              value={fontSize.nameSize}
              onChange={handleFontSizeChange}
              min={10}
              max={72}
            />
            <SingleSliderField
              label="Text Font Size"
              name="textSize"
              value={fontSize.textSize}
              onChange={handleFontSizeChange}
              min={10}
              max={72}
            />
            <SingleSliderField
              label="Location Font Size"
              name="locationSize"
              value={fontSize.locationSize}
              onChange={handleFontSizeChange}
              min={10}
              max={72}
            />
            <SingleSliderField
              label="Date Received Font Size"
              name="dateReceivedSize"
              value={fontSize.dateReceivedSize}
              onChange={handleFontSizeChange}
              min={10}
              max={72}
            />
          </div>

          {/* Save and Generate Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={generatePDF}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Generate PDF
            </button>
            <button
              onClick={() =>
                console.log(
                  JSON.stringify({
                    positions,
                    fontSize,
                    selectedFontName,
                    selectedFontText,
                    nameColor,
                  })
                )
              }
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition"
            >
              Save Config
            </button>
          </div>
        </div>
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
      className="mt-1 p-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>
);

// Reusable Slider Field Component for X and Y positions
const SliderField = ({
  label,
  nameX,
  nameY,
  valueX,
  valueY,
  onChange,
  min,
  max,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-600">{label}:</label>
    <div className="flex flex-col gap-2 mt-2">
      <div>
        <label className="block text-xs text-gray-500">X Position:</label>
        <input
          type="range"
          name={nameX}
          value={valueX}
          onChange={onChange}
          min={min}
          max={max}
          className="w-full"
        />
        <div className="text-xs text-gray-500">Current: {valueX}px</div>
      </div>
      <div>
        <label className="block text-xs text-gray-500">Y Position:</label>
        <input
          type="range"
          name={nameY}
          value={valueY}
          onChange={onChange}
          min={min}
          max={max === 850 ? 650 : max} // Adjust for Y range
          className="w-full"
        />
        <div className="text-xs text-gray-500">Current: {valueY}px</div>
      </div>
    </div>
  </div>
);

// Reusable Single Slider Field Component for Font Sizes
const SingleSliderField = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-600">{label}:</label>
    <div className="flex flex-col gap-2 mt-2">
      <input
        type="range"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full"
      />
      <div className="text-xs text-gray-500">Current: {value}px</div>
    </div>
  </div>
);

export default CertTest;
