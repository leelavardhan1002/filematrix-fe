"use client";
import { AuthProvider } from "@/contexts/authContext";

const AuthProviders = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthProviders;
