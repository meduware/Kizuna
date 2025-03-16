import { User, Role, roles_with_users } from "..";

// AutoMod
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
// AutoMod

// User-Management
export interface UsersTableProps {
  users: User[];
  roles: roles_with_users[];
  isLoading: boolean;
  onEditUser: (user: User) => void;
  onManageRoles: (user: User) => void;
  onRemoveUser: (userId: string) => void;
}

export interface UserSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshData: () => void;
}

export interface EditUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onAvatarChange: (file: File) => void;
  onUsernameChange: (username: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export interface ManageRoleDialogProps {
  user: User | null;
  roles: Role[];
  userRoles: roles_with_users[];
  isOpen: boolean;
  onClose: () => void;
  onAssignRole: (roleId: number) => void;
}

// User-Management
