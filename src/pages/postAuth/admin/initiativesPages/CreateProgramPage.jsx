import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../api";
import { ArrowLeft, Plus } from "lucide-react";

const CreateProgramPage = () => {
  const navigate = useNavigate();
  const [program, setProgram] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };

  const handleCreateProgram = () => {
    api
      .post("/program/new", program, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/admin/initiatives/programs"); // Adjust navigation path as needed
      })
      .catch(() => {
        setError("Failed to create program");
      });
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/admin/initiatives/programs`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={handleCreateProgram}
          className="px-4 py-2 bg-nucolor3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Program
        </button>
      </div>

      <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-6">
        Create New Program
      </h2>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6">
          <InputField
            label="Program Title"
            name="title"
            value={program.title}
            onChange={handleInputChange}
          />
          
          <TextAreaField
            label="Description"
            name="description"
            value={program.description}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}:</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};

// Reusable TextArea Field Component
const TextAreaField = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}:</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        rows={5}
      />
    </div>
  );
};

export default CreateProgramPage;