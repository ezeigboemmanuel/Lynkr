import { useState } from "react";
import { ChatArea } from "@/components/ChatArea";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isOwn?: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    username: "alice",
    message: "Hey everyone! Just deployed the new feature branch 🚀",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: "2",
    username: "bob",
    message: "Nice work! The performance improvements are noticeable",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: "3",
    username: "charlie",
    message: "Anyone having issues with the new TypeScript strict mode?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "4",
    username: "diana",
    message: "I can help with that! The key is to enable it gradually",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
  },
  {
    id: "5",
    username: "user",
    message: "Thanks for the help team! Really appreciate it",
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    isOwn: true,
  },
];

export default function MainChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);

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

  return (
    <div className="flex h-full min-h-0 max-h-[90vh] overflow-y-auto">
      <ChatArea
        messages={messages}
        onSendMessage={handleSendMessage}
        placeholder="Type your message to the main channel..."
      />
    </div>
  );
}
