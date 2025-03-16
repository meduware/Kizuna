import { FilterRule } from "@shared/types";
import { FilterRuleItem } from "./FilterRuleItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FilterRulesListProps {
  filterRules: FilterRule[];
  activeFilterId: string | null;
  newFilterName: string;
  onNewFilterNameChange: (name: string) => void;
  onAddFilter: () => void;
  onSelectFilter: (id: string) => void;
  onToggleFilter: (id: string) => void;
  onDeleteFilter: (id: string) => void;
}

export function FilterRulesList({
  filterRules,
  activeFilterId,
  newFilterName,
  onNewFilterNameChange,
  onAddFilter,
  onSelectFilter,
  onToggleFilter,
  onDeleteFilter,
}: FilterRulesListProps) {
  return (
    <>
      <div className="flex flex-col space-y-1.5 p-4">
        <h3 className="font-semibold tracking-tight text-base">Filter Rules</h3>
        <p className="text-sm text-muted-foreground">Manage your custom word filters</p>
      </div>

      <div className="flex w-full gap-2 p-2 pr-6">
        <Input
          placeholder="New filter name"
          value={newFilterName}
          onChange={(e) => onNewFilterNameChange(e.target.value)}
        />
        <Button onClick={onAddFilter} size="icon">
          <Plus size={16} />
        </Button>
      </div>
      <ScrollArea className="h-[512px]">
        <CardContent className="p-2">
          <div className="space-y-2 pr-1">
            {filterRules.map((rule) => (
              <FilterRuleItem
                key={rule.id}
                rule={rule}
                isActive={activeFilterId === rule.id}
                onSelect={onSelectFilter}
                onToggle={onToggleFilter}
                onDelete={onDeleteFilter}
              />
            ))}
          </div>
        </CardContent>
        <ScrollBar />
      </ScrollArea>
    </>
  );
}
