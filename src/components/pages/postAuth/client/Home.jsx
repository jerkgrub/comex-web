import React from "react";
import Header from "./Navbar/Header";
import { Users } from "lucide-react";

export const Home = () => {
  return (
    <div className="flex-row p-12 ">
      <h1 className="text-2xl">COMEX Forms:</h1>
      
      

      <div className="p-4 m-12">
        <div className="w-max p-3">
          <div className="self-center">
            Community Engagement Form
          </div>
          <div className="bgself-center">
          <Users className="m-4 w-14 h-14"/>
          <button 
              className="bg-nucolor3 p-3" 
              onClick={() => window.open('/studform', '_blank', 'height=600,width=800')}
            >
              Click here
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 m-12">
        <div className="w-max p-3">
          <div className="self-center">
            Student Engagement Form
          </div>
          <div className="bgself-center">
          <Users className="m-4 w-14 h-14"/>
            <button 
              className="bg-nucolor3 p-3" 
              onClick={() => window.open('/comform', '_blank', 'height=600,width=800')}
            >
              Click here
            </button>
          </div>
        </div>
      </div>




    </div>
  )
};
