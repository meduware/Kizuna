import React from "react";

interface ValidationErrorProps {
  message?: string;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({ message }) => {
  if (!message) return null;

  return <p className="text-sm text-red-500 mt-1">{message}</p>;
};
