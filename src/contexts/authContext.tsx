import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { AuthContextType } from "@/utils/types";
import toast from "react-hot-toast";
import { loginRequest, signupRequest } from "@/api/api";
import { BASE_URL, LOGOUT_ENDPOINT } from "@/api/constants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch token and user from localStorage or API
    const initAuth = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");
        const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

        if (storedToken && storedUser && storedIsAuthenticated) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(JSON.parse(storedIsAuthenticated));
        }
      } catch (error) {
        console.error("Error initializing auth state:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const data = await signupRequest(firstName, lastName, email, password);

      if (data) {
        toast.success("Signup successful!");
        login(email, password);
        router.push("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password);

      if (data) {
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        router.push("/");
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid Credentials. Please try again.");
    }
  };

  const logout = async () => {
    try {
      console.log(token);
      const data = await fetch(`${BASE_URL}${LOGOUT_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        router.push("/");
        toast.success("Logout successful!");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, signup, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
