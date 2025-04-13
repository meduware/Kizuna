import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export const FileTypeToggle: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ id, label, checked, onChange }) => (
  <div className="flex items-center space-x-2">
    <Switch id={id} checked={checked} onCheckedChange={onChange} />
    <Label htmlFor={id}>{label}</Label>
  </div>
);
