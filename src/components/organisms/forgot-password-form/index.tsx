"use client";

import React, { useState } from "react";
import Button from "@/components/atoms/button";
import InputBox from "@/components/atoms/input";
import { useForm, Controller, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { sendOtpEmail, verifyOtpEmail } from "@/api/api";

const ForgotPasswordPage: React.FC = () => {
  const [otpSent, setOtpSent] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const email = watch("email");
  const router = useRouter();

  const handleSendOtp = async () => {
    clearErrors("email");

    if (!email) {
      setError("email", { type: "manual", message: "Email is required" });
      return;
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      setError("email", { type: "manual", message: "Invalid email address" });
      return;
    }

    try {
      await sendOtpEmail(email);
      toast.success(`OTP sent successfully to ${email}`);
      setOtpSent(true);
    } catch (error) {
      toast.error("User is not in the system. Please sign up.");
    }
  };

  const handleResendOtp = async () => {
    await handleSendOtp();
  };

  const handleOtpVerification = async (data: Record<string, any>) => {
    try {
        await verifyOtpEmail(data.email, data.otp);
        localStorage.setItem("email", data.email);
        toast.success(`OTP verified successfully for ${data.email}`);
        reset();
        router.push("/auth/update-password");
      } catch (error) {
        toast.error("Failed to verify OTP");
      }
  };

  return (
    <>
      <main className="w-screen h-4/5 flex justify-center items-center">
        <div className="container max-w-lg h-fit flex flex-col justify-center align-middle rounded-lg p-8 bg-slate-200">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Forgot Password
          </h1>
          <p className="mb-4 text-center text-gray-600">
            Enter your email address to receive an OTP for password reset.
          </p>
          <form
            onSubmit={handleSubmit(handleOtpVerification)}
            className="space-y-4"
          >
            {/* Email input */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <InputBox
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={otpSent}
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {(errors.email?.message as string) || "Error"}
                </span>
              )}
            </div>

            {/* Send OTP button */}
            {!otpSent && (
              <Button
                type="button"
                customClasses="w-full bg-blue-500 text-white p-2 rounded-lg"
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            )}

            {/* Resend OTP button */}
            {otpSent && (
              <Button
                type="button"
                customClasses="w-full bg-blue-600 text-white p-2 rounded-lg"
                onClick={handleResendOtp}
              >
                Resend OTP
              </Button>
            )}

            {/* OTP input box */}
            {otpSent && (
              <div className="space-y-1">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter OTP
                </label>
                <Controller
                  name="otp"
                  control={control}
                  rules={{
                    required: "OTP is required",
                    minLength: {
                      value: 4,
                      message: "OTP must be at least 4 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <InputBox
                      type="text"
                      placeholder="Enter OTP"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                />
                {errors.otp && (
                  <span className="text-red-500 text-sm">
                    {(errors.otp?.message as string) || "Error"}
                  </span>
                )}
              </div>
            )}

            {/* Submit button to verify OTP */}
            {otpSent && (
              <Button
                type="submit"
                customClasses="w-full bg-green-500 text-white p-2 rounded-lg"
              >
                Submit
              </Button>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default ForgotPasswordPage;
