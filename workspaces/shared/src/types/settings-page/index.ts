export type ActionType = "delete" | "warn" | "timeout" | "kick" | "ban";

export interface FilterRule {
  id: string;
  name: string;
  enabled: boolean;
  words?: string[];
  regex?: string;
  actions: ActionType[];
  timeoutDuration?: number;
}

export interface ContentFilters {
  profanity: boolean;
  spam: boolean;
  links: boolean;
  mentions: boolean;
  newAccounts: boolean;
  capitalization: boolean;
  invites: boolean;
  attachments: boolean;
}

export interface AdvancedSettings {
  notificationChannel: string;
  logAllActions: boolean;
  dmNotifications: boolean;
  quarantineMode: boolean;
  exemptedRoles: string[];
}
