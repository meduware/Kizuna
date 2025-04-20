"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { Upload } from "lucide-react";
import { FC, useState, useRef } from "react";

interface ServerIdentityProps {
  serverName: string;
  serverPhoto?: string;
  onServerNameChange: (name: string) => void;
  onPhotoChange: (file: File) => void;
}

export const ServerIdentityCard: FC<ServerIdentityProps> = ({
  serverName,
  serverPhoto,
  onServerNameChange,
  onPhotoChange,
}) => {
  const translation = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      onPhotoChange(file);
    } catch (error) {
      console.error("Error handling avatar change:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translation("Server Identity")}</CardTitle>
        <CardDescription>
          {translation("Customize how your server appears to users")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={serverPhoto} />
              <AvatarFallback className="text-2xl">{serverName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button variant="outline" size="sm" onClick={handleUpload} disabled={isUploading}>
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? `${translation("Processing")}...` : `${translation("Change Photo")}`}
              </Button>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="server-name">{translation("Server Name")}</Label>
              <Input
                id="server-name"
                value={serverName}
                onChange={(e) => onServerNameChange(e.target.value)}
                placeholder={translation(`Enter server name`)}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {translation(
                  "For best results, upload a square image (512x512 pixels). Supports JPG, PNG, and GIF formats up to 5MB"
                )}
                .
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
