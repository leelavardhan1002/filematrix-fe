"use client";
import Form from "@/components/molecules/form";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import Header from "@/components/organisms/header";

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const fields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      validation: {
        required: "First name is required",
      },
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      validation: {
        required: "Last name is required",
      },
    },
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
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters long",
        },
      },
    },
    {
      id: "re-enter password",
      label: "Re-Enter Password",
      type: "password",
      placeholder: "Re-enter your password",
    },
    {
      id: "terms",
      label: "I accept the terms and conditions",
      type: "checkbox",
      validation: {},
    },
  ];

  const handleSubmit = async (data: Record<string, any>, reset: () => void) => {
    await signup(data.firstName, data.lastName, data.email, data.password);
    reset();
  };

  return (
    <div className="h-screen">
      <Header variant="auth" />

      <main className="w-screen h-5/6 flex justify-center items-center">
        <div className="container max-w-lg h-fit flex flex-col justify-center align-middle rounded-lg p-8 bg-slate-200">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create an Account
          </h1>
          <Form inputs={fields} buttonText="Register" onSubmit={handleSubmit} />
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
