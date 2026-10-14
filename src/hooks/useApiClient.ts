import { useCallback } from "react";

import { AuthenticatedRequestOptions } from "@/types/Api";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/apiClient";

export function useApiClient() {
  const { token, logout } = useAuth();

  const request = useCallback(
    async <T>(
      path: string,
      options: AuthenticatedRequestOptions = {},
    ): Promise<T> => {
      return apiRequest<T>(path, {
        ...options,
        token,
        onUnauthorized: logout,
      });
    },
    [token, logout],
  );

  return { request };
}
