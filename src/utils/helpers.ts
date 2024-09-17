import { CustomErrorCodes } from "./enums";

export const convertFormDataFromObject = (data: Record<string, unknown>) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key] as string);
  });

  return formData;
};

export const getErrorMessage = (error: unknown) => {
  let message = "Something went wrong. Please try again later.";
  let code: CustomErrorCodes = CustomErrorCodes.SomethingWentWrong;

  if (typeof error === "object" && error !== null && "response" in error) {
    const errorResponse = error.response as {
      data?: { message?: string; code?: CustomErrorCodes };
    };

    if (errorResponse.data?.message) {
      message = errorResponse.data.message;
    }
    if (errorResponse.data?.code) {
      code = errorResponse.data.code;
    }
  } else if (
    typeof error === "object" &&
    error !== null &&
    "request" in error
  ) {
    message = "No response from the server. Please try again later";
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    message = error.message as string;
  }

  return {
    message,
    code,
  };
};
