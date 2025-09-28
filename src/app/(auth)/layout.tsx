import { BackgroundBeams } from "@/shared/components/ui/background-boxes";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      {children}
      <BackgroundBeams />
    </main>
  );
};

export default Layout;
