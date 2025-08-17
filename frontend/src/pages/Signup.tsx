import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isSigningUp, signup } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    await signup({ username, email, password });
  };

  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-terminal-border rounded-md p-8">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-terminal-border">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="ml-2 text-terminal-comment text-sm font-mono">
              ~/signup
            </span>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary font-mono">
                $ ./create-user.sh
              </h1>
              <p className="text-terminal-comment mt-2 font-mono text-sm">
                # Initialize new developer account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-terminal-text font-mono"
                >
                  --username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                  placeholder="dev_username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-terminal-text font-mono">
                  --email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                  placeholder="dev@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-terminal-text font-mono"
                >
                  --password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-terminal-text font-mono"
                >
                  --confirm-password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                disabled={isSigningUp}
              >
                {isSigningUp ? "$ creating account..." : "$ execute signup"}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-terminal-border">
              <p className="text-terminal-comment font-mono text-sm">
                # Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 underline"
                >
                  ./login.sh
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-4 text-center">
          <p className="text-terminal-comment font-mono text-xs">
            CodeChatter v2.1.0 | Account Registration System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
