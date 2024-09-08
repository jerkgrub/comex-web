import { useNavigate } from "react-router-dom";
import RegisterComponentAdmin from "../../../../components/RegisterComponentAdmin";
import { ArrowLeft } from "lucide-react";

const CreateUserPage = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/admin/users");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={handleBackButton}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Users
      </button>

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Create New User</h2>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        {/* RegisterComponentAdmin */}
        <RegisterComponentAdmin />
      </div>
    </div>
  );
};

export default CreateUserPage;