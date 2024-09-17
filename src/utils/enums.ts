export enum AppRoutes {
  HOME = "/",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  DASHBOARD = "/dashboard",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
}

export const ExternalRoutes = {
  LINKED_IN: "https://www.linkedin.com/in/devansh-walia",
  GITHUB: "https://github.com/devansh-walia",
  BLOG: "https://medium.com/@devanshwalia9898",
};

export enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export enum CustomErrorCodes {
  SomethingWentWrong = "SomethingWentWrong",
  DuplicateUsername = "DuplicateUsername",
  DuplicateEmail = "DuplicateEmail",
  PasswordRequired = "PasswordRequired",
  InvalidPassword = "InvalidPassword",
  InvalidOtp = "InvalidOtp",
}
