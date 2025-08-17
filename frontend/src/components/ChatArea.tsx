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

export function ChatArea({
  messages,
  onSendMessage,
  placeholder,
}: ChatAreaProps) {
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
    <div className="flex flex-1 flex-col min-h-0">
      {/* local header pinned */}
      <div className="bg-muted p-2 border-b flex-shrink-0">
        <div className="text-terminal-comment text-xs font-mono">
          user@codechatter:~$ cat messages.log
        </div>
      </div>

      {/* scrollable messages */}
      <div
        className="flex-1 overflow-y-auto min-h-0"
        onScroll={handleScroll}
      >
        <div className="space-y-1">
          {messages.map((m) => (
            <ChatMessage key={m.id} {...m} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* pinned input */}
      <div className="flex-shrink-0">
        <ChatInput onSendMessage={onSendMessage} placeholder={placeholder} />
      </div>
    </div>
  );
}

