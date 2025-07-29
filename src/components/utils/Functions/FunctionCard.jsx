import React from "react";

const FunctionCard = ({ title, description, functions = [], variant = "default" }) => {
  const baseClasses =
    "bg-white rounded-2xl shadow p-6 cursor-pointer block transition-shadow hover:shadow-lg";
  const textColor = variant === "alternate" ? "text-white" : "text-black";
  const descriptionColor = variant === "alternate" ? "text-gray-300" : "text-gray-700";
  const listTextColor = variant === "alternate" ? "text-gray-200" : "text-gray-600";

  return (
    <div className={baseClasses}>
      {title && (
        <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>
          {title}
        </h2>
      )}
      {description && (
        <p className={`text-sm mb-4 ${descriptionColor}`}>
          {description}
        </p>
      )}
      {functions.length > 0 && (
        <ul className={`list-disc list-inside text-sm space-y-1 ${listTextColor}`}>
          {functions.map((func, index) => (
            <li key={index}>{func}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FunctionCard;
