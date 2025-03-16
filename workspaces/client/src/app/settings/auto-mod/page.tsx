"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ContentFiltersTab } from "./tabs-content/content-filter/ContentFiltersTab";
import { WordFiltersTab } from "./tabs-content/word-filter/WordsFilterTab";
import { AdvancedTab } from "./tabs-content/advanced/AdvancedTab";
import { useFilterRules } from "@/hooks/useFilterRules";
import { useContentFilters } from "@/hooks/useContentFilters";
import { useAdvancedSettings } from "@/hooks/useAdvancedSettings";

export default function AutoModSettingsPage(): JSX.Element {
  const { toast } = useToast();
  const {
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
  } = useFilterRules();

  const {
    notificationChannel,
    logAllActions,
    dmNotifications,
    quarantineMode,
    exemptedRoles,
    setNotificationChannel,
    setLogAllActions,
    setDmNotifications,
    setQuarantineMode,
    handleExemptedRolesChange,
  } = useAdvancedSettings();

  const { contentFilters, filterSeverity, setFilterSeverity, toggleContentFilter } =
    useContentFilters();

  const saveSettings = () => {
    console.log("api/hook");
    toast({
      title: "Success",
      description: "AutoMod settings have been saved",
    });
  };

  return (
    <div className="md:p-6 p-0 space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AutoMod Settings</h1>
          <p className="text-muted-foreground">Configure automated moderation for your server</p>
        </div>
        <Button onClick={saveSettings} className="flex items-center gap-2">
          <Save size={16} />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="content-filters">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="content-filters">Content Filters</TabsTrigger>
          <TabsTrigger value="word-filters">Word Filters</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="content-filters">
          <ContentFiltersTab
            contentFilters={contentFilters}
            onToggleFilter={toggleContentFilter}
            filterSeverity={filterSeverity}
            onChangeSeverity={setFilterSeverity}
          />
        </TabsContent>

        <TabsContent value="word-filters">
          <WordFiltersTab
            filterRules={filterRules}
            activeFilterId={activeFilterId}
            activeFilter={activeFilter}
            newFilterName={newFilterName}
            onNewFilterNameChange={setNewFilterName}
            onAddFilter={addFilterRule}
            onSelectFilter={setActiveFilterId}
            onToggleFilter={toggleFilterRule}
            onDeleteFilter={deleteFilterRule}
            onUpdateWords={updateFilterWords}
            onUpdateRegex={updateFilterRegex}
            onToggleAction={toggleAction}
            onUpdateTimeoutDuration={updateTimeoutDuration}
          />
        </TabsContent>

        <TabsContent value="advanced">
          <AdvancedTab
            notificationChannel={notificationChannel}
            logAllActions={logAllActions}
            dmNotifications={dmNotifications}
            quarantineMode={quarantineMode}
            exemptedRoles={exemptedRoles || []}
            onNotificationChannelChange={setNotificationChannel}
            onLogAllActionsChange={setLogAllActions}
            onDmNotificationsChange={setDmNotifications}
            onQuarantineModeChange={setQuarantineMode}
            onExemptedRolesChange={handleExemptedRolesChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
