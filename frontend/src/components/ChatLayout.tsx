import { ReactNode } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";

interface ChatLayoutProps {
  children: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <>
      <ChatSidebar />
      <div className="flex flex-col flex-1 max-h-[100vh]">
        <ChatHeader />
        <main className="flex-1 min-h-0">{children}</main>
      </div>
    </>
  );
}
