import React from "react";

const Button = ({
  children,
  onClick,
  className,
  disabled,
  type = "button",
  form,
  name,
  value,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 bg-white  rounded-md  transition-all disabled:cursor-not-allowed ${className} `}
      type={type}
      form={form}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
};

export default Button;
