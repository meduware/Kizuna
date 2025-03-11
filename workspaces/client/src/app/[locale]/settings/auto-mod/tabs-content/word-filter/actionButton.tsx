import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ActionType } from "@shared/types";

interface ActionButtonProps {
  action: ActionType;
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function ActionButton({ icon, label, isActive, onClick }: ActionButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className="justify-start pl-2"
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Button>
  );
}
