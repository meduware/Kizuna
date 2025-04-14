import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AuthSettings, AuthenticationTabProps } from "@shared/types";
import { SettingSwitch } from "@/components/(settingspage)/settingsSwitch";
import { useTranslation } from "@/hooks/useTranslation";

export function AuthenticationTab({ settings, onChange }: AuthenticationTabProps) {
  const translation = useTranslation();
  if (!settings) return null;

  const handleToggle = (key: keyof AuthSettings, value: boolean) => {
    onChange({ ...settings, [key]: value });
  };

  const handleOAuthProviderToggle = (
    provider: keyof AuthSettings["oAuthProviders"],
    value: boolean
  ) => {
    onChange({
      ...settings,
      oAuthProviders: {
        ...settings.oAuthProviders,
        [provider]: value,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translation("Authentication Methods")}</CardTitle>
        <CardDescription>
          {translation("Configure how users can log in to your server")}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <SettingSwitch
            id="password-auth"
            label={translation("Password Authentication")}
            description={translation("Allow users to sign in with username and password")}
            checked={settings.passwordAuth}
            onToggle={(checked) => handleToggle("passwordAuth", checked)}
          />

          <SettingSwitch
            id="oauth-auth"
            label={translation("OAuth Integration")}
            description={translation("Enable sign in with third-party services")}
            checked={settings.oAuthSupport}
            onToggle={(checked) => handleToggle("oAuthSupport", checked)}
          />

          <SettingSwitch
            id="register-auth"
            label={translation("Allow Register")}
            description={translation("Allow users to create new accounts")}
            checked={settings.allowRegister}
            onToggle={(checked) => handleToggle("allowRegister", checked)}
          />

          <SettingSwitch
            id="anonymous-auth"
            label={translation("Anonymously Login")}
            description={translation("Allow users to login anonymously")}
            checked={settings.anonymousLogin}
            onToggle={(checked) => handleToggle("anonymousLogin", checked)}
          />
        </div>

        {settings.oAuthSupport && (
          <div className="space-y-4">
            <Label>{translation("OAuth Providers")}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(settings.oAuthProviders).map(([provider, isEnabled]) => (
                <div key={provider} className="flex items-center space-x-2">
                  <Switch
                    id={`${provider}-auth`}
                    checked={isEnabled}
                    onCheckedChange={(checked) =>
                      handleOAuthProviderToggle(
                        provider as keyof AuthSettings["oAuthProviders"],
                        checked
                      )
                    }
                  />
                  <Label htmlFor={`${provider}-auth`}>
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
