"use client";
import React from "react";
import Form from "@/components/molecules/form";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import Header from "@/components/organisms/header";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const fields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      validation: {
        required: "Password is required",
      },
    },
  ];

  const handleSubmit = async (data: Record<string, any>, reset: () => void) => {
    await login(data.email, data.password);
    reset();
  };

  return (
    <div className="h-screen">
      <Header variant="auth" />

      <main className="w-screen h-4/5 flex justify-center items-center">
        <div className="container max-w-lg h-fit flex flex-col justify-center align-middle rounded-lg p-8 bg-slate-200">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <Form inputs={fields} buttonText="Login" onSubmit={handleSubmit} />
          <div className="mt-4 text-center">
            <Link
              href="/auth/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
