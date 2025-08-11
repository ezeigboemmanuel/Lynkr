import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "dev_user",
    email: "dev@company.com",
    bio: "Full-stack developer passionate about clean code and terminal interfaces.",
    location: "San Francisco, CA",
    github: "github.com/devuser",
    website: "devuser.dev"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend/Supabase
  };

  const stats = [
    { label: "Messages Sent", value: "1,337", color: "text-primary" },
    { label: "Channels Joined", value: "42", color: "text-accent" },
    { label: "Days Active", value: "156", color: "text-destructive" },
    { label: "Code Snippets", value: "89", color: "text-terminal-string" }
  ];

  return (
    <div className="min-h-full bg-terminal-bg p-6">

      <div className="max-w-4xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-terminal-border rounded-md p-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-mono text-lg">
                    DU
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-xl font-bold text-primary font-mono mb-1">
                  @{profile.username}
                </h1>
                <p className="text-terminal-comment font-mono text-sm mb-4">
                  {profile.email}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-terminal-keyword font-mono">location:</span>
                    <span className="text-terminal-text font-mono">{profile.location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-terminal-keyword font-mono">github:</span>
                    <a href={`https://${profile.github}`} className="text-primary hover:text-primary/80 font-mono underline">
                      {profile.github}
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-terminal-keyword font-mono">website:</span>
                    <a href={`https://${profile.website}`} className="text-primary hover:text-primary/80 font-mono underline">
                      {profile.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-card border border-terminal-border rounded-md p-6 mt-6">
              <h3 className="text-lg font-bold text-primary font-mono mb-4">
                $ ./stats.sh
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-terminal-comment font-mono text-xs">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-terminal-border rounded-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary font-mono">
                  $ cat profile.json
                </h2>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  variant="outline"
                  className="font-mono"
                >
                  {isEditing ? "$ save" : "$ edit"}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" className="text-terminal-text font-mono">
                      username:
                    </Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile({...profile, username: e.target.value})}
                      className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-terminal-text font-mono">
                      email:
                    </Label>
                    <Input
                      id="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-terminal-text font-mono">
                    bio:
                  </Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="bg-terminal-input border-terminal-border text-terminal-text font-mono min-h-[100px]"
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-terminal-text font-mono">
                      location:
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="github" className="text-terminal-text font-mono">
                      github:
                    </Label>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) => setProfile({...profile, github: e.target.value})}
                      className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website" className="text-terminal-text font-mono">
                    website:
                  </Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    className="bg-terminal-input border-terminal-border text-terminal-text font-mono"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Terminal Output Style */}
              <div className="mt-8 p-4 bg-terminal-bg border border-terminal-border rounded font-mono text-sm">
                <div className="text-terminal-comment mb-2"># Profile JSON Output:</div>
                <div className="text-terminal-text">
                  {`{`}<br />
                  &nbsp;&nbsp;<span className="text-terminal-string">"username"</span>: <span className="text-terminal-string">"{profile.username}"</span>,<br />
                  &nbsp;&nbsp;<span className="text-terminal-string">"email"</span>: <span className="text-terminal-string">"{profile.email}"</span>,<br />
                  &nbsp;&nbsp;<span className="text-terminal-string">"location"</span>: <span className="text-terminal-string">"{profile.location}"</span>,<br />
                  &nbsp;&nbsp;<span className="text-terminal-string">"status"</span>: <span className="text-primary">"online"</span><br />
                  {`}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;