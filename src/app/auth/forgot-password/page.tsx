"use client";

import React, { useState } from "react";
import Header from "@/components/organisms/header";
import ForgotPasswordForm from "@/components/organisms/forgot-password-form";

const ForgotPasswordPage: React.FC = () => {
  return (
    <>
      <main className="w-screen h-screen ">
        <Header variant="auth" />
        <ForgotPasswordForm />
      </main>
    </>
  );
};

export default ForgotPasswordPage;
