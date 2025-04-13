import { useState, useCallback, useEffect, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TechnicalSettings } from "@shared/types";
import { apiHandler } from "@/lib/handlers/api";
import { baseUrls } from "@/lib/constants";
import { getSectionChanges } from "@shared/utils/settingsDiff";

export function useTechnicalSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<TechnicalSettings | null>(null);
  const [localSettings, setLocalSettings] = useState<TechnicalSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiHandler("/api/server-management/server-details", null, "GET");
      setSettings(response.server_details);
      setLocalSettings(response.server_details);
      return response.server_details;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load server settings",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback(
    async (updatedSettings: TechnicalSettings) => {
      if (!updatedSettings || !settings) return;

      const { isLoginMethodChanged, isFileSharingChanged, isCapacitiesChanged } = getSectionChanges(
        settings,
        updatedSettings
      );

      const formData = new FormData();
      setIsSaving(true);

      const updated = updatedSettings.technical_details;
      if (isLoginMethodChanged) {
        formData.append("login_methods", JSON.stringify(updated.login_methods));
      }
      if (isFileSharingChanged) {
        formData.append("file_sharing", JSON.stringify(updated.file_sharing));
      }
      if (isCapacitiesChanged) {
        formData.append("capacities", JSON.stringify(updated.capacities));
      }

      try {
        await fetch(`${baseUrls.API}/api/server-management/update-server`, {
          method: "PUT",
          body: formData,
        });

        toast({
          title: "Success",
          description: "Settings updated successfully",
        });

        const newSettings = await fetchSettings();
        setSettings(newSettings);
        setLocalSettings(newSettings);
        return newSettings;
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to update settings: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          variant: "destructive",
        });
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [settings, toast, fetchSettings]
  );

  const handleSave = async () => {
    if (!localSettings) return;
    return await updateSettings(localSettings);
  };

  const updateSection = useCallback(
    <T>(key: keyof TechnicalSettings["technical_details"], value: T) => {
      if (!localSettings) return;
      setLocalSettings({
        ...localSettings,
        technical_details: {
          ...localSettings.technical_details,
          [key]: value,
        },
      });
    },
    [localSettings]
  );

  const isFormChanged = JSON.stringify(settings) !== JSON.stringify(localSettings);

  return {
    settings,
    localSettings,
    isLoading,
    isSaving,
    isFormChanged,
    handleSave,
    updateSection,
  };
}
