import React from "react";
import "./globalComponent.scss";

export const InputContainer = ({ label, type, placeholder, value, onChange }) => {

  return (
    <div className="input-Container">
      {label ? (
        <div key="label" className="p3">{label}</div>
      ) : (<></>)}
      <input
      className="p3 input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      />
    </div>
    
  );
};

export const Button = ({color, size, text, onClick}) => {
  return (
    <button
      className={`p3 button ${!color ? "" : color} ${!size ? "" : size}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
