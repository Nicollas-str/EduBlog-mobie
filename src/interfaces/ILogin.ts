export interface ILoginUser {
  id: string;
  email: string;
  name: string;
  role: string;
  username: string;
}

export interface ILoginResponse {
  data: {
    token: string;
    user: ILoginUser;
  };
}

export interface ILoginErrorResponse {
  message?: string;
}

export interface IApiError {
  message?: string;
  status?: number;
}
