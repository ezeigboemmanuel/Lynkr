import { useState, type KeyboardEvent } from "react";
import { Terminal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, placeholder = "Type a message..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-terminal-border bg-terminal-bg p-4 font-mono">
      <div className="flex items-center gap-2 text-terminal-text">
        <div className="flex items-center gap-1 text-terminal-prompt text-sm flex-shrink-0">
          <Terminal className="h-4 w-4 text-terminal-keyword" />
          <span className="text-terminal-comment">user@codechatter</span>
          <span className="text-terminal-operator">:</span>
          <span className="text-terminal-string">~</span>
          <span className="text-terminal-operator">$</span>
        </div>
        
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-terminal-text placeholder:text-terminal-comment font-mono text-sm caret-terminal-keyword terminal-cursor"
          autoFocus
        />
      </div>
    </div>
  );
}