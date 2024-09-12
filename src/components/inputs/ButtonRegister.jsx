import React from "react";

const ButtonRegister = ({ isChecked, onClick }) => {
  return (
    <div className="mt-4">
      <button
        onClick={onClick} // Use 'onClick' prop here
        className={`btn flex w-full font-semibold justify-center rounded-md bg-nucolor3 px-3 py-1.5 text-lg leading-6 text-nucolor4 shadow-sm ${
          isChecked ? "hover:bg-lightyellow hover:text-white3" : ""
        }`}
        disabled={!isChecked}
      >
        Register
      </button>
    </div>
  );
};

export default ButtonRegister;
