import React, { useState } from "react";

const CommunityEngagementForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    dateHired: "",
    engagementTitle: "",
    engagementType: "",
    startDate: "",
    endDate: "",
    totalHours: "",
    document: null,
    reflection: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    // Validate name
    const namePattern = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    if (!namePattern.test(formData.name)) {
      alert(
        "Name format should be: First Name, Middle Name (if applicable), Last Name"
      );
      return false;
    }

    // Validate email
    if (!formData.email.endsWith("@nu.edu.ph")) {
      alert("Please use a National University email address");
      return false;
    }

    // Validate mobile number
    if (formData.mobile.length !== 11) {
      alert("Mobile number should be 11 digits (e.g., 09123456789)");
      return false;
    }

    // Validate date format
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (
      !datePattern.test(formData.dateHired) ||
      !datePattern.test(formData.startDate) ||
      !datePattern.test(formData.endDate)
    ) {
      alert("Date format should be MM/DD/YYYY");
      return false;
    }

    // Validate hours
    const totalHours = calculateTotalHours(
      formData.startDate,
      formData.endDate
    );
    if (totalHours < 78) {
      setMessage(
        "You have not reached the required 78 hours of volunteer work."
      );
      return false;
    }

    return true;
  };

  const calculateTotalHours = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return diffHours;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const totalHours = calculateTotalHours(
        formData.startDate,
        formData.endDate
      );
      setMessage(
        `Thank you ${formData.name} for participating in ${formData.engagementTitle} for ${totalHours} hours. This ${formData.engagementType} will be rewarded by our office.`
      );
    }
  };

  return (
    <div className="p-9 bg-nucolor2 text-nucolor flex-column">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>
            1. Full Name (First Name, Middle Name, Last Name):
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            2. Email Address (NU Email):
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <small>National University email address only</small>
          </label>
        </div>
        <div className="mb-4">
          <label>
            3. Mobile Number:
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <small>Should be 11 digits (e.g., 09123456789)</small>
          </label>
        </div>
        <div className="mb-4">
          <label>
            4. Department:
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="College of Dentistry">College of Dentistry</option>
              <option value="School of Optometry">School of Optometry</option>
              <option value="School of Health Sciences">
                School of Health Sciences
              </option>
              <option value="School of Accountancy and Management">
                School of Accountancy and Management
              </option>
              <option value="School of Information Technology">
                School of Information Technology
              </option>
              <option value="School of Arts and Sciences">
                School of Arts and Sciences
              </option>
              <option value="School of Architecture">
                School of Architecture
              </option>
              <option value="Senior High School Department">
                Senior High School Department
              </option>
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label>
            5. Date Hired (MM/DD/YYYY):
            <input
              type="text"
              name="dateHired"
              value={formData.dateHired}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            6. Title of Community Engagement:
            <input
              type="text"
              name="engagementTitle"
              value={formData.engagementTitle}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            7. Type of Community Engagement:
            <select
              name="engagementType"
              value={formData.engagementType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Institutional">Institutional</option>
              <option value="College-Driven">College-Driven</option>
              <option value="Extension Services">Extension Services</option>
              <option value="Capacity-Building Services">
                Capacity-Building Services
              </option>
              <option value="External Participation">
                External Participation
              </option>
              <option value="UNSURE">UNSURE</option>
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label>
            8. Start Date of Community Engagement (MM/DD/YYYY):
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            9. End Date of Community Engagement (MM/DD/YYYY):
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            10. Total Number of Hours Rendered for this Community Engagement:
            <input
              type="number"
              name="totalHours"
              value={formData.totalHours}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            11. Document/File Upload (Non-anonymous question):
            <input
              type="file"
              name="document"
              onChange={handleChange}
              required
            />
            <small>
              Please attach any document from this community extension activity
              that will serve as proof of your participation (Any of these:
              attendance sheet, certificates, photo evidence/screenshot of the
              event, meeting, extension activity, meeting highlights,
              post-activity report)
            </small>
          </label>
        </div>
        <div className="mb-4">
          <label>
            12. Faculty Reflection:
            <textarea
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              required
            ></textarea>
            <small>
              Please give us a glimpse of the community extension activity
              conducted by sharing your reflection and personal realization.
            </small>
          </label>
        </div>
        <button className="bg-nucolor1 p-3 text-nucolor2" type="submit">
          Submit
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CommunityEngagementForm;
