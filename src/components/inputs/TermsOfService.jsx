import React from "react";

const TermsOfService = ({ isChecked, handleCheckboxChange }) => {
  return (
    <div className="form-control mt-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="checkbox mr-2"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="">
          <h2>
            By clicking Register, you are agreeing to Comex Connect's{" "}
            <a
              href="/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-nucolor6"
            >
              Terms of Service
            </a>{"."}<br/>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
