"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { AuthenticationTab } from "./tabs-content/Authentication";
import { CapacitiesTab } from "./tabs-content/Capacities";
import { FileSharingTab } from "./tabs-content/FileSharing";
import { useTechnicalSettings } from "@/hooks/useTechnicalDetails";
import { useTranslation } from "@/hooks/useTranslation";
import { LoadingSpinner } from "@/components/(routes)/settings/LoadingSpinner";

export default function TechnicalDetails(): JSX.Element {
  const translation = useTranslation();
  const {
    localSettings,
    isLoading,
    isSaving,
    handleSave,
    updateSection,
    isFormChanged,
  } = useTechnicalSettings();

  if (!localSettings)
    return <LoadingSpinner message="Technical Details Loading" />;

  return (
    <div className="flex-1 space-y-6 p-1 md:p-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {translation("Technical Details")}
        </h1>
        <p className="text-muted-foreground">
          {translation(
            "Configure server technical settings, capacities, and file sharing limits",
          )}
          .
        </p>
      </div>

      <Tabs defaultValue="authentication" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 truncate">
          <TabsTrigger
            className="max-sm:text-xs truncate"
            value="authentication"
          >
            {translation("Authentication")}
          </TabsTrigger>
          <TabsTrigger className="max-sm:text-xs truncate" value="capacities">
            {translation("Capacities")}
          </TabsTrigger>
          <TabsTrigger className="max-sm:text-xs truncate" value="file-sharing">
            {translation("File Sharing")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="authentication" className="space-y-4">
          <AuthenticationTab
            settings={localSettings.technical_details.login_methods}
            onChange={(val) => updateSection("login_methods", val)}
          />
        </TabsContent>

        <TabsContent value="capacities" className="space-y-4">
          <CapacitiesTab
            settings={localSettings.technical_details.capacities}
            onChange={(val) => updateSection("capacities", val)}
          />
        </TabsContent>

        <TabsContent value="file-sharing" className="space-y-4">
          <FileSharingTab
            settings={localSettings.technical_details.file_sharing}
            onChange={(val) => updateSection("file_sharing", val)}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="px-8 max-sm:w-full"
          disabled={isSaving || isLoading || !isFormChanged}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? translation("Saving...") : translation("Save Changes")}
        </Button>
      </div>
    </div>
  );
}
