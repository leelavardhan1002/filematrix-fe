"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/atoms/button";
import InputBox from "@/components/atoms/input";
import Header from "@/components/organisms/header";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { resetPassword } from "@/api/api";

const UpdatePasswordPage: React.FC = () => {
  const router = useRouter();
  const email = localStorage.getItem("email");
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  // Custom validation function for password confirmation
  const validatePasswordMatch = (value: string) => {
    return value === newPassword || "Passwords do not match";
  };

  const handleUpdatePassword = async (data: Record<string, any>) => {
    try {
        await resetPassword(email as string, data.newPassword);
        toast.success("Password updated successfully");
        router.push("/auth/login");
      } catch (error) {
        toast.error("Failed to update password");
      }
  };

  return (
    <div className="h-screen">
      <Header variant="auth" />

      <main className="w-screen h-5/6 flex justify-center items-center">
        <div className="container max-w-lg h-fit flex flex-col justify-center align-middle rounded-lg p-8 bg-slate-200">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Update Password
          </h1>
          <p className="mb-4 text-center text-gray-600">
            Enter your new password and confirm it.
          </p>
          <form
            onSubmit={handleSubmit(handleUpdatePassword)}
            className="space-y-4"
          >
            {/* New Password input */}
            <div className="space-y-1">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Controller
                name="newPassword"
                control={control}
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                }}
                render={({ field }) => (
                  <InputBox
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {(errors.newPassword?.message as string) || "Error"}
                </span>
              )}
            </div>

            {/* Confirm Password input */}
            <div className="space-y-1">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: validatePasswordMatch,
                }}
                render={({ field }) => (
                  <InputBox
                    type="password"
                    placeholder="Confirm your new password"
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {(errors.confirmPassword?.message as string) || "Error"}
                </span>
              )}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              customClasses="w-full bg-green-500 text-white p-2 rounded-lg"
            >
              Update Password
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdatePasswordPage;
