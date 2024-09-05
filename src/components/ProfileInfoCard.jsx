import { Avatar } from "flowbite-react";
import React from "react";
import ccLogo from "../components/images/ccLogo.png";
import DisplayDetail from "./DisplayDetail";
import FetchUserData from "./hooks/FetchUserData";
import FormatDepartment from "./FormatDepartment"; // Import the new component

const ProfileInfoCard = () => {
  const user = FetchUserData();
  
  return (
    <div className="bg-card px-4 pb-4 pt-2 rounded-2xl drop-shadow-lg">
      <div className="justify-center items-center flex flex-row">
        <img className="w-12" src={ccLogo} alt="Company Logo" />
        <h1 className="text-lg font-roboto-slab font-bold">COMEX CONNECT</h1>
      </div>

      {/* Email */}
      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-center items-center">
          <p className="flex flex-row text-sm justify-center items-center gap-1">
            Email:<p className="text-base font-bold"> {user.email}</p>
          </p>
        </div>
      </div>

      {/* Content Row */}
      <div className="flex flex-row gap-4 mt-3 justify-end items-center">
        <div className="flex justify-start flex-col items-center">
          <Avatar img={user.avatar} size="xl" className="drop-shadow-sm"/>
          <p className="mt-1 text-sm font-roboto-slab font-bold">{localStorage.getItem("userUsertype")}</p>
        </div>

        <div className="flex flex-row gap-4 justify-center items-center">
          <div>
            <DisplayDetail label="First name:" text={user.firstName} />
            <DisplayDetail label="Middle name:" text={user.middleName} />
            <DisplayDetail label="Last name:" text={user.lastName} />
          </div>
          <div className="flex flex-col">
            <DisplayDetail label="ID Number:" text={user.idNumber} />
            <DisplayDetail label="Mobile Number:" text={user.mobileNumber} />
            <div className="flex flex-col">
              <DisplayDetail 
                label="Department:" 
                text={<FormatDepartment department={user.department} />} // Use the component correctly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
