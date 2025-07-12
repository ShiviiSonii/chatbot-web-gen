"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Home, Code, Layout, Save, Menu, X } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { useState } from "react";

interface HeaderProps {
  currentPage: "chat" | "history";
  session: Session | null;
}

export default function Header({ currentPage, session }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Desktop Navigation */}
          <div className="flex items-center gap-6">
            {/* Home link - visible on mobile */}
            <Button variant="ghost" size="sm" asChild className="md:hidden">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
            
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
              <Button 
                variant={currentPage === "chat" ? "secondary" : "ghost"} 
                size="sm" 
                {...(currentPage === "chat" ? {} : { asChild: true })}
              >
                {currentPage === "chat" ? (
                  <span className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Generator
                  </span>
                ) : (
                  <Link href="/chat" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Generator
                  </Link>
                )}
              </Button>
              <Button 
                variant={currentPage === "history" ? "secondary" : "ghost"} 
                size="sm" 
                {...(currentPage === "history" ? {} : { asChild: true })}
              >
                {currentPage === "history" ? (
                  <span className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    My Generations
                  </span>
                ) : (
                  <Link href="/history" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    My Generations
                  </Link>
                )}
              </Button>
            </nav>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium">
                {session?.user?.email?.split('@')[0]}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col gap-2">
              <Button 
                variant={currentPage === "chat" ? "secondary" : "ghost"} 
                className="justify-start"
                {...(currentPage === "chat" ? {} : { asChild: true })}
              >
                {currentPage === "chat" ? (
                  <span className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Generator
                  </span>
                ) : (
                  <Link href="/chat" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Generator
                  </Link>
                )}
              </Button>
              <Button 
                variant={currentPage === "history" ? "secondary" : "ghost"} 
                className="justify-start"
                {...(currentPage === "history" ? {} : { asChild: true })}
              >
                {currentPage === "history" ? (
                  <span className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    My Generations
                  </span>
                ) : (
                  <Link href="/history" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    My Generations
                  </Link>
                )}
              </Button>
              
              {/* Mobile User Section */}
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{session?.user?.email}</span>
                </div>
                <Button
                  variant="ghost"
                  className="justify-start w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 