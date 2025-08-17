import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ChatLayout } from "@/components/ChatLayout";
import MainChat from "./pages/MainChat";
import PrivateChat from "./pages/PrivateChat";
import ChannelChat from "./pages/ChannelChat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Auth routes without sidebar */}
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to={"/"} />}
          />

          {/* Chat routes with sidebar layout */}
          <Route
            path="/*"
            element={
              authUser ? (
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-background">
                    <ChatLayout>
                      <Routes>
                        <Route path="/" element={<MainChat />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/:channelName" element={<ChannelChat />} />
                        <Route path="/chat/:userId" element={<PrivateChat />} />
                      </Routes>
                    </ChatLayout>
                  </div>
                </SidebarProvider>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
