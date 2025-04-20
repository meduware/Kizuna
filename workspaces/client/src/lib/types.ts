export type userData = {
  id: number;
  sub: string;
  user: {
    id: string;
    username: string;
    email: string;
    photo_url: string;
  };
  role: {
    id: number;
    role_name: string;
    role_color: string;
    permissions: {
      power_level: number;
      access_server_settings: boolean;
      manage_server: boolean;
      manage_channel: boolean;
      manage_roles: boolean;
      manage_users: boolean;
      manage_logs: boolean;
      manage_technical_details: boolean;
      manage_automod: boolean;
      manage_bans: boolean;
      manage_messages: boolean;
    };
  };
};

export type FooterLink = {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

export interface Role {
  id: number;
  index: number;
  role_name: string;
  role_color: string;
  permissions: {};
  users: userData["user"][];
}

export interface Channel {
  id: number;
  index: number;
  channel_type: "text" | "voice";
  channel_name: string;
  channel_description: string;
  channel_permissions: {};
}

export interface technical_details {
  login_methods: string[];
  max_participants: number;
  bitrate: number;
  stream_quality: number;
  stream_fps: number;
  file_upload_limit: number;
  ipAddress: string;
  port: number;
}

export interface Server {
  server_name: string;
  server_image: string;
  created_at: Date;
  welcome_channel: string;
  technical_details: technical_details;
  logChannel: string;
  roles: Role[];
  channels: Channel[];
}

export interface localServer {
  ipAddress: string;
  port: number;
}

export interface GlobalContextType {
  currentUser: userData | null;
  currentChannel: any;
  changeChannel: any;
  setCurrentChannel: any;
  setCurrentServer: any;
  messages: any[];
  setMessages: any;
  fetchMessages: () => void;
  changeServer: (server: localServer) => void;
  changeUser: (token: string) => void;
  reloadServerList: () => void;
  currentServer: Server | null;
  serverList: Server[];
  loading: boolean;
}

export const initialGlobalContext: GlobalContextType = {
  currentUser: null,
  currentServer: null,
  currentChannel: null,
  messages: [],
  setMessages: () => {},
  fetchMessages: () => {},
  setCurrentChannel: () => {},
  setCurrentServer: () => {},
  changeChannel: () => {},
  changeServer: () => {},
  changeUser: () => {},
  reloadServerList: () => {},
  serverList: [],
  loading: true,
};
