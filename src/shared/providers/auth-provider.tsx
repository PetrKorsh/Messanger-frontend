"use client";

import { getSession } from "@/enteties/get-session/get-session";
import { queryOptions, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";

export interface AuthInterface {
  auth: boolean;
  user: User | null;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  patronymic: string;
  description: string;
  avatar: string;
  role: string;
  email: string;
}

interface AuthContextInterface {
  session: AuthInterface;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used within AuthProvider");
  }
  return context;
};

function sessionOption() {
  return queryOptions({
    queryKey: ["session"],
    queryFn: async () => await getSession(),
    initialData: {
      user: null,
      auth: false,
    },
  });
}

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const query = useQuery(sessionOption());

  return (
    <AuthContext.Provider value={{ session: query.data }}>
      {children}
    </AuthContext.Provider>
  );
};
