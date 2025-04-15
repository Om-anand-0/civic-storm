
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Flag, LogIn, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Flag className="h-6 w-6 text-civic-blue" />
            <span className="text-xl font-bold text-civic-blue">CivicStorm</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link to="/" className="text-gray-600 hover:text-civic-blue px-3 py-2 rounded-md text-sm font-medium">
            Home
          </Link>
          <Link to="/report" className="text-gray-600 hover:text-civic-blue px-3 py-2 rounded-md text-sm font-medium">
            Report Issue
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-civic-blue px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" className="text-gray-600 hover:text-civic-blue px-3 py-2 rounded-md text-sm font-medium">
                  Admin
                </Link>
              )}
              <div className="flex items-center space-x-2 ml-4">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user?.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="flex items-center">
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-6">
                <Link to="/" className="text-gray-600 hover:text-civic-blue py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link to="/report" className="text-gray-600 hover:text-civic-blue py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Report Issue
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="text-gray-600 hover:text-civic-blue py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                    {user?.isAdmin && (
                      <Link to="/admin" className="text-gray-600 hover:text-civic-blue py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                        Admin
                      </Link>
                    )}
                    <hr className="my-2" />
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{user?.name}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => { logout(); setIsOpen(false); }} className="flex items-center">
                        <LogOut className="h-4 w-4 mr-1" />
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="default" size="sm" className="flex items-center">
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
