import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  className = "",
  error,
  name,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="mb-7">
      <label className="block mb-1 font-bold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border-2 border-gray-300 rounded-lg  ${
          error ? "border-red-500" : ""
        } ${className} placeholder-white`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
