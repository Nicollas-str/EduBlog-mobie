import {
  IAuthContextData,
  IAuthProviderProps,
  IAuthUser,
  IJwtPayload,
} from "@/interfaces/IAuth";
import { UserRole } from "@/types/UserRole";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

const TOKEN_KEY = "edublog_token";

const AuthContext = createContext<IAuthContextData | undefined>(undefined);

function normalizeRole(role?: string): UserRole | undefined {
  if (role === "PROFESSOR") {
    return "PROFESSOR";
  }

  if (role === "ALUNO") {
    return "ALUNO";
  }

  return undefined;
}

function decodeUser(token: string): IAuthUser {
  const payload = jwtDecode<IJwtPayload>(token);

  return {
    id: payload.sub,
    email: payload.email,
    role: normalizeRole(payload.role),
  };
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (!storedToken) {
          return;
        }

        const decodedUser = decodeUser(storedToken);

        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Não foi possível restaurar a sessão:", error);

        await SecureStore.deleteItemAsync(TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(email: string, password: string): Promise<void> {
    const response = await authService.login(email, password);

    const decodedUser = decodeUser(response.token);

    await SecureStore.setItemAsync(TOKEN_KEY, response.token);

    setToken(response.token);
    setUser(decodedUser);
  }

  async function logout(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

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
