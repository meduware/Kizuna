import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CapacitiesTabProps } from "@shared/types";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ValidationError } from "@/components/(settingspage)/validationError";
import { createValidator, min, useValidation } from "@shared/utils/validation";

const concurrentConnValidator = createValidator([min(1, "Must allow at least 1 connection")]);

const apiRateLimitValidator = createValidator([min(1, "Rate limit must be at least 1")]);

const bitrateValidator = createValidator([min(8, "Bitrate must be at least 8 kbps")]);

const streamFpsValidator = createValidator([min(1, "FPS must be at least 1")]);

export function CapacitiesTab({ settings, onChange }: CapacitiesTabProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const concurrentConnectionsValidation = useValidation(
    localSettings.maxConcurrentConnections,
    concurrentConnValidator
  );

  const apiRateLimitValidation = useValidation(localSettings.apiRateLimit, apiRateLimitValidator);

  const bitrateValidation = useValidation(localSettings.bitrate, bitrateValidator);

  const streamFpsValidation = useValidation(localSettings.streamFps, streamFpsValidator);

  useEffect(() => {
    const allValid =
      concurrentConnectionsValidation.isValid &&
      apiRateLimitValidation.isValid &&
      bitrateValidation.isValid &&
      streamFpsValidation.isValid;

    if (allValid) {
      onChange(localSettings);
    }
  }, [localSettings]);

  const handleNumericChange = (key: string, value: string): void => {
    const numValue = parseInt(value, 10);

    setTouched((prev) => ({ ...prev, [key]: true }));

    if (!isNaN(numValue)) {
      setLocalSettings((prev) => ({
        ...prev,
        [key]: numValue,
      }));
    }
  };

  const handleStreamQualityChange = (value: string): void => {
    setLocalSettings((prev) => ({
      ...prev,
      streamQuality: value,
    }));
    onChange({
      ...localSettings,
      streamQuality: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server & Room Capacities</CardTitle>
        <CardDescription>
          Define the system limitations to optimize performance and stability.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="server-capacity">Max Server Capacity</Label>
            <Slider
              id="server-capacity"
              min={1}
              max={500}
              step={1}
              value={[localSettings.maxServerCapacity]}
              onValueChange={(value) => {
                handleNumericChange("maxServerCapacity", value[0].toString());
              }}
            />
            <p className="text-sm text-muted-foreground">{localSettings.maxServerCapacity} users</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="room-capacity">Max Room Capacity</Label>
            <Slider
              id="room-capacity"
              min={1}
              max={100}
              step={1}
              value={[localSettings.maxRoomCapacity]}
              onValueChange={(value) => {
                handleNumericChange("maxRoomCapacity", value[0].toString());
                setTouched((prev) => ({ ...prev, maxRoomCapacity: true }));
              }}
            />
            <p className="text-sm text-muted-foreground">{localSettings.maxRoomCapacity} users</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="concurrent-connections">Concurrent Connections</Label>
            <Input
              id="concurrent-connections"
              type="number"
              value={localSettings.maxConcurrentConnections}
              onChange={(e) => {
                handleNumericChange("maxConcurrentConnections", e.target.value);
                setTouched((prev) => ({ ...prev, maxConcurrentConnections: true }));
              }}
              className={
                touched.maxConcurrentConnections && !concurrentConnectionsValidation.isValid
                  ? "border-red-500"
                  : ""
              }
            />
            {touched.maxConcurrentConnections && (
              <ValidationError message={concurrentConnectionsValidation.errorMessage} />
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="api-rate-limit">API Rate Limit</Label>
            <Input
              id="api-rate-limit"
              type="number"
              value={localSettings.apiRateLimit}
              onChange={(e) => {
                handleNumericChange("apiRateLimit", e.target.value);
                setTouched((prev) => ({ ...prev, apiRateLimit: true }));
              }}
              className={
                touched.apiRateLimit && !apiRateLimitValidation.isValid ? "border-red-500" : ""
              }
            />
            {touched.apiRateLimit && (
              <ValidationError message={apiRateLimitValidation.errorMessage} />
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bitrate">Bitrate Limit (kbps)</Label>
            <Input
              id="bitrate"
              type="number"
              value={localSettings.bitrate}
              onChange={(e) => {
                handleNumericChange("bitrate", e.target.value);
                setTouched((prev) => ({ ...prev, bitrate: true }));
              }}
              className={touched.bitrate && !bitrateValidation.isValid ? "border-red-500" : ""}
            />
            {touched.bitrate && <ValidationError message={bitrateValidation.errorMessage} />}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="stream-fps">Stream FPS Limit</Label>
            <Input
              id="stream-fps"
              type="number"
              value={localSettings.streamFps}
              onChange={(e) => {
                handleNumericChange("streamFps", e.target.value);
                setTouched((prev) => ({ ...prev, streamFps: true }));
              }}
              className={touched.streamFps && !streamFpsValidation.isValid ? "border-red-500" : ""}
            />
            {touched.streamFps && <ValidationError message={streamFpsValidation.errorMessage} />}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="stream-quality">Stream Quality</Label>
          <Select value={localSettings.streamQuality} onValueChange={handleStreamQualityChange}>
            <SelectTrigger id="stream-quality">
              <SelectValue placeholder="Select stream quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="480">480p</SelectItem>
              <SelectItem value="720">720p</SelectItem>
              <SelectItem value="1080">1080p</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
