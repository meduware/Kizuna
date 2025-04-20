import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useTranslation } from "@/hooks/useTranslation";

export const SettingSwitch = ({
  id,
  label,
  description,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}) => {
  const translation = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-sm text-muted-foreground">
          {translation(description)}
        </p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onToggle} />
    </div>
  );
};
