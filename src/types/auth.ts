export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  profile?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}