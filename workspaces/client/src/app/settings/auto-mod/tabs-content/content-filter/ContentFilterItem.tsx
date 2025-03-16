import { ReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ContentFilterItemProps {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

export function ContentFilterItem({
  id,
  icon,
  title,
  description,
  isEnabled,
  onToggle,
}: ContentFilterItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {icon}
          <Label htmlFor={id}>{title}</Label>
        </div>
        <p className="text-sm text-muted-foreground ml-6">{description}</p>
      </div>
      <Switch id={id} checked={isEnabled} onCheckedChange={onToggle} />
    </div>
  );
}
