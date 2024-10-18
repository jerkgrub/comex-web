import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Accordion } from "flowbite-react";
import api from "../../../../api";
import useFetchUserData from "../../../../components/hooks/useFetchUserData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit"; // Import fontkit for custom fonts
import certificateTemplate from "/images/certificate_template.png"; // Adjust the path if needed

const ViewAchievementsPage = () => {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useFetchUserData();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Configuration as per the provided config JSON
  const config = {
    positions: {
      nameX: 367,
      nameY: 230,
      hoursX: 207,
      hoursY: 287,
      titleX: 360,
      titleY: 287,
      dateX: 437,
      dateY: 311,
      locationX: 271,
      locationY: 318,
      dateReceivedX: 367,
      dateReceivedY: 376,
    },
    fontSize: {
      nameSize: 41,
      textSize: 15,
      locationSize: 11,
      dateReceivedSize: 17,
    },
    selectedFontName: "Great Vibes",
    selectedFontText: "Century Gothic",
    nameColor: "#b99f41",
  };

  useEffect(() => {
    const fetchCredits = async () => {
      if (user._id) {
        try {
          const response = await api.get(`/credit/certificates/${user._id}`);
          setAchievements(response.data.approvedCredits);
        } catch (error) {
          console.error("Error fetching credits:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!userLoading) {
      fetchCredits();
    }
  }, [user, userLoading]);

  const generatePDF = async (achievement) => {
    try {
      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit);

      // Load custom fonts
      const greatVibesFontBytes = await fetch("/fonts/GreatVibes-Regular.ttf").then((res) =>
        res.arrayBuffer()
      );
      const centuryGothicFontBytes = await fetch("/fonts/GOTHIC.TTF").then((res) =>
        res.arrayBuffer()
      );

      const greatVibesFont = await pdfDoc.embedFont(greatVibesFontBytes);
      const centuryGothicFont = await pdfDoc.embedFont(centuryGothicFontBytes);

      const page = pdfDoc.addPage([850, 650]);

      // Load the certificate template image
      const templateBytes = await fetch(certificateTemplate).then((res) =>
        res.arrayBuffer()
      );
      const templateImage = await pdfDoc.embedPng(templateBytes);

      // Draw the certificate template
      page.drawImage(templateImage, {
        x: 0,
        y: 0,
        width: 850,
        height: 650,
      });

      // Helper to convert hex to RGB
      const hexToRgb = (hex) => {
        const bigint = parseInt(hex.replace("#", ""), 16);
        return [
          (bigint >> 16) & 255,
          (bigint >> 8) & 255,
          bigint & 255,
        ].map((value) => value / 255);
      };

      // Helper to format date
      const formatDate = (date) => {
        return new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(new Date(date));
      };

      const currentDate = formatDate(new Date());

      // Helper function to draw text at specific coordinates
      const drawTextAt = (text, x, y, font, size, color, options = {}) => {
        page.drawText(text, {
          x,
          y,
          size,
          font,
          color,
          ...options,
        });
      };

      // Draw name
      drawTextAt(
        `${user.firstName} ${user.lastName}`,
        config.positions.nameX,
        config.positions.nameY,
        greatVibesFont,
        config.fontSize.nameSize,
        rgb(...hexToRgb(config.nameColor))
      );

      // Draw hours
      const hoursText = `${achievement.totalHoursRendered} HOURS OF ${achievement.type.toUpperCase()} COMMUNITY ENGAGEMENT`;
      drawTextAt(
        hoursText,
        config.positions.hoursX,
        config.positions.hoursY,
        centuryGothicFont,
        config.fontSize.textSize,
        rgb(0, 0, 0)
      );

      // Draw title
      const titleText = `AT ${achievement.location ? achievement.location.toUpperCase() : "N/A"}`;
      drawTextAt(
        titleText,
        config.positions.titleX,
        config.positions.titleY,
        centuryGothicFont,
        config.fontSize.textSize,
        rgb(0, 0, 0)
      );

      // Draw date
      const dateText = `GIVEN THIS ${currentDate.toUpperCase()}`;
      drawTextAt(
        dateText,
        config.positions.dateX,
        config.positions.dateY,
        centuryGothicFont,
        config.fontSize.textSize,
        rgb(0, 0, 0)
      );

      // Draw location
      const locationText = achievement.location ? achievement.location.toUpperCase() : "N/A";
      drawTextAt(
        locationText,
        config.positions.locationX,
        config.positions.locationY,
        centuryGothicFont,
        config.fontSize.locationSize,
        rgb(0, 0, 0)
      );

      // Draw date received (Dynamic Date)
      const dateReceivedText = `Given this day on the ${currentDate} at NU MOA, Pasay City`;
      drawTextAt(
        dateReceivedText,
        config.positions.dateReceivedX,
        config.positions.dateReceivedY,
        centuryGothicFont,
        config.fontSize.dateReceivedSize,
        rgb(0, 0, 0)
      );

      // Finalize the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `certificate-${achievement.title}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error generating the PDF:", error);
      // Optional: Provide user feedback here (e.g., toast notification)
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/client/profile`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
        Participated Activities
      </h2>

      {loading ? (
        <Accordion collapseAll>
          {Array(5)
            .fill()
            .map((_, index) => (
              <Accordion.Panel key={index}>
                <Accordion.Title className="flex justify-between items-center">
                  <div className="flex-1">
                    <Skeleton width={`80%`} height={20} />
                  </div>
                  <Skeleton width={120} height={20} />
                </Accordion.Title>
                <Accordion.Content>
                  <Skeleton width={`90%`} height={20} />
                  <Skeleton width={`40%`} height={20} className="mt-2" />
                  <Skeleton width={120} height={30} className="mt-4" />
                </Accordion.Content>
              </Accordion.Panel>
            ))}

        </Accordion>
      ) : achievements.length > 0 ? (
        <Accordion collapseAll>
          {achievements.map((achievement) => (
            <Accordion.Panel key={achievement._id}>
              <Accordion.Title className="flex justify-between items-center">
                <div className="flex-1">{achievement.title}</div>
                <span className="text-sm text-gray-500">
                  Date Received: {formatDate(achievement.endDate)}
                </span>
              </Accordion.Title>
              <Accordion.Content>
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="text-gray-600">
                    Location: {achievement.location || "N/A"}
                  </div>
                  <div className="text-gray-600">
                    Total Hours Rendered: {achievement.totalHoursRendered || 0} hours
                  </div>
                  <div className="text-gray-600">
                    Beneficiaries: {achievement.beneficiaries || "N/A"}
                  </div>
                  <button
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => generatePDF(achievement)}
                  >
                    <Download className="w-5 h-5 mr-1" /> Download Certificate
                  </button>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      ) : (
        <div className="text-center text-gray-600">
          You have not participated in any activities yet.
        </div>
      )}
    </div>
  );
};

// Helper function to format date as "April 15, 2024"
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export default ViewAchievementsPage;
