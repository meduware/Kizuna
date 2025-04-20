import { FilterRule, ActionType } from "@shared/types";
import { Card } from "@/components/ui/card";
import { FilterRulesList } from "./FilterRulesList";
import { FilterRuleEditor } from "./FilterRuleEditor";
import { useTranslation } from "@/hooks/useTranslation";

interface WordFiltersTabProps {
  filterRules: FilterRule[];
  activeFilterId: string | null;
  activeFilter: FilterRule | null;
  newFilterName: string;
  onNewFilterNameChange: (name: string) => void;
  onAddFilter: () => void;
  onSelectFilter: (id: string) => void;
  onToggleFilter: (id: string) => void;
  onDeleteFilter: (id: string) => void;
  onUpdateWords: (words: string) => void;
  onUpdateRegex: (regex: string) => void;
  onToggleAction: (action: ActionType) => void;
  onUpdateTimeoutDuration: (duration: number) => void;
}

export function WordFiltersTab({
  filterRules,
  activeFilterId,
  activeFilter,
  newFilterName,
  onNewFilterNameChange,
  onAddFilter,
  onSelectFilter,
  onToggleFilter,
  onDeleteFilter,
  onUpdateWords,
  onUpdateRegex,
  onToggleAction,
  onUpdateTimeoutDuration,
}: WordFiltersTabProps) {
  const translation = useTranslation();

  return (
    <div className="flex lg:flex-row flex-col gap-4 w-full h-full">
      <Card className="lg:w-[30%] w-full h-full overflow-hidden">
        <FilterRulesList
          filterRules={filterRules}
          activeFilterId={activeFilterId}
          newFilterName={newFilterName}
          onNewFilterNameChange={onNewFilterNameChange}
          onAddFilter={onAddFilter}
          onSelectFilter={onSelectFilter}
          onToggleFilter={onToggleFilter}
          onDeleteFilter={onDeleteFilter}
        />
      </Card>

      <Card className="flex-1 max-lg:w-full">
        {activeFilter ? (
          <FilterRuleEditor
            filter={activeFilter}
            onUpdateWords={onUpdateWords}
            onUpdateRegex={onUpdateRegex}
            onToggleAction={onToggleAction}
            onUpdateTimeoutDuration={onUpdateTimeoutDuration}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-muted-foreground">
              {translation("Select a filter to configure")}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
