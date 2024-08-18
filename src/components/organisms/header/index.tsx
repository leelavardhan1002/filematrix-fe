// components/organisms/header.tsx
import Button from "@/components/atoms/button";
import Logo from "@/components/atoms/logo";
import IconButton from "@/components/atoms/notification-button";
import SearchBar from "@/components/molecules/search-bar";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegBell } from "react-icons/fa";
import ProfileDropdown from "../profile-dropdown";
import { useAuth } from "@/contexts/authContext";

type HeaderProps = {
  variant?: "default" | "auth"; // Add variant to control the appearance
};

const Header: React.FC<HeaderProps> = ({ variant = "default" }) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const notifications = [
    {
      id: 1,
      type: "Document Shared",
      message: "John Doe shared 'Project Proposal.pdf' with you.",
      isRead: false,
      link: "/documents/1",
    },
    {
      id: 2,
      type: "Access Request",
      message: "Jane Smith requested access to 'Q2 Financial Report.xlsx'.",
      isRead: false,
      link: "/documents/2/requests",
    },
    {
      id: 3,
      type: "Approval Needed",
      message: "Your approval is required for 'HR Policy Update.docx'.",
      isRead: true,
      link: "/documents/3/approve",
    },
  ];

  if (variant === "auth") {
    return (
      <header className="relative flex items-center justify-between p-4 bg-white shadow-md">
        <Button
          customClasses="text-white bg-gray-500 p-2 rounded-lg hover:bg-gray-600"
          onClick={() => router.back()} // Go back to previous page
        >
          Back
        </Button>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Logo alt="FileMatrix Logo" />
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <Logo alt="FileMatrix Logo" />

      <SearchBar className="flex-grow mx-4 max-w-md" />
      <div className="flex gap-4">
        <IconButton icon={<FaRegBell />} notifications={notifications} />
        {user ? (
          <ProfileDropdown
            name={user?.firstName + user?.lastName}
            onLogout={handleLogout}
          />
        ) : (
          <>
            <Button
              customClasses="bg-blue-500 text-white p-4 rounded-lg"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
            <Button
              customClasses="bg-green-500 text-white p-4 rounded-lg"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
