import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../../../../api"; // Import your Axios instance
import useFetchUserData from "./../../../../components/hooks/useFetchUserData"; // Import your custom hook
import FormNavigation from "../../../../components/forms/FormNavigation";
import Skeleton from "react-loading-skeleton"; // Import Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS

const InstitutionalAppraisalPage = () => {
  const { activityId } = useParams(); // Get the activityId from URL parameters
  const { user, loading } = useFetchUserData(); // Fetch user data including userId
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "", // Matches backend field
    isVoluntary: "", // Matches backend field
    beneficiaries: "", // Matches backend field
    startDate: "", // Matches backend field
    endDate: "", // Matches backend field
    totalHoursRendered: "", // Matches backend field
    supportingDocuments: null, // Matches backend field
    facultyReflection: "", // Matches backend field
  });
  const [preFilledFields, setPreFilledFields] = useState([]); // New state for pre-filled fields
  const navigate = useNavigate();

  // New state to hold the activity data
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await api.get(`/activity/${activityId}`);
        console.log("API Response:", response.data);
        const activity = response.data.Activity || response.data.activity;
  
        if (!activity) {
          throw new Error("Activity data not found in the response.");
        }
  
        console.log("Fetched Activity Data:", activity); // Add this line
  
        setActivityData(activity);

        // Prepare preFilledFields
        const preFilled = [];

        setFormData({
          title: activity.title || "",
          isVoluntary: activity.isVoluntaryAndUnpaid ? "Yes" : "No",
          beneficiaries: activity.beneficiaries || "",
          startDate: activity.startDate ? activity.startDate.split("T")[0] : "",
          endDate: activity.endDate ? activity.endDate.split("T")[0] : "",
          totalHoursRendered: activity.hours ? activity.hours.toString() : "",
          supportingDocuments: null,
          facultyReflection: "",
        });

        if (activity.title) preFilled.push("title");
        if (activity.isVoluntaryAndUnpaid !== undefined)
          preFilled.push("isVoluntary");
        if (activity.beneficiaries) preFilled.push("beneficiaries");
        if (activity.startDate) preFilled.push("startDate");
        if (activity.endDate) preFilled.push("endDate");
        if (activity.hours) preFilled.push("totalHoursRendered");

        setPreFilledFields(preFilled);
      } catch (error) {
        console.error("Error fetching activity data:", error);
        // Handle the error appropriately
      }
    };

    fetchActivityData();
  }, [activityId]);

  const formConfig = [
    {
      id: 1,
      title: activityData ? (
        `Activity Documentation (${activityData.title})`
      ) : (
        <Skeleton width={600} height={30} />
      ),
      description: activityData ? (
        "Upon accomplishing this section, the Community Extension Office will be able to document your community engagement and participation for Academic Year 2024-2025."
      ) : (
        <Skeleton count={2} width={650} />
      ),
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
          fieldName: "title",
          type: "text",
          value: formData.title,
          handleChange: (e) => handleAnswerChange("title", e.target.value),
        },
        {
          id: "q2",
          questionText:
            "Is this Community Engagement voluntary and an unpaid service?",
          fieldName: "isVoluntary",
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
          fieldName: "beneficiaries",
          type: "text",
          value: formData.beneficiaries,
          handleChange: (e) =>
            handleAnswerChange("beneficiaries", e.target.value),
        },
        {
          id: "q4",
          questionText: "Start date of Community Engagement",
          fieldName: "startDate",
          type: "date",
          value: formData.startDate,
          handleChange: (e) => handleAnswerChange("startDate", e.target.value),
        },
        {
          id: "q5",
          questionText: "End date of Community Engagement",
          fieldName: "endDate",
          type: "date",
          value: formData.endDate,
          handleChange: (e) => handleAnswerChange("endDate", e.target.value),
        },
        {
          id: "q6",
          questionText:
            "Total number of hours rendered for this Community Engagement",
          fieldName: "totalHoursRendered",
          type: "text",
          value: formData.totalHoursRendered,
          handleChange: (e) =>
            handleAnswerChange("totalHoursRendered", e.target.value),
        },
        {
          id: "q7",
          questionText: "Supporting Documents (Non-anonymous Question)",
          fieldName: "supportingDocuments",
          type: "file",
          description:
            "Please attach any document from this community engagement that will serve as a proof of your participation (any of these: attendance sheet, certificates, photo evidence/screenshot of the event, meeting, extension activity, meeting highlights, post-activity report).",
          handleChange: (e) =>
            handleAnswerChange("supportingDocuments", e.target.files[0]),
        },
        {
          id: "q8",
          questionText: "Faculty Reflection",
          fieldName: "facultyReflection",
          type: "text",
          description: "Please share your reflection and personal realization.",
          value: formData.facultyReflection,
          handleChange: (e) =>
            handleAnswerChange("facultyReflection", e.target.value),
        },
      ],
    },
  ];

  const handleAnswerChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < formConfig.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (loading) {
      alert("User data is still loading. Please wait.");
      return;
    }
  
    const formDataToSubmit = new FormData();
    // Set isRegisteredEvent to 'false' to include additional fields
    formDataToSubmit.append("isRegisteredEvent", "false"); // Changed from 'true' to 'false'
    // Removed activityId and type since it's now a non-registered event
    formDataToSubmit.append("type", activityData.type); // Ensure 'type' is still included if necessary
    formDataToSubmit.append("userId", user._id); // Use userId fetched from useFetchUserData
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append(
      "isVoluntary",
      formData.isVoluntary === "Yes" ? "true" : "false"
    ); // Ensure it's a string
    formDataToSubmit.append("beneficiaries", formData.beneficiaries);
    formDataToSubmit.append("startDate", formData.startDate);
    formDataToSubmit.append("endDate", formData.endDate);
    formDataToSubmit.append("totalHoursRendered", formData.totalHoursRendered);
    formDataToSubmit.append("facultyReflection", formData.facultyReflection);
  
    // Automatically add location and organizer from activityData
    if (activityData.location) {
      formDataToSubmit.append("location", activityData.location);
    } else {
      console.warn("Activity data is missing 'location'.");
    }
  
    if (activityData.organizer) {
      formDataToSubmit.append("organizer", activityData.organizer);
    } else {
      console.warn("Activity data is missing 'organizer'.");
    }
  
    if (formData.supportingDocuments) {
      formDataToSubmit.append(
        "supportingDocument",
        formData.supportingDocuments
      );
    }
  
    // Log FormData entries to verify
    console.log("Submitting Form Data:");
    for (let pair of formDataToSubmit.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    try {
      const response = await api.post("/credit/new", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        alert("Credit form submitted successfully!");
        navigate("/client/engagement-appraisals");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error Response:", error.response.data);
        console.error("Status Code:", error.response.status);
        alert(
          `Error: ${error.response.data.message || "Submission failed."}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error Request:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        // Something else caused the error
        console.error("Error Message:", error.message);
        alert("There was an error submitting the form. Please try again.");
      }
    }
  };
  

  return (
    <div className="w-screen h-max min-h-[calc(100vh_-_80px)] py-12  flex justify-center items-center">
      <div className="max-w-3xl h-max mx-auto p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() =>
            navigate("/client/evalutaion-forms")
          }
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
                  className={`w-full p-2 border rounded-lg ${
                    preFilledFields.includes(question.fieldName)
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={preFilledFields.includes(question.fieldName)}
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
                        disabled={preFilledFields.includes(question.fieldName)}
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
                  className={`w-full p-2 border rounded-lg ${
                    preFilledFields.includes(question.fieldName)
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={preFilledFields.includes(question.fieldName)}
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
    </div>
  );
};

export default InstitutionalAppraisalPage;
