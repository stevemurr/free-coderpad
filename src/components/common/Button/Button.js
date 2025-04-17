import React from "react";
import "./Button.css";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const buttonClasses = `button button-${variant} button-${size} ${className} ${disabled ? "button-disabled" : ""}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
