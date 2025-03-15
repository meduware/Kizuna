export type formValues = {
  username?: string;
  email: string;
  password: string;
};

export type postRequest = {
  json: () => Promise<any>;
};

export type userData = {
  id: string;
  photo_url: string;
  username: string;
  email: string;
  user_metadata: {
    username: string;
    email: string;
    photo_url: string;
  };
  created_at: number;
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
  role_name: string;
  role_color: string;
  permissions: {};
  users: userData[];
}

export interface Channel {
  id: number;
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
  changeServer: () => { },
  changeUser: () => { },
  reloadServerList: () => { },
  serverList: [],
  loading: true,
};
