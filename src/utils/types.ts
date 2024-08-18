import { FieldValues } from "react-hook-form";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ButtonProps {
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactElement;
  iconPosition?: "start" | "end";
  customClasses?: string;
  type?: "button" | "submit" | "reset";
}

export interface InputBoxProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export interface LogoProps {
  alt: string;
  className?: string;
}

export interface Notification {
  id: number;
  type: string;
  message: string;
  isRead: boolean;
  link?: string;
}

export interface IconButtonProps {
  icon: React.ReactNode;
  notifications: Notification[];
  className?: string;
}

export interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  validation?: any;
}

export interface FormProps {
  inputs: FormInputProps[];
  buttonText: string;
  onSubmit: (data: FieldValues, reset: () => void) => void;
}

export interface ProfilePictureProps {
  alt: string;
  className?: string;
}

export interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export interface ProfileDropdownProps {
  name: string;
  onLogout: () => void;
}
