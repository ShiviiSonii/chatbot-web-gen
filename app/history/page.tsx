"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, Layout } from "lucide-react";
import Link from "next/link";
import GenerationModal from "@/components/GenerationModal";
import Header from "@/components/Header";

interface Generation {
  id: string;
  title: string;
  prompt: string;
  htmlCode: string;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch generations
  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        const res = await fetch('/api/generations');
        if (res.ok) {
          const data = await res.json();
          setGenerations(data.generations || []);
        }
      } catch (error) {
        console.error('Failed to fetch generations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchGenerations();
    }
  }, [session]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session) {
    router.push("/login");
    return null;
  }

  const deleteGeneration = async (id: string) => {
    try {
      const res = await fetch(`/api/generations/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setGenerations(prev => prev.filter(gen => gen.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete generation:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="history" session={session} />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-foreground">My Generations</h1>
          <p className="text-muted-foreground">View and manage your saved website generations</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your generations...</p>
            </div>
          </div>
        ) : generations.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No generations yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start creating some amazing websites to see them here!
                </p>
                <Button asChild>
                  <Link href="/chat">Create Your First Website</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generations.map((generation) => (
              <Card key={generation.id} className="group hover:shadow-md transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 line-clamp-2">
                        {generation.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(generation.createdAt)}
                      </div>
                    </div>
                    {generation.templateId && (
                      <Badge variant="secondary" className="text-xs">
                        <Layout className="h-3 w-3 mr-1" />
                        Template
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm line-clamp-3 mb-4">
                    {generation.prompt}
                  </CardDescription>
                  <div className="flex gap-2">
                    <GenerationModal generation={generation} />
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteGeneration(generation.id)}
                      className="flex items-center gap-2 text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 