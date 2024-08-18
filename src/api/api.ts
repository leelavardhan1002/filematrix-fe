// api.ts

import { BASE_URL, LOGIN_ENDPOINT, SIGNUP_ENDPOINT } from "@/api/constants";

//Auth APIs
export const signupRequest = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${BASE_URL}${SIGNUP_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  if (!response.ok) {
    throw new Error("Signup request failed");
  }

  return response.json();
};

export const loginRequest = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login request failed");
  }

  return response.json();
};

//Forgot & Update Password APIs

export const sendOtpEmail = async (email: string) => {
  const response = await fetch(
    "https://user-service-latest.onrender.com/api/v1/otp/sendOtpEmail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send OTP");
  }

  return response.json();
};

export const verifyOtpEmail = async (email: string, otp: string) => {
  const response = await fetch(
    "https://user-service-latest.onrender.com/api/v1/users/verifyOtpEmail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to verify OTP");
  }

  return response.json();
};

export const resetPassword = async (email: string, password: string) => {
  const response = await fetch(
    "https://user-service-latest.onrender.com/api/v1/users/resetPassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update password");
  }

  return response.json();
};
