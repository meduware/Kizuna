"use client";

import { Button } from "@/components/ui/button";
import { Save, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ContentFiltersTab } from "./tabs-content/content-filter/ContentFiltersTab";
import { WordFiltersTab } from "./tabs-content/word-filter/WordsFilterTab";
import { AdvancedTab } from "./tabs-content/advanced/AdvancedTab";
import { useFilterRules } from "@/hooks/useFilterRules";
import { useContentFilters } from "@/hooks/useContentFilters";
import { useAdvancedSettings } from "@/hooks/useAdvancedSettings";
import { useTranslation } from "@/hooks/useTranslation";

export default function AutoModSettingsPage(): JSX.Element {
  const { toast } = useToast();
  const translation = useTranslation();
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
          <h1 className="text-2xl font-bold">{translation("AutoMod Settings")}</h1>
          <p className="text-muted-foreground">
            {translation("Configure automated moderation for your server")}
          </p>
        </div>
      </div>

      <Tabs defaultValue="content-filters">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="content-filters">{translation("Content Filters")}</TabsTrigger>
          <TabsTrigger value="word-filters">{translation("Word Filters")}</TabsTrigger>
          <TabsTrigger value="advanced">{translation("Advanced")}</TabsTrigger>
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
      <div className="flex justify-end gap-2 max-sm:flex-col-reverse">
        <Button variant="outline" className="px-8 max-sm:w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          {translation("Reset Changes")}
        </Button>
        <Button onClick={saveSettings} className="px-8 max-sm:w-full">
          <Save className="mr-2 h-4 w-4" />
          {translation("Save Changes")}
        </Button>
      </div>
    </div>
  );
}
