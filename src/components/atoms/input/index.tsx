import { InputBoxProps } from "@/utils/types";
import React, { forwardRef } from "react";

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    {
      type = "text",
      placeholder,
      value,
      onChange,
      className = "w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400",
      disabled = false, // Add the disabled prop with a default value
    },
    ref
  ) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        ref={ref}
        disabled={disabled} // Apply the disabled prop
      />
    );
  }
);

InputBox.displayName = "InputBox";

export default InputBox;
