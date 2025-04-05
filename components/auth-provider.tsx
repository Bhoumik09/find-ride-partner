"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { fetchUser } from "@/actions/auth";

interface AuthData {
  token: string;
  userData: any;
}

interface UserProfileData {
  id: string;
  phoneNumber: string;
  name: string;
  gender: "male" | "female";
}

interface AuthContextType {
  authData: AuthData | null;
  setUserData: (data: UserProfileData) => void;
  setToken: (token: string) => void;
  handleSignOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  userData?: { userInfo: UserProfileData };
}> = ({ children, userData: initialUserData }) => {
  const [authData, setAuthData] = useState<AuthData>({
    token: "",
    userData: null,
  });

  const router = useRouter();
  const token = Cookies.get("token");

  const { data, isLoading } = useQuery(
    ["fetchUser"],
    () => fetchUser(token!),
    {
      enabled: !!token, // only run if token exists
      onSuccess: (data) => {
        setAuthData({
          token: token!,
          userData: data?.userInfo || null,
        });
        if (data) {
          void router.push("/find-rides");
        }else{
            void router.push('/auth')
        }
      },
      onError: () => {
        Cookies.remove("token");
        router.push("/auth");
      },
      initialData: initialUserData,
    }
  );

  const setUserData = (data: UserProfileData) => {
    setAuthData((prev) => ({ ...prev, userData: data }));
  };

  const setToken = (token: string) => {
    setAuthData((prevState) => ({
      ...prevState!,
      token,
    }));
    Cookies.set("token", token, { expires: 7 });
  };

  const handleSignOut = () => {
    setAuthData({ token: "", userData: null });
    Cookies.remove("token");
    void router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ authData, setUserData, setToken, handleSignOut }}
    >
      {!!token && isLoading ? (
        <main className="flex min-h-screen w-full items-center justify-center text-lg text-muted-foreground">
          <Loader className="mr-2 size-4 animate-spin" />
          Loading...
        </main>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
