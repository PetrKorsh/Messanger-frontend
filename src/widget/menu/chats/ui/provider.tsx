import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { SidebarApp } from "./sidebar";

export const SidebarPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <SidebarApp />
      <main className="flex flex-grow flex-col bg-[#F9F9F9] dark:bg-[#1E1E1E]">
        <div className="flex justify-end md:hidden">
          <SidebarTrigger />
        </div>
        <div className="container pt-28">{children}</div>
      </main>
    </SidebarProvider>
  );
};
