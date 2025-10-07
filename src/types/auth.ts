export type User = {
  id: string;
  name: string | null;
  email: string;
  password: string;
}

export type AuthContextType = {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
  register: (user: User) => Promise<void>;
  isAuthenticated: boolean;
}
