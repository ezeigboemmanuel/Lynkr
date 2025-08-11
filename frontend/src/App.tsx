import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BrowserRouter, Routes, Route } from "react-router";
import { ChatLayout } from "@/components/ChatLayout";
import MainChat from "./pages/MainChat";
import PrivateChat from "./pages/PrivateChat";
import ChannelChat from "./pages/ChannelChat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        {/* Auth routes without sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Chat routes with sidebar layout */}
        <Route
          path="/*"
          element={
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
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
