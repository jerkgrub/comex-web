import { Avatar } from "flowbite-react";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ccLogo from "../components/images/ccLogo.png";
import DisplayDetail from "./DisplayDetail";
import FormatDepartment from "./FormatDepartment";
import useFetchUserData from "./hooks/useFetchUserData";

const ProfileInfoCardSigned = () => {
  const { user, loading } = useFetchUserData();

  return (
    <div className="bg-card px-4 pb-4 pt-2 rounded-2xl drop-shadow-lg select-none">
      <div className="justify-center items-center flex flex-row">
        <img
          className="w-12 pointer-events-none select-none"
          src={ccLogo}
          alt="Company Logo"
        />
        <h1 className="text-lg font-roboto-slab font-bold select-none">
          COMEX CONNECT
        </h1>
      </div>

      {/* Email */}
      <div className="flex flex-row justify-center mt-2">
        <div className="flex flex-row justify-center items-center">
          <p className="flex flex-row text-sm justify-center items-center gap-1">
            <span className="select-none">Email:</span>
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <span className="text-base font-bold"> {user.email}</span>
            )}
          </p>
        </div>
      </div>

      {/* Content Row */}
      <div className="flex flex-row gap-4 mt-5 justify-center items-center">
        <div className="flex justify-start flex-col items-center">
          {loading ? (
            <Skeleton
              square={true}
              height={120}
              width={120}
              className="mb-2"
            />
          ) : (
            <Avatar
              img={user.avatar}
              size="xl"
              className="pointer-events-none select-none drop-shadow-sm"
            />
          )}
          {loading ? (
            <Skeleton width={80} height={20} />
          ) : (
            <p className="select-none mt-1 text-sm font-roboto-slab font-bold">
              {user.usertype}
            </p>
          )}
        </div>

        <div className="flex flex-row gap-4 justify-center items-start">
          <div>
            <DisplayDetail
              label="First name:"
              text={
                loading ? (
                  <Skeleton width={100} />
                ) : (
                  user.firstName || "N/A"
                )
              }
            />
            <DisplayDetail
              label="Middle name:"
              text={
                loading ? (
                  <Skeleton width={100} />
                ) : (
                  user.middleName || "N/A"
                )
              }
            />
            <DisplayDetail
              label="Last name:"
              text={
                loading ? (
                  <Skeleton width={100} />
                ) : (
                  user.lastName || "N/A"
                )
              }
            />
          </div>
          <div className="flex flex-col">
            <DisplayDetail
              label="ID Number:"
              text={
                loading ? (
                  <Skeleton width={100} />
                ) : (
                  user.idNumber || "N/A"
                )
              }
            />
            <DisplayDetail
              label="Mobile Number:"
              text={
                loading ? (
                  <Skeleton width={100} />
                ) : (
                  user.mobileNumber || "N/A"
                )
              }
            />
            <DisplayDetail
              label="Department:"
              text={
                loading ? (
                  <Skeleton width={150} />
                ) : (
                  <FormatDepartment department={user.department} />
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCardSigned;