import { FilterRule, ActionType } from "@shared/types";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, AlertTriangle, Clock, User, Shield } from "lucide-react";
import { ActionButton } from "./actionButton";
import { useTranslation } from "@/hooks/useTranslation";

interface FilterRuleEditorProps {
  filter: FilterRule;
  onUpdateWords: (words: string) => void;
  onUpdateRegex: (regex: string) => void;
  onToggleAction: (action: ActionType) => void;
  onUpdateTimeoutDuration: (duration: number) => void;
}

export function FilterRuleEditor({
  filter,
  onUpdateWords,
  onUpdateRegex,
  onToggleAction,
  onUpdateTimeoutDuration,
}: FilterRuleEditorProps) {
  const translation = useTranslation();
  const actionButtons = [
    { action: "delete", icon: <Trash2 size={16} />, label: translation("Delete Message") },
    { action: "warn", icon: <AlertTriangle size={16} />, label: translation("Warn User") },
    { action: "timeout", icon: <Clock size={16} />, label: translation("Timeout") },
    { action: "kick", icon: <User size={16} />, label: translation("Kick User") },
    { action: "ban", icon: <Shield size={16} />, label: translation("Ban User") },
  ];
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{filter.name}</span>
          <Badge variant={filter.enabled ? "default" : "outline"}>
            {filter.enabled ? translation("Enabled") : translation("Disabled")}
          </Badge>
        </CardTitle>
        <CardDescription>
          {translation("Configure what content is filtered and what actions to take")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="filter-words">{translation("Filtered Words")}</Label>
          <Textarea
            id="filter-words"
            placeholder={translation("Enter words separated by commas")}
            value={filter.words?.join(", ") || ""}
            className="h-24"
            onChange={(e) => onUpdateWords(e.target.value)}
          />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">
            {translation("Enter words to filter, separated by commas")}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="filter-regex">{translation("Regex Pattern (Optional)")}</Label>
          <Input
            id="filter-regex"
            placeholder={translation("Enter a regular expression")}
            value={filter.regex || ""}
            onChange={(e) => onUpdateRegex(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {translation("Advanced: Use regular expressions for more complex patterns")}
          </p>
        </div>

        <div className="space-y-2">
          <Label>{translation("Actions to Take")}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {actionButtons.map(({ action, icon, label }) => (
              <ActionButton
                key={action}
                action={action as ActionType}
                icon={icon}
                label={label}
                isActive={filter.actions.includes(action as ActionType)}
                onClick={() => onToggleAction(action as ActionType)}
              />
            ))}
          </div>
        </div>

        {filter.actions.includes("timeout") && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="timeout-duration">{translation("Timeout Duration (minutes)")}</Label>
              <span>
                {filter.timeoutDuration || 5} {translation("min")}
              </span>
            </div>
            <Input
              type="number"
              id="timeout-duration"
              value={filter.timeoutDuration || 5}
              onChange={(e) => onUpdateTimeoutDuration(parseInt(e.target.value))}
            />
            {/* ??? */}
          </div>
        )}
      </CardContent>
    </>
  );
}
