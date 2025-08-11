import { formatDistanceToNow } from "date-fns";

interface ChatMessageProps {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isOwn?: boolean;
}

export function ChatMessage({ username, message, timestamp, isOwn = false }: ChatMessageProps) {
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true });

  return (
    <div className="group flex items-start gap-3 px-4 py-2 hover:bg-muted/30 transition-colors">
      <div className="flex-shrink-0 w-12 text-right">
        <span className="text-terminal-prompt text-sm font-medium">
          {isOwn ? ">" : "$"}
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className={`font-medium text-sm ${
            isOwn ? "text-primary" : "text-terminal-keyword"
          }`}>
            {username}
          </span>
          <span className="text-terminal-comment text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            {timeAgo}
          </span>
        </div>
        
        <div className="text-foreground text-sm leading-relaxed break-words">
          {message}
        </div>
      </div>
    </div>
  );
}