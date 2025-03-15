import { useState } from "react";

export function useAdvancedSettings() {
  const [notificationChannel, setNotificationChannel] = useState<string>("mod-logs");
  const [logAllActions, setLogAllActions] = useState<boolean>(true);
  const [dmNotifications, setDmNotifications] = useState<boolean>(true);
  const [quarantineMode, setQuarantineMode] = useState<boolean>(false);
  const [exemptedRoles, setExemptedRoles] = useState<string[]>(["admin", "moderator"]);

  const handleExemptedRolesChange = (roles: string[]) => {
    setExemptedRoles(roles);
  };

  return {
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
  };
}
