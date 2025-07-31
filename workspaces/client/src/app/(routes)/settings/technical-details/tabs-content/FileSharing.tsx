import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FileSharingTabProps, FileSettings } from "@shared/types";
import { Slider } from "@/components/ui/slider";
import { createValidator, min, useValidation } from "@shared/utils/validation";
import { useTranslation } from "@/hooks/useTranslation";
import { ValidationError } from "@/components/(routes)/settings/validationError";
import { FileTypeToggle } from "@/components/(routes)/settings/fileTypeSwitch";

export function FileSharingTab({ settings, onChange }: FileSharingTabProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const translation = useTranslation();

  const storageQuotaValidator = createValidator([
    min(1, translation("Storage quota must be at least 1MB")),
  ]);
  const storageQuotaValidation = useValidation(
    localSettings.userStorageQuota,
    storageQuotaValidator,
  );

  useEffect(() => {
    if (storageQuotaValidation.isValid) {
      onChange(localSettings);
    }
  }, [localSettings]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileSizeChange = (value: string) => {
    const numValue = parseInt(value, 10);

    if (!isNaN(numValue)) {
      setLocalSettings((prev) => ({ ...prev, maxFileSize: numValue }));
    }
  };

  const handleStorageQuotaChange = (value: string) => {
    const numValue = parseInt(value, 10);

    setTouched((prev) => ({ ...prev, userStorageQuota: true }));

    if (!isNaN(numValue)) {
      setLocalSettings((prev) => ({ ...prev, userStorageQuota: numValue }));
    }
  };

  const handleFileTypeToggle = (
    type: keyof FileSettings["allowedFileTypes"],
    checked: boolean,
  ) => {
    setLocalSettings((prev) => ({
      ...prev,
      allowedFileTypes: {
        ...prev.allowedFileTypes,
        [type]: checked,
      },
    }));

    onChange({
      ...localSettings,
      allowedFileTypes: {
        ...localSettings.allowedFileTypes,
        [type]: checked,
      },
    });
  };

  const handleRetentionPolicyChange = (
    value: FileSettings["retentionPolicy"],
  ) => {
    setLocalSettings((prev) => ({ ...prev, retentionPolicy: value }));

    onChange({
      ...localSettings,
      retentionPolicy: value,
    });
  };

  return (
    <Card>
      <CardHeader className="p-6">
        <CardTitle>{translation("File Sharing Settings")}</CardTitle>
        <CardDescription>
          {translation(
            "Adjust storage limits and define which file types users can upload",
          )}
          .
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="file-size-slider">
            {translation("Max File Size")} (MB)
          </Label>
          <Slider
            id="file-size-slider"
            min={1}
            max={500}
            step={1}
            value={[localSettings.maxFileSize]}
            onValueChange={(value) => {
              handleFileSizeChange(value[0].toString());
              setTouched((prev) => ({ ...prev, maxFileSize: true }));
            }}
          />
          <p className="text-sm text-muted-foreground">
            {translation("Current limit")}: {localSettings.maxFileSize} MB
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="storage-quota">
            {translation("User Storage Quota")} (MB)
          </Label>
          <Input
            id="storage-quota"
            type="number"
            min={1}
            value={localSettings.userStorageQuota}
            onChange={(e) => {
              handleStorageQuotaChange(e.target.value);
              setTouched((prev) => ({ ...prev, userStorageQuota: true }));
            }}
            className={
              touched.userStorageQuota && !storageQuotaValidation.isValid
                ? "border-red-500"
                : ""
            }
          />
          {touched.userStorageQuota && (
            <ValidationError message={storageQuotaValidation.errorMessage} />
          )}
        </div>

        <div className="space-y-2">
          <Label>{translation("Allowed File Types")}</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(localSettings.allowedFileTypes).map(
              ([type, isEnabled]) => (
                <FileTypeToggle
                  key={type}
                  id={type}
                  label={translation(
                    type.charAt(0).toUpperCase() + type.slice(1),
                  )}
                  checked={isEnabled}
                  onChange={(checked) =>
                    handleFileTypeToggle(
                      type as keyof FileSettings["allowedFileTypes"],
                      checked,
                    )
                  }
                />
              ),
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="retention-policy">
            {translation("File Retention Policy")}
          </Label>
          <Select
            value={localSettings.retentionPolicy}
            onValueChange={handleRetentionPolicyChange}
          >
            <SelectTrigger id="retention-policy">
              <SelectValue
                placeholder={translation("Select retention period")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forever">
                {translation("Keep Forever")}
              </SelectItem>
              <SelectItem value="90days">90 {translation("Days")}</SelectItem>
              <SelectItem value="30days">30 {translation("Days")}</SelectItem>
              <SelectItem value="7days">7 {translation("Days")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
