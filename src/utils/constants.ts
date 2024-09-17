export const accessTokenCookieKey = "access_token";
export const refreshTokenCookieKey = "refresh_token";

export interface FormState {
  state: "IDLE" | "LOADING" | "ERROR" | "SUCCESS";
  message?: string;
  payload?: unknown;
}
