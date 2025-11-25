export type User = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: string;
  username: string;
  token: string;
};

export const mockUser: User = {
  username: "testuser",
  password: "password123",
};
