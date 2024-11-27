import { ErrorResponse } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./api";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error: ErrorResponse) => {
      console.error("Login error:", error.response?.data?.message || error.message);
    },
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error: ErrorResponse) => {
      console.error("Registration error:", error.response?.data?.message || error.message);
    },
  });
};
