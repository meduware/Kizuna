export type formValues = {
  username?: string;
  email: string;
  password: string;
};

export type postRequest = {
  json: () => Promise<any>;
};

export type userData = {
  image: string;
  username: string;
  email: string;
  password: string;
  _id?: string;
  iat?: number;
};

export type FooterLink = {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

export interface Server {
  ipAddress: string;
  port: number;
}

export interface GlobalContextType {
  currentUser: any;
  changeServer: (server: Server) => void;
  changeUser: (token: string) => void;
  reloadServerList: () => void;
  currentServer: any;
  serverList: any;
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
