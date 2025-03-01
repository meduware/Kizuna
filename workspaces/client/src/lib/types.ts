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
