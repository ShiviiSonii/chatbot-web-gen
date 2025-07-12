"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            Web Code Generator
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/">
                  Home
                </Link>
              </Button>
              {isAuthenticated && (
                <Button variant="ghost" asChild>
                  <Link href="/chat">
                    Generate Code
                  </Link>
                </Button>
              )}
            </div>
            
            {/* Auth Section */}
            <div className="flex items-center gap-2 ml-4 border-l pl-4">
              {isLoading ? (
                <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
              ) : isAuthenticated ? (
                /* Authenticated User */
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {session?.user?.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              ) : (
                /* Unauthenticated User */
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">
                      Login
                    </Link>
                  </Button>
                  
                  <Button size="sm" asChild>
                    <Link href="/register">
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
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
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </Button>
              {isAuthenticated && (
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
                    Generate Code
                  </Link>
                </Button>
              )}
              
              {/* Mobile Auth Section */}
              <div className="border-t pt-2 mt-2">
                {isLoading ? (
                  <div className="h-8 bg-muted animate-pulse rounded"></div>
                ) : isAuthenticated ? (
                  /* Authenticated Mobile */
                  <div className="space-y-2">
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
                ) : (
                  /* Unauthenticated Mobile */
                  <>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="justify-start mt-2 w-full">
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 