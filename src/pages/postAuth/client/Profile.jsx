import { Avatar } from "flowbite-react";
import React from "react";

const Profile = () => {
  return (
    <div className="w-full h-full bg-slate-200 p-6">
      <div className="card justify-center items-center p-12 gap-6">
        <div className="flex justify-center items-center gap-3">
          <Avatar
          rounded
            img="https://www.2020mag.com/CMSImagesContent/2014/9/Guy-Nerd-glasses_w.png"
            size="lg"
          />

          <div className="flex flex-col">
            <h1 className="text-5xl font-bold text-nucolor1">Hello</h1>
            <h1 className="text-5xl font-bold text-nucolor3">
              {localStorage.getItem("userFirstName")}!
            </h1>
          </div>
        </div>

        <div className="card shadow-lg p-6 bg-white w-max h-max flex gap-6">
          <div>
            <div className="font-bold">Full Name</div>
            <div>{`${localStorage.getItem(
              "userFirstName"
            )} ${localStorage.getItem("userLastName")}`}</div>
          </div>

          <div>
            <div className="font-bold">Mobile</div>
            <div>{localStorage.getItem("userMnum")}</div>
          </div>

          <div>
            <div className="font-bold">Department</div>
            <div>{localStorage.getItem("userDep")}</div>
          </div>

          <div>
            <div className="font-bold">Email</div>
            <div>{localStorage.getItem("userEmail")}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 gap-6 justify-center items-center">
        <div className="w-max">
          <div className="text-4xl font-regular text-nucolor1">
            You have participated in..
          </div>
          <div className="text-5xl font-semibold">Community Service</div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">I have Completed</div>
            <div className="stat-value">40</div>
            <div className="stat-desc">hours of community service</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
