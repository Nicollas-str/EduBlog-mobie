import { ILoginErrorResponse, ILoginResponse } from "@/interfaces/ILogin";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function login(
  email: string,
  password: string,
): Promise<ILoginResponse["data"]> {
  if (!API_URL) {
    throw new Error("A variável EXPO_PUBLIC_API_URL não foi configurada.");
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    let errorData: ILoginErrorResponse = {};

    try {
      errorData = await response.json();
    } catch {
      // A API pode retornar uma resposta sem JSON.
    }

    const error = new Error(
      errorData.message || "Não foi possível realizar o login.",
    );

    Object.assign(error, {
      status: response.status,
    });

    throw error;
  }

  const responseData: ILoginResponse = await response.json();

  return responseData.data;
}

export const authService = {
  login,
};
