import { useState } from "react";
import { useParams } from "react-router";
import { ChatArea } from "@/components/ChatArea";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isOwn?: boolean;
}

const mockChannelMessages: Record<string, Message[]> = {
  random: [
    {
      id: "1",
      username: "alice",
      message: "Anyone tried the new VS Code extension for GitHub Copilot?",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: "2",
      username: "bob",
      message: "Yes! It's incredible for boilerplate code",
      timestamp: new Date(Date.now() - 55 * 60 * 1000),
    },
    {
      id: "3",
      username: "diana",
      message:
        "I'm still getting used to it, but the suggestions are getting better",
      timestamp: new Date(Date.now() - 50 * 60 * 1000),
    },
  ],
  help: [
    {
      id: "1",
      username: "charlie",
      message: "How do I debug React hooks effectively?",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
    },
    {
      id: "2",
      username: "alice",
      message:
        "React DevTools is your best friend! Also try adding console.logs strategically",
      timestamp: new Date(Date.now() - 85 * 60 * 1000),
    },
    {
      id: "3",
      username: "bob",
      message: "Don't forget about the useDebugValue hook for custom hooks",
      timestamp: new Date(Date.now() - 80 * 60 * 1000),
    },
  ],
};

export default function ChannelChat() {
  const { channelName } = useParams();
  const [messages, setMessages] = useState<Message[]>(
    mockChannelMessages[channelName || ""] || []
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

  if (!channelName) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <p className="text-terminal-comment">// No channel selected</p>
          <p className="text-sm mt-2">Select a channel from the sidebar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      <ChatArea
        messages={messages}
        onSendMessage={handleSendMessage}
        placeholder={`Type your message to #${channelName}...`}
      />
    </div>
  );
}
