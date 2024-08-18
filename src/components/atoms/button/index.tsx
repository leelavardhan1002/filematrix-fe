import { ButtonProps } from "@/utils/types";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  variant = "contained",
  size = "medium",
  onClick,
  children,
  icon,
  iconPosition = "start",
  customClasses = "",
  type = "button",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded focus:outline-none transition";

  // Define color classes
  const colorClasses = {
    primary: "text-white bg-blue-500 hover:bg-blue-600",
    secondary: "text-white bg-gray-500 hover:bg-gray-600",
    success: "text-white bg-green-500 hover:bg-green-600",
    error: "text-white bg-red-500 hover:bg-red-600",
    info: "text-white bg-cyan-500 hover:bg-cyan-600",
    warning: "text-white bg-yellow-500 hover:bg-yellow-600",
  };
  const outlinedClasses = {
    primary: "text-blue-500 border-blue-500 bg-transparent hover:text-blue-700",
    secondary:
      "text-gray-500 border-gray-500 bg-transparent hover:text-gray-700",
    success:
      "text-green-500 border-green-500 bg-transparent hover:text-green-700",
    error: "text-red-500 border-red-500 bg-transparent hover:text-red-700",
    info: "text-cyan-500 border-cyan-500 bg-transparent hover:text-cyan-700",
    warning:
      "text-yellow-500 border-yellow-500 bg-transparent hover:text-yellow-700",
  };

  // Define variant classes
  const variantClasses = {
    text: "bg-transparent text-current hover:bg-gray-100",
    outlined: `border-2 ${outlinedClasses[color]}`,
    contained: colorClasses[color],
  };

  // Define size classes
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${customClasses}`}
    >
      {icon && iconPosition === "start" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "end" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
