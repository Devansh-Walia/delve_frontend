import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-primary mb-2">{label}</label>
      <input
        className="w-full px-4 py-2 border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        {...props}
      />
    </div>
  );
};

export default CustomInput;
