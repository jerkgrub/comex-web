import React from "react";

const FormNavigation = ({ currentStep, totalSteps, onNext, onBack }) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onBack}
        disabled={currentStep === 0}
        className={`btn bg-nucolor3 hover:bg-nucolor2 font-bold py-2 px-4 rounded-lg ${
          currentStep === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        Back
      </button>

      <button
        onClick={onNext}
        className="btn bg-nucolor3 hover:bg-nucolor2 font-bold py-2 px-4 rounded-lg"
      >
        {currentStep + 1 === totalSteps ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default FormNavigation;
