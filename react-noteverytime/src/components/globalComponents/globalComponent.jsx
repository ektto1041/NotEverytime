import React from "react";
import "./globalComponent.scss";

export const InputContainer = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="p3 input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export const FulledButton = ({ variant, text, onClick }) => {
  return (
    <button
      className={`p3 FulledButton ${variant === "yellow" ? "" : "grey"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
