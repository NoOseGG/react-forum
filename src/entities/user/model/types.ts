export type User = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  address: string;
};
