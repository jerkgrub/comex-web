// src/components/inputs/TextInput.jsx

const TextInput = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  error = false,
  errorMessage = "",
  maxLength
}) => {
  return (
    <div className="mb-5">
      {label && <h2 className="mb-1 pl-1 font-semibold">{label}</h2>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`input input-bordered w-full ${className} ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="pl-1 text-red-500 text-sm mt-1">* {errorMessage}</p>}
    </div>
  );
};

export default TextInput;