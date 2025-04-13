import { User, Role, RolePermissions } from "..";

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
  roles: Role[];
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
  userRoles: Role[];
  isOpen: boolean;
  onClose: () => void;
  onAssignRole: (roleId: number) => void;
}

// User-Management

// Roles

export interface RoleListProps {
  roles: Role[];
  activeRole: Role | null;
  onRoleSelect: (role: Role) => void;
  onCreateRoleClick: () => void;
}

export interface CreateRoleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRole: (roleName: string, roleColor: string) => Promise<boolean>;
}

export interface RoleGeneralSettingsProps {
  roleName: string;
  roleColor: string;
  onRoleNameChange: (name: string) => void;
  onRoleColorChange: (color: string) => void;
}

export interface Permission {
  id: string;
  label: string;
}

export interface PermissionCategory {
  name: string;
  permissions: Permission[];
}
export interface RolePermissionsProps {
  permissionCategories: PermissionCategory[];
  activePermissions: RolePermissions;
  onTogglePermission: (permissionId: string) => void;
}

export interface RoleMembersProps {
  users: User[];
  onRemoveUser: (userId: string) => void;
  formatDate: (date: Date) => string;
}

export interface RoleEditorProps {
  role: Role;
  permissionCategories: PermissionCategory[];
  formatDate: (date: Date) => string;
  onUpdateRole: (role: Role) => void;
  onDeleteRole: (roleId: number) => void;
  onRemoveUser: (userId: string) => void;
  onRoleNameChange: (name: string) => void;
  onRoleColorChange: (color: string) => void;
  onTogglePermission: (permissionId: string) => void;
}
// Roles

// Technical Details

export interface TechnicalSettings {
  created_at: Date;
  server_image: string;
  server_name: string;
  technical_details: technical_details;
}

interface technical_details {
  login_methods: AuthSettings;
  capacities: CapacitySettings;
  file_sharing: FileSettings;
}

export interface AuthSettings {
  passwordAuth: boolean;
  oAuthSupport: boolean;
  allowRegister: boolean;
  anonymousLogin: boolean;
  oAuthProviders: {
    google: boolean;
    github: boolean;
    apple: boolean;
  };
}
export interface CapacitySettings {
  maxServerCapacity: number;
  maxRoomCapacity: number;
  maxConcurrentConnections: number;
  apiRateLimit: number;
  bitrate: number;
  streamFps: number;
  streamQuality: string;
}

export interface FileSettings {
  maxFileSize: number;
  userStorageQuota: number;
  retentionPolicy: "forever" | "90days" | "30days" | "7days";
  allowedFileTypes: {
    images: boolean;
    documents: boolean;
    audio: boolean;
    video: boolean;
  };
}

export interface AuthenticationTabProps {
  settings: AuthSettings;
  onChange: (settings: AuthSettings) => void;
}

export interface CapacitiesTabProps {
  settings: CapacitySettings;
  onChange: (settings: CapacitySettings) => void;
}

export interface FileSharingTabProps {
  settings: FileSettings;
  onChange: (settings: FileSettings) => void;
}

// Technical Details
