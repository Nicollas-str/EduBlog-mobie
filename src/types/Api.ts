export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  token?: string | null;
  body?: unknown;
  onUnauthorized?: () => void | Promise<void>;
};

export type AuthenticatedRequestOptions = Omit<
  ApiRequestOptions,
  "token" | "onUnauthorized"
>;
