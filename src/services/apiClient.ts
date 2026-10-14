import { IApiErrorPayload } from "@/interfaces/IApi";
import { ApiRequestOptions } from "@/types/Api";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getErrorMessage(payload: unknown, status: number): string {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (typeof payload === "object" && payload !== null) {
    const errorPayload = payload as IApiErrorPayload;
    const { message, error } = errorPayload;

    if (Array.isArray(message) && message.length > 0) {
      return message.join(", ");
    }

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    if (typeof error === "string" && error.trim()) {
      return error;
    }
  }

  return `A requisição falhou (HTTP ${status}).`;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("A variável EXPO_PUBLIC_API_URL não foi configurada.");
  }

  const { token, onUnauthorized, body, headers, ...requestOptions } = options;

  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const baseUrl = API_URL.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  const url = `${baseUrl}/${normalizedPath}`;

  const response = await fetch(url, {
    ...requestOptions,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const responseText = await response.text();

  let payload: unknown;

  if (responseText.trim()) {
    try {
      payload = JSON.parse(responseText) as unknown;
    } catch {
      payload = responseText;
    }
  }

  if (response.status === 401 && token && onUnauthorized) {
    await onUnauthorized();
  }

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(payload, response.status),
      response.status,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return payload as T;
}
