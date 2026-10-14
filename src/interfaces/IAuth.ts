import { UserRole } from "@/types/UserRole";
import { ReactNode } from "react";

export interface IJwtPayload {
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
}

export interface IAuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  role: UserRole;
}

export interface IAuthContextData {
  user: IAuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IAuthSession {
  token: string;
  user: IAuthUser;
}
