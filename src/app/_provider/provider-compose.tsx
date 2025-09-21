import { ComposeChildren } from "@/shared/lib/helpers";
import { AuthProvider } from "@/shared/providers/auth-provider";
import { QueryProvider } from "@/shared/providers/query-provider";
import { ThemeProvider } from "@/shared/providers/theme-providers";
import React from "react";

export const ProviderCompose = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <ComposeChildren>
      <QueryProvider />
      <AuthProvider />
      <ThemeProvider />
      {children}
    </ComposeChildren>
  );
};
