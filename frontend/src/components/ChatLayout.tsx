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
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
