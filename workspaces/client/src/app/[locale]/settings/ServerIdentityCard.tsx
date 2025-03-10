"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { FC } from "react";

interface ServerIdentityProps {
  serverName: string;
  serverPhoto?: string;
  onServerNameChange: (name: string) => void;
  onPhotoChange: () => void;
}

export const ServerIdentityCard: FC<ServerIdentityProps> = ({
  serverName,
  serverPhoto,
  onServerNameChange,
  onPhotoChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Identity</CardTitle>
        <CardDescription>Customize how your server appears to users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={serverPhoto} />
              <AvatarFallback className="text-2xl">{serverName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <input
                type="file"
                id="server-photo"
                className="hidden"
                accept="image/*"
                onChange={onPhotoChange}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("server-photo")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="server-name">Server Name</Label>
              <Input
                id="server-name"
                value={serverName}
                onChange={(e) => onServerNameChange(e.target.value)}
                placeholder="Enter server name"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                For best results, upload a square image (512x512 pixels). Supports JPG, PNG, and GIF
                formats up to 5MB.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
