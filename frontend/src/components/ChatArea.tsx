import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isOwn?: boolean;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export function ChatArea({ messages, onSendMessage, placeholder }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const scrollToBottom = () => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShouldAutoScroll(isNearBottom);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Terminal Header */}
      <div className="bg-muted p-2 border-b border-border">
        <div className="text-terminal-comment text-xs font-mono">
          user@codechatter:~$ cat messages.log
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto" 
        onScroll={handleScroll}
      >
        <div className="space-y-1">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              username={message.username}
              message={message.message}
              timestamp={message.timestamp}
              isOwn={message.isOwn}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput 
        onSendMessage={onSendMessage}
        placeholder={placeholder}
      />
    </div>
  );
}