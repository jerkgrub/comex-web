import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../../../api'; // Your Axios instance
import useFetchUserData from './../../../../components/hooks/useFetchUserData'; // Fetch user ID

const InstitutionalAppraisalPage = () => {
  const { activityId } = useParams(); // Get activityId from URL
  const { user, loading } = useFetchUserData(); // Fetch user data including userId
  const [activity, setActivity] = useState(null); // Store fetched activity data
  const [formData, setFormData] = useState({
    title: "",
    isVoluntary: "",
    beneficiaries: "",
    startDate: "",
    endDate: "",
    totalHoursRendered: "",
    supportingDocuments: null,
    facultyReflection: "",
  });
  const navigate = useNavigate();

  // Fetch activity data based on activityId
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await api.get(`/activity/${activityId}`);
        setActivity(response.data);
        setFormData({
          title: response.data.title,
          isVoluntary: response.data.isVoluntaryAndUnpaid ? "Yes" : "No",
          beneficiaries: response.data.beneficiaries,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          totalHoursRendered: response.data.hours,
          supportingDocuments: null, // Will be uploaded later
          facultyReflection: "", // User input
        });
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };

    fetchActivity();
  }, [activityId]);

  // Handle form submission (like EngagementAppraisalsPage)
  const handleSubmit = async () => {
    if (loading) {
      alert("User data is still loading. Please wait.");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("userId", user._id); // Use userId
    formDataToSubmit.append("activityId", activityId); // Include activityId
    formDataToSubmit.append("facultyReflection", formData.facultyReflection);

    // Handle file and other data as necessary
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
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => navigate("/client/engagement-appraisals")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>
      <h2 className="text-3xl font-bold mb-4 text-center">{formData.title}</h2>
      <p className="mb-8 text-lg text-center">Institutional Engagement Appraisal</p>

      {/* Form fields */}
      <form>
        {/* Faculty Reflection field */}
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2">Faculty Reflection</label>
          <textarea
            value={formData.facultyReflection}
            onChange={(e) => setFormData({ ...formData, facultyReflection: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="btn bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InstitutionalAppraisalPage;