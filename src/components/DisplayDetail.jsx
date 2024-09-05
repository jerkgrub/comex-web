import React from "react";

const DisplayDetail = ({label, text}) => {
  return (
    <>
      <p className="font-base text-sm">{label}</p>
      <p className="font-bold">{text}</p>
    </>
  );
};

export default DisplayDetail;
