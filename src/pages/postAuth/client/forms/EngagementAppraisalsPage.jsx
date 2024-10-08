import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FormNavigation from "../../../../components/forms/FormNavigation";

const EngagementAppraisalPage = () => {
  const { title } = useParams(); // Get the title from URL parameters
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    isVoluntary: "",
    beneficiaries: "",
    startDate: "",
    endDate: "",
    hoursRendered: "",
    supportingDocuments: null,
    facultyReflection: "",
  });
  const navigate = useNavigate();

  const formConfig = [
    {
      id: 1,
      title: `Activity Documentation (${title})`,
      description:
        "Upon accomplishing this section, the Community Extension Office will be able to document your community engagement and participation for Academic Year 2024-2025.",
      questions: [],
    },
    {
      id: 2,
      title: "Community Engagement Appraisal",
      description: "",
      questions: [
        {
          id: "q1",
          questionText: "Title of Community Engagement",
          type: "text",
          value: formData.title,
          handleChange: (e) => handleAnswerChange("title", e.target.value),
        },
        {
          id: "q2",
          questionText:
            "Is this Community Engagement voluntary and an unpaid service?",
          type: "radio",
          options: ["Yes", "No"],
          value: formData.isVoluntary,
          handleChange: (e) =>
            handleAnswerChange("isVoluntary", e.target.value),
        },
        {
          id: "q3",
          questionText:
            "Who are the beneficiaries of this Community Engagement?",
          type: "text",
          value: formData.beneficiaries,
          handleChange: (e) =>
            handleAnswerChange("beneficiaries", e.target.value),
        },
        {
          id: "q4",
          questionText: "Start date of Community Engagement",
          type: "date",
          value: formData.startDate,
          handleChange: (e) => handleAnswerChange("startDate", e.target.value),
        },
        {
          id: "q5",
          questionText: "End date of Community Engagement",
          type: "date",
          value: formData.endDate,
          handleChange: (e) => handleAnswerChange("endDate", e.target.value),
        },
        {
          id: "q6",
          questionText:
            "Total number of hours rendered for this Community Engagement",
          type: "text",
          value: formData.hoursRendered,
          handleChange: (e) =>
            handleAnswerChange("hoursRendered", e.target.value),
        },
        {
          id: "q7",
          questionText: "Supporting Documents (Non-anonymous Question)",
          type: "file",
          description:
            "Please attach any document from this community engagement that will serve as a proof of your participation (any of these: attendance sheet, certificates, photo evidence/screenshot of the event, meeting, extension activity, meeting highlights, post-activity report). Community engagement with more than 16 hours rendered time must be consulted to the COMEX Office in person.",
          handleChange: (e) =>
            handleAnswerChange("supportingDocuments", e.target.files[0]),
        },
        {
          id: "q8",
          questionText: "Faculty Reflection",
          type: "text",
          description:
            "Please give us a glimpse of the community extension activity conducted by sharing your reflection and personal realization.",
          value: formData.facultyReflection,
          handleChange: (e) =>
            handleAnswerChange("facultyReflection", e.target.value),
        },
      ],
    },
  ];

  const handleAnswerChange = (questionId, answer) => {
    setFormData({ ...formData, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentStep < formConfig.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="mb- max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => navigate("/client/engagement-appraisals")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h2 className="text-3xl font-bold mb-4 text-center">
        {formConfig[currentStep].title}
      </h2>
      <p className="mb-8 text-lg text-center">
        {formConfig[currentStep].description}
      </p>
      <form>
        {formConfig[currentStep].questions.map((question) => (
          <div key={question.id} className="mb-4">
            <label className="block text-lg font-bold mb-2">
              {question.questionText}
            </label>
            {question.type === "text" && (
              <input
                type="text"
                value={question.value}
                onChange={question.handleChange}
                className="w-full p-2 border rounded-lg"
              />
            )}
            {question.type === "radio" &&
              question.options.map((option) => (
                <div key={option} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={formData.isVoluntary === option}
                      onChange={question.handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </div>
              ))}
            {question.type === "date" && (
              <input
                type="date"
                value={question.value}
                onChange={question.handleChange}
                className="w-full p-2 border rounded-lg"
              />
            )}
            {question.type === "file" && (
              <input
                type="file"
                onChange={question.handleChange}
                className="w-full p-2 border rounded-lg"
              />
            )}
            {question.description && (
              <p className="text-sm text-gray-600 mt-1">
                {question.description}
              </p>
            )}
          </div>
        ))}
      </form>
      <FormNavigation
        currentStep={currentStep}
        totalSteps={formConfig.length}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};

export default EngagementAppraisalPage;
