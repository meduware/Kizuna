import { FilterRule } from "@shared/types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FilterRuleItemProps {
  rule: FilterRule;
  isActive: boolean;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FilterRuleItem({
  rule,
  isActive,
  onSelect,
  onToggle,
  onDelete,
}: FilterRuleItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-accent transition-colors ${
        isActive ? "bg-accent" : ""
      }`}
      onClick={() => onSelect(rule.id)}
    >
      <div className="flex items-center gap-2">
        <Switch
          checked={rule.enabled}
          onCheckedChange={() => {
            onToggle(rule.id);
          }}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="font-medium">{rule.name}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(rule.id);
        }}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
