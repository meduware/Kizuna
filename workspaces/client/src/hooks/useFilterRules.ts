import { useState } from "react";
import { FilterRule, ActionType } from "@shared/types";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

const initialFilterRules: FilterRule[] = [
  {
    id: "1",
    name: "Profanity Filter",
    enabled: true,
    words: ["badword1", "badword2", "badword3"],
    actions: ["delete", "warn"],
  },
  {
    id: "2",
    name: "Spam Prevention",
    enabled: true,
    regex: "(\\w+)\\1{4,}",
    actions: ["delete", "timeout"],
    timeoutDuration: 5,
  },
];

export function useFilterRules() {
  const [filterRules, setFilterRules] = useState<FilterRule[]>(initialFilterRules);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(
    initialFilterRules[0]?.id || null
  );
  const [newFilterName, setNewFilterName] = useState("");
  const translation = useTranslation();

  const activeFilter = filterRules.find((rule) => rule.id === activeFilterId) || null;

  const addFilterRule = () => {
    if (!newFilterName.trim()) {
      toast({
        title: "Error",
        description: translation("Filter name cannot be empty") ,
        variant: "destructive",
      });
      return;
    }

    const newRule: FilterRule = {
      id: Date.now().toString(),
      name: newFilterName,
      enabled: true,
      words: [],
      actions: ["delete"],
    };

    setFilterRules([...filterRules, newRule]);
    setActiveFilterId(newRule.id);
    setNewFilterName("");
  };

  const deleteFilterRule = (id: string) => {
    setFilterRules(filterRules.filter((rule) => rule.id !== id));
    if (activeFilterId === id) {
      setActiveFilterId(filterRules[0]?.id || null);
    }
  };

  const toggleFilterRule = (id: string) => {
    setFilterRules(
      filterRules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))
    );
  };

  const updateFilterWords = (words: string) => {
    if (!activeFilterId) return;

    setFilterRules(
      filterRules.map((rule) =>
        rule.id === activeFilterId
          ? {
              ...rule,
              words: words
                .split(",")
                .map((w) => w.trim())
                .filter((w) => w),
            }
          : rule
      )
    );
  };

  const updateFilterRegex = (regex: string) => {
    if (!activeFilterId) return;

    setFilterRules(
      filterRules.map((rule) => (rule.id === activeFilterId ? { ...rule, regex } : rule))
    );
  };

  const toggleAction = (action: ActionType) => {
    if (!activeFilterId) return;

    setFilterRules(
      filterRules.map((rule) => {
        if (rule.id !== activeFilterId) return rule;

        const hasAction = rule.actions.includes(action);
        const actions = hasAction
          ? rule.actions.filter((a) => a !== action)
          : [...rule.actions, action];

        return { ...rule, actions };
      })
    );
  };

  const updateTimeoutDuration = (duration: number) => {
    if (!activeFilterId) return;

    setFilterRules(
      filterRules.map((rule) =>
        rule.id === activeFilterId ? { ...rule, timeoutDuration: duration } : rule
      )
    );
  };

  return {
    filterRules,
    activeFilterId,
    activeFilter,
    newFilterName,
    setNewFilterName,
    setActiveFilterId,
    addFilterRule,
    deleteFilterRule,
    toggleFilterRule,
    updateFilterWords,
    updateFilterRegex,
    toggleAction,
    updateTimeoutDuration,
  };
}
