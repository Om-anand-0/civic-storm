
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState<string>("login");
  
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm onSuccess={() => {}} />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignupForm onSuccess={() => setActiveTab("login")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
