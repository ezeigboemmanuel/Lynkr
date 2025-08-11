import { User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function ChatHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Simulate logout
    navigate("/login");
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "$ ./main.sh";
    if (path === "/profile") return "$ ./profile.sh";
    if (path.startsWith("/chat/")) return `$ ./dm.sh --user=${path.split("/")[2]}`;
    if (path.startsWith("/")) return `$ ./channel.sh --name=${path.slice(1)}`;
    return "$ ./unknown.sh";
  };

  return (
    <header className="h-12 bg-card border-b border-terminal-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-terminal-text hover:text-primary" />
        
        {/* Terminal window controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <div className="w-3 h-3 rounded-full bg-primary"></div>
        </div>
        
        <span className="text-terminal-comment text-sm font-mono">
          {getPageTitle()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-terminal-text hover:text-primary hover:bg-terminal-input"
            >
              <User className="h-4 w-4" />
              <span className="ml-2 font-mono">user@codechatter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-card border-terminal-border text-terminal-text font-mono"
          >
            <DropdownMenuItem asChild>
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-terminal-text hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-terminal-border" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="flex items-center gap-2 text-destructive hover:text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}