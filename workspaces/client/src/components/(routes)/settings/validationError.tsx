import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface ValidationErrorProps {
  message?: string;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({
  message,
}) => {
  const translation = useTranslation();

  if (!message) return null;

  return <p className="text-sm text-red-500 mt-1">{translation(message)}</p>;
};
