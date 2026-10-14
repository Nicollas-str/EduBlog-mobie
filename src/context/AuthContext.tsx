import * as SecureStore from "expo-secure-store";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

import {
  IAuthContextData,
  IAuthProviderProps,
  IAuthSession,
  IAuthUser,
} from "@/interfaces/IAuth";
import { UserRole } from "@/types/UserRole";
import { authService } from "../services/authService";

const SESSION_KEY = "edublog_session";

const AuthContext = createContext<IAuthContextData | undefined>(undefined);

function normalizeRole(role: string): UserRole | undefined {
  if (role === "PROFESSOR") {
    return "PROFESSOR";
  }

  if (role === "ALUNO") {
    return "ALUNO";
  }

  return undefined;
}

function isTokenExpired(token: string): boolean {
  const payload = jwtDecode<JwtPayload>(token);

  if (!payload.exp) {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedSession = await SecureStore.getItemAsync(SESSION_KEY);

        if (!storedSession) {
          return;
        }

        const session: IAuthSession = JSON.parse(storedSession);

        if (!session.token || !session.user || isTokenExpired(session.token)) {
          await SecureStore.deleteItemAsync(SESSION_KEY);

          return;
        }

        setToken(session.token);
        setUser(session.user);
      } catch (error) {
        console.error("Não foi possível restaurar a sessão:", error);

        await SecureStore.deleteItemAsync(SESSION_KEY);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(email: string, password: string): Promise<void> {
    const response = await authService.login(email, password);

    const normalizedRole = normalizeRole(response.user.role);

    if (!normalizedRole) {
      throw new Error("O perfil retornado pela API é inválido.");
    }

    const authenticatedUser: IAuthUser = {
      id: response.user.id,
      email: response.user.email,
      name: response.user.name,
      role: normalizedRole,
      username: response.user.username,
    };

    const session: IAuthSession = {
      token: response.token,
      user: authenticatedUser,
    };

    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));

    setToken(response.token);
    setUser(authenticatedUser);
  }

  async function logout(): Promise<void> {
    await SecureStore.deleteItemAsync(SESSION_KEY);

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }

  return context;
}
