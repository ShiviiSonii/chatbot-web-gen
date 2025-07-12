"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Home, Code, Layout, Save } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";

interface HeaderProps {
  currentPage: "chat" | "history";
  session: Session | null;
}

export default function Header({ currentPage, session }: HeaderProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-6">
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

          {/* User Menu */}
          <div className="flex items-center gap-3">
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
        </div>
      </div>
    </div>
  );
} 