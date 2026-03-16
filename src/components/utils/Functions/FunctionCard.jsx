import React from "react";

const FunctionCard = ({ title, description, functions, variant = "default" }) => {
  const safeFunctions = Array.isArray(functions) ? functions : [];

  const baseClasses =
    "bg-white rounded-2xl shadow p-6 cursor-pointer block transition-shadow hover:shadow-lg h-full flex flex-col";
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
      {safeFunctions.length > 0 ? (
        <ul className={`list-disc list-inside text-sm space-y-1 ${listTextColor} flex-1`}>
          {safeFunctions.map((func, index) => (
            <li key={index}>{func}</li>
          ))}
        </ul>
      ) : (
        <p className={`text-sm italic ${listTextColor} flex-1`}>
          No hay funcionalidades disponibles.
        </p>
      )}
    </div>
  );
};

export default FunctionCard;