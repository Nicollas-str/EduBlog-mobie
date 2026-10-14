import { ILoginResponse } from "@/interfaces/ILogin";
import { apiRequest } from "./apiClient";

async function login(
  email: string,
  password: string,
): Promise<ILoginResponse["data"]> {
  const response = await apiRequest<ILoginResponse>("/auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  return response.data;
}

export const authService = {
  login,
};
