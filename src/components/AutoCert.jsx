// AutoCert.js

import React, { useState, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ChromePicker } from "react-color";
import { FaQuestionCircle } from "react-icons/fa";

function AutoCert() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
  const [namesInput, setNamesInput] = useState("");
  const [names, setNames] = useState([]);
  const [selectedFont, setSelectedFont] = useState(
    localStorage.getItem("selectedFont") || "Helvetica"
  );
  const [fontColor, setFontColor] = useState(
    localStorage.getItem("fontColor") || "#000000"
  );
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("fontSize")) || 48
  );
  const [textPositionX, setTextPositionX] = useState(
    parseInt(localStorage.getItem("textPositionX")) || 50
  );
  const [textPositionY, setTextPositionY] = useState(
    parseInt(localStorage.getItem("textPositionY")) || 50
  );
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewDataUrl, setPreviewDataUrl] = useState(null);
  const [autoCapitalize, setAutoCapitalize] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [fontOptions] = useState([
    { label: "Arial", value: "Helvetica" },
    { label: "Arial Bold", value: "Helvetica-Bold" },
    { label: "Times New Roman", value: "TimesRoman" },
    { label: "Times New Roman Bold", value: "TimesRoman-Bold" },
    { label: "Courier", value: "Courier" },
    { label: "Courier Bold", value: "Courier-Bold" },
  ]);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem("selectedFont", selectedFont);
    localStorage.setItem("fontColor", fontColor);
    localStorage.setItem("fontSize", fontSize.toString());
    localStorage.setItem("textPositionX", textPositionX.toString());
    localStorage.setItem("textPositionY", textPositionY.toString());
    localStorage.setItem("isBold", isBold.toString());
  }, [selectedFont, fontColor, fontSize, textPositionX, textPositionY, isBold]);

  useEffect(() => {
    // Debounce preview generation for performance
    const timeoutId = setTimeout(() => {
      if (backgroundImage && (namesInput.trim() !== "" || names.length > 0)) {
        generatePreview();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [
    backgroundImage,
    namesInput,
    names,
    selectedFont,
    fontColor,
    fontSize,
    textPositionX,
    textPositionY,
    autoCapitalize,
    isBold,
  ]);

  const handleBackgroundImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setBackgroundImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNamesInputChange = (e) => {
    setNamesInput(e.target.value);
  };

  const handleNamesCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.text().then((text) => {
        const csvNames = text
          .split(/\r?\n/)
          .map((name) => name.trim())
          .filter((name) => name !== "");
        setNames(csvNames);
      });
    }
  };

  const handleGenerateCertificates = async () => {
    if (!backgroundImage) {
      alert("Please upload a background image.");
      return;
    }
    if (namesInput.trim() === "" && names.length === 0) {
      alert("Please input names.");
      return;
    }

    const allNames =
      names.length > 0
        ? names
        : namesInput
            .split(/[\r\n,]+/)
            .map((name) => name.trim())
            .filter((name) => name !== "");

    if (allNames.length === 0) {
      alert("No valid names provided.");
      return;
    }

    setLoading(true);
    setProgress(0);

    const zip = new JSZip();
    const bgImageBytes = await backgroundImage.arrayBuffer();

    let count = 0;

    for (const name of allNames) {
      const pdfBytes = await generatePdf(name, bgImageBytes);
      const displayName = autoCapitalize ? name.toUpperCase() : name;
      zip.file(`${displayName}.pdf`, pdfBytes);

      count++;
      setProgress(Math.round((count / allNames.length) * 100));
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "certificates.zip");
    setLoading(false);
    setProgress(0);
  };

  const generatePdf = async (name, bgImageBytes) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    let embeddedBgImage;
    if (backgroundImage.type === "image/png") {
      embeddedBgImage = await pdfDoc.embedPng(bgImageBytes);
    } else {
      embeddedBgImage = await pdfDoc.embedJpg(bgImageBytes);
    }

    const { width, height } = embeddedBgImage.scale(1);

    page.setSize(width, height);
    page.drawImage(embeddedBgImage, {
      x: 0,
      y: 0,
      width,
      height,
    });

    const rgbColor = hexToRgb(fontColor);

    const font = await getFont(pdfDoc, selectedFont);

    let displayName = name;
    if (autoCapitalize) {
      displayName = name.toUpperCase();
    }

    const textWidth = font.widthOfTextAtSize(displayName, fontSize);
    const x = (width * textPositionX) / 100 - textWidth / 2;
    const y = (height * textPositionY) / 100;

    page.drawText(displayName, {
      x: x,
      y: y,
      size: fontSize,
      font,
      color: rgb(rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  const generatePreview = async () => {
    if (!backgroundImage) {
      return;
    }
    if (namesInput.trim() === "" && names.length === 0) {
      return;
    }

    const name =
      names.length > 0
        ? names[0]
        : namesInput
            .split(/[\r\n,]+/)
            .map((n) => n.trim())
            .filter((n) => n !== "")[0];

    if (!name) {
      return;
    }

    const bgImageBytes = await backgroundImage.arrayBuffer();
    const pdfBytes = await generatePdf(name, bgImageBytes);
    const pdfDataUrl = await pdfToDataUrl(pdfBytes);
    setPreviewDataUrl(pdfDataUrl);
  };

  const pdfToDataUrl = async (pdfBytes) => {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  };

  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getFont = async (pdfDoc, fontName) => {
    switch (fontName) {
      case "Helvetica":
        return isBold
          ? pdfDoc.embedFont(StandardFonts.HelveticaBold)
          : pdfDoc.embedFont(StandardFonts.Helvetica);
      case "Helvetica-Bold":
        return pdfDoc.embedFont(StandardFonts.HelveticaBold);
      case "TimesRoman":
        return isBold
          ? pdfDoc.embedFont(StandardFonts.TimesRomanBold)
          : pdfDoc.embedFont(StandardFonts.TimesRoman);
      case "TimesRoman-Bold":
        return pdfDoc.embedFont(StandardFonts.TimesRomanBold);
      case "Courier":
        return isBold
          ? pdfDoc.embedFont(StandardFonts.CourierBold)
          : pdfDoc.embedFont(StandardFonts.Courier);
      case "Courier-Bold":
        return pdfDoc.embedFont(StandardFonts.CourierBold);
      default:
        // Default to Helvetica
        return isBold
          ? pdfDoc.embedFont(StandardFonts.HelveticaBold)
          : pdfDoc.embedFont(StandardFonts.Helvetica);
    }
  };

  const resetSettings = () => {
    setSelectedFont("Helvetica");
    setFontColor("#000000");
    setFontSize(48);
    setTextPositionX(50);
    setTextPositionY(50);
    setAutoCapitalize(false);
    setIsBold(false);
    localStorage.clear();
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="card max-w-4xl mx-auto bg-white p-8  shadow-lg">
        {/* Improved Heading */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2 text-center">
          Welcome to AutoCert ⚡
        </h1>
        <p className="italic text-xl text-gray-600 mb-6 text-center">
          COMEX CONNECT's Official Certificate Generator
        </p>

        {/* Instructions */}
        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500">
          <p className="text-gray-700">
            <strong>Instructions:</strong> Please upload a background image that
            is ideally 8.5 x 11 inches (Letter Size) for optimum generating of
            certificates. The background should include all necessary details{" "}
            <em>except the name</em>, as it will be auto-generated.
          </p>
        </div>

        {/* Background Image Upload */}
        <div
          className="mb-8 p-6 border-2 border-dashed border-gray-300 bg-gray-50 text-center rounded-lg cursor-pointer hover:border-blue-500"
          onDrop={handleBackgroundImageDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Upload Background Image
            <FaQuestionCircle
              className="inline ml-1 text-gray-500"
              title="Drag and drop or click to upload an image."
            />
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleBackgroundImageUpload}
            className="hidden"
            id="background-upload"
          />
          <label
            htmlFor="background-upload"
            className="btn bg-nucolor3 text-black px-4 py-2 mt-2 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Choose File
          </label>
          {backgroundImagePreview && (
            <img
              src={backgroundImagePreview}
              alt="Background Preview"
              className="mt-4 mx-auto max-h-64 shadow-md rounded"
            />
          )}
        </div>

        {/* Names Input */}
        <div className="mb-8">
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Input Names
            {/* <FaQuestionCircle
              className="inline ml-1 text-gray-500"
              title="Type names manually or upload a CSV file."
            /> */}
          </label>
          <textarea
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            rows="5"
            value={namesInput}
            onChange={handleNamesInputChange}
            placeholder="Enter names separated by commas or new lines..."
          ></textarea>

          <div className="mt-4">
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Or Upload CSV of Names
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleNamesCSVUpload}
              className="file-input block"
            />
          </div>
        </div>

        {/* Auto-Capitalize Option */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={autoCapitalize}
              onChange={(e) => setAutoCapitalize(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">
              Auto-Capitalize All Letters
            </span>
          </label>
        </div>

        {/* Bold Text Option */}
        <div className="mb-8">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isBold}
              onChange={(e) => setIsBold(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Bold Text</span>
          </label>
        </div>

        {/* Font and Appearance Settings */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Font Selection */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Select Font
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              style={{ fontFamily: selectedFont }}
            >
              {fontOptions.map((font) => (
                <option
                  key={font.value}
                  value={font.value}
                  style={{ fontFamily: font.label }}
                >
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Selection */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Font Size: {fontSize}
            </label>
            <div className="flex items-center">
              <input
                type="range"
                min="10"
                max="100"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full mr-2"
              />
              <input
                type="number"
                min="10"
                max="100"
                value={fontSize}
                onChange={(e) => {
                  let value = parseInt(e.target.value);
                  if (value > 100) value = 100;
                  if (value < 10) value = 10;
                  setFontSize(value);
                }}
                className="w-16 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Font Color Selection */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Select Font Color
            </label>
            <div className="border border-gray-300 p-3 rounded-lg">
              <ChromePicker
                color={fontColor}
                onChangeComplete={(color) => setFontColor(color.hex)}
              />
            </div>
          </div>

          {/* Text Positioning */}
          <div>
            <label className="block mb-4 text-lg font-semibold text-gray-700">
              Text Position (X and Y)
            </label>
            <div className="mb-4">
              <label className="block text-gray-600">
                X Position (%): {textPositionX}
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textPositionX}
                  onChange={(e) => setTextPositionX(parseInt(e.target.value))}
                  className="w-full mr-2"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={textPositionX}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (value > 100) value = 100;
                    if (value < 0) value = 0;
                    setTextPositionX(value);
                  }}
                  className="w-16 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600">
                Y Position (%): {textPositionY}
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textPositionY}
                  onChange={(e) => setTextPositionY(parseInt(e.target.value))}
                  className="w-full mr-2"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={textPositionY}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (value > 100) value = 100;
                    if (value < 0) value = 0;
                    setTextPositionY(value);
                  }}
                  className="w-16 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        {previewDataUrl && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Live Certificate Preview
            </h2>
            <iframe
              src={previewDataUrl}
              title="Certificate Preview"
              width="100%"
              height="600px"
              className="border border-gray-300 rounded-lg shadow-sm"
            ></iframe>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-start mb-8">
          <button
            className="btn bg-nucolor3 text-black px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none mr-4"
            onClick={handleGenerateCertificates}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
          <button
            className="btn bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 focus:outline-none"
            onClick={resetSettings}
          >
            Reset Settings
          </button>
        </div>

        {/* Progress Indicator */}
        {loading && (
          <div className="mb-8">
            <div className="w-full bg-gray-200 h-4 rounded">
              <div
                className="bg-blue-500 h-4 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-600 mt-2">{progress}% completed</p>
          </div>
        )}
      </div>
      {/* <div>//to-be-added: unique hours + unique ID option (as requested by sir Zoren)</div> */}
    </div>
  );
}

export default AutoCert;
