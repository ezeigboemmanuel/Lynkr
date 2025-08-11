import { useState } from "react";
import { useParams } from "react-router";
import { ChatArea } from "@/components/ChatArea";
import { ChatHeader } from "@/components/ChatHeader";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isOwn?: boolean;
}

const mockPrivateMessages: Record<string, Message[]> = {
  alice: [
    {
      id: "1",
      username: "alice",
      message: "Hey! Can you review my pull request when you get a chance?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "2",
      username: "user",
      message: "Sure! I'll take a look this afternoon",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      isOwn: true,
    },
    {
      id: "3",
      username: "alice",
      message: "Thanks! It's mainly refactoring the authentication logic",
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
    },
  ],
  bob: [
    {
      id: "1",
      username: "bob",
      message: "Did you see the new React docs? They're really well done",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      id: "2",
      username: "user",
      message: "Yes! The new examples are super helpful",
      timestamp: new Date(Date.now() - 40 * 60 * 1000),
      isOwn: true,
    },
  ],
  charlie: [
    {
      id: "1",
      username: "charlie",
      message: "Quick question about the database schema",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
    },
  ],
};

export default function PrivateChat() {
  const { userId } = useParams();
  const [messages, setMessages] = useState<Message[]>(
    mockPrivateMessages[userId || ""] || []
  );

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      username: "user",
      message,
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  if (!userId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <p className="text-terminal-comment">// No user selected</p>
          <p className="text-sm mt-2">
            Select a user from the sidebar to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      <ChatHeader />
      <ChatArea
        messages={messages}
        onSendMessage={handleSendMessage}
        placeholder={`Send a private message to ${userId}...`}
      />
    </div>
  );
}
