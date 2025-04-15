
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { mockUsers } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem('civicstorm_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call/validation delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication logic
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && password === 'password') { // Mock password check
      setUser(foundUser);
      localStorage.setItem('civicstorm_user', JSON.stringify(foundUser));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      throw new Error("Invalid credentials");
    }
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call/validation delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      toast({
        title: "Signup Failed",
        description: "Email already in use",
        variant: "destructive"
      });
      setLoading(false);
      throw new Error("Email already in use");
    }
    
    // Create new user (in a real app, this would be an API call)
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      isAdmin: false
    };
    
    // Update local state and storage
    setUser(newUser);
    localStorage.setItem('civicstorm_user', JSON.stringify(newUser));
    
    toast({
      title: "Account Created",
      description: "Your account was created successfully!",
    });
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civicstorm_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
