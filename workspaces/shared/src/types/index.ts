import { z } from "zod";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      movies: {
        Row: {
          // the data expected from .select()
          id: number;
          name: string;
          data: Json | null;
        };
        Insert: {
          // the data to be passed to .insert()
          id?: never; // generated columns must not be supplied
          name: string; // `not null` columns with no default must be supplied
          data?: Json | null; // nullable columns can be omitted
        };
        Update: {
          // the data to be passed to .update()
          id?: never;
          name?: string; // `not null` columns are optional on .update()
          data?: Json | null;
        };
      };
    };
  };
}

export interface AuthSettings {
  allowAnonymous: boolean;
  allowGoogleAuth: boolean;
  allowGitHubAuth: boolean;
  allowNewAccounts: boolean;
}

export const ipAddressSchema = z.string().refine(
  (value) => {
    const ipv4Regex =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

    return (
      ipv4Regex.test(value) ||
      ipv6Regex.test(value) ||
      domainRegex.test(value) ||
      value === "localhost"
    );
  },
  { message: "Please enter a valid IP address or domain name" }
  //all simplified
);

export const portSchema = z.string().refine(
  (value) => {
    if (value === "") return true;
    const port = parseInt(value);
    return !isNaN(port) && port >= 0 && port <= 65535;
  },
  { message: "Port must be between 0 and 65535" }
);

export const serverAddressSchema = z.object({
  ipAddress: ipAddressSchema,
  port: portSchema,
});

export interface Channel {
  id: string;
  name: string;
}

export interface Server {
  serverName: string;
  serverPhoto?: string;
  welcomeChannel: string;
  logEnabled: boolean;
  logChannel: string;
  channels: Channel[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  photo_url: string;
  created_at: Date;
}

export interface RolePermissions {
  owner: boolean;
  manage_users: boolean;
  manage_server: boolean;
  [key: string]: boolean | undefined;
}

export interface Role {
  id: number;
  role_name: string;
  permissions: RolePermissions;
  role_color: string;
  users: User[];
}

export * from "./settings-page";
