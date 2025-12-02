export type User = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: string;
  username: string;
  token: string;
};

export type Split = {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
}