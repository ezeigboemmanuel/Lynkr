import { useState } from "react";
import { Hash, User, Circle, Search } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mockUsers = [
  { id: "alice", name: "alice", status: "online" },
  { id: "bob", name: "bob", status: "online" },
  { id: "charlie", name: "charlie", status: "offline" },
  { id: "diana", name: "diana", status: "online" },
  { id: "eve", name: "eve", status: "away" },
];

export function ChatSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const [userFilter, setUserFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-primary font-medium border-l-2 border-primary"
      : "hover:bg-sidebar-accent/50 transition-colors";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-primary";
      case "away":
        return "text-accent";
      case "offline":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    return (
      <Circle className={`h-2 w-2 fill-current ${getStatusColor(status)}`} />
    );
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesName = user.name
      .toLowerCase()
      .includes(userFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesName && matchesStatus;
  });

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* General Chat Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-terminal-comment text-xs uppercase tracking-wide">
            // channels
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" end className={getNavCls}>
                    <Hash className="h-4 w-4 text-terminal-keyword" />
                    {!collapsed && (
                      <span className="text-terminal-string">main</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/random" className={getNavCls}>
                    <Hash className="h-4 w-4 text-terminal-keyword" />
                    {!collapsed && (
                      <span className="text-terminal-string">random</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/help" className={getNavCls}>
                    <Hash className="h-4 w-4 text-terminal-keyword" />
                    {!collapsed && (
                      <span className="text-terminal-string">help</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Users Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-terminal-comment text-xs uppercase tracking-wide flex items-center justify-between">
            <span>
              // users (
              {filteredUsers.filter((u) => u.status === "online").length}{" "}
              online)
            </span>
          </SidebarGroupLabel>

          {!collapsed && (
            <div className="px-2 pb-2 space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-3 w-3 text-terminal-comment" />
                <Input
                  placeholder="filter users..."
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="pl-7 h-8 text-xs bg-terminal-input border-terminal-border text-terminal-text placeholder:text-terminal-comment font-mono"
                />
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={statusFilter === "all" ? "secondary" : "ghost"}
                  onClick={() => setStatusFilter("all")}
                  className="h-6 text-xs px-2 font-mono"
                >
                  all
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === "online" ? "secondary" : "ghost"}
                  onClick={() => setStatusFilter("online")}
                  className="h-6 text-xs px-2 font-mono"
                >
                  online
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === "offline" ? "secondary" : "ghost"}
                  onClick={() => setStatusFilter("offline")}
                  className="h-6 text-xs px-2 font-mono"
                >
                  offline
                </Button>
              </div>
            </div>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {filteredUsers.map((user) => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton asChild>
                    <NavLink to={`/chat/${user.id}`} className={getNavCls}>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user.status)}
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {!collapsed && (
                        <span className={getStatusColor(user.status)}>
                          {user.name}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
