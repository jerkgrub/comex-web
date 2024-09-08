import { useNavigate } from "react-router-dom";
import RegisterComponentAdmin from "../../../../components/RegisterComponentAdmin";

const CreateUserPage = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    console.log("Back button clicked");
    navigate("/admin/users");
  }

  return (
    <>
      <div className="bg-white flex p-12 justify-start w-full h-full">
        <div className="bg-white w-full">
          {/* 1st section */}
          <div className="flex flex-row justify-start items-center gap-4">
            <div className="text-4xl text-blue mb-3 font-bold hover:underline" onClick={handleBackButton}>
              Manage Users
            </div>
            <div className="text-xl"> / Create User</div>
          </div>

          {/* 2nd section */}
          <div className="flex justify-center items-center">
          <RegisterComponentAdmin/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserPage;
