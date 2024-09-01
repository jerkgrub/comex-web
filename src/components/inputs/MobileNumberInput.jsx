const MobileNumberInput = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  error = false,
  errorMessage = "",
}) => {
  return (
    <div className="mb-5">
      {label && <h2 className="mb-1 pl-1 font-semibold">{label}</h2>}
      <label className="input input-bordered flex items-center gap-1">
        <text className="font-light">+63</text>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border-none outline-none focus:border-none focus:ring-0 w-full ${className} ${
            error ? "border-red-500" : ""
          }`}
        />
      </label>

      {error && (
        <p className="pl-1 text-red-500 text-sm mt-1">* {errorMessage}.</p>
      )}
    </div>
  );
};

export default MobileNumberInput;
