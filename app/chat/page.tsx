"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { templates, Template } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, LogOut, Home, Loader2, Sparkles, Code, Palette, Zap, PaletteIcon, SparklesIcon, ZapIcon, Download } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showTemplates, setShowTemplates] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingTip, setLoadingTip] = useState(0);
  const [showGenerationView, setShowGenerationView] = useState(false);

  const loadingTips = [
    "🎨 Analyzing your design requirements...",
    "🧠 AI is understanding your vision...",
    "⚡ Generating sophisticated HTML structure...",
    "🎯 Crafting modern, advanced CSS with perfect alignment...",
    "📐 Ensuring proper section widths and spacing (no narrow sections)...",
    "📸 Creating professional placeholder boxes with dimensions...",
    "✨ Adding advanced visual elements and effects...",
    "🔧 Optimizing for mobile with advanced breakpoints...",
    "🚀 Finalizing your sophisticated, modern website...",
  ];

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  // Cleanup intervals on component unmount
  useEffect(() => {
    return () => {
      // This cleanup will run when component unmounts
      // Individual intervals are cleared in the handleSubmit function
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

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
    return null; // Will redirect via useEffect
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowTemplates(false);
    setShowGenerationView(true);
    setLoadingProgress(0);
    setLoadingTip(0);

    // Start progress animation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) return prev; // Stop at 90% until API responds
        return prev + Math.random() * 10;
      });
    }, 3000);

    // Cycle through tips
    const tipInterval = setInterval(() => {
      setLoadingTip((prev) => (prev + 1) % loadingTips.length);
    }, 4000);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [{ role: "user", content: input }],
          templateId: selectedTemplate?.id,
        }),
      });

    if (!res.ok) {
      throw new Error("Failed to fetch response");
    }

    const data = await res.json();
    
    // Complete progress
    setLoadingProgress(100);
    setTimeout(() => {
      setResponse(data.text);
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    }, 500);
    
  } catch (err) {
    console.error("❌ Error:", err);
    console.log("Something went wrong. Please try again.");
    clearInterval(progressInterval);
    clearInterval(tipInterval);
  } finally {
    setTimeout(() => setLoading(false), 500);
  }
};


  // Populate iframe whenever response is available or when switching to preview tab
  useEffect(() => {
    const populateIframe = () => {
      if (response && iframeRef.current && activeTab === "preview") {
        const doc = iframeRef.current.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(response);
          doc.close();
        }
      }
    };

    // Small delay to ensure iframe is properly mounted/visible
    const timer = setTimeout(populateIframe, 100);
    
    return () => clearTimeout(timer);
  }, [response, activeTab]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy code');
    }
  };

  const downloadCode = () => {
    try {
      const blob = new Blob([response], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-website.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download code');
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setInput(template.prompt);
  };

  const clearTemplate = () => {
    setSelectedTemplate(null);
    setInput("");
  };

  const startOver = () => {
    setResponse("");
    setShowTemplates(true);
    setSelectedTemplate(null);
    setInput("");
    setLoadingProgress(0);
    setLoadingTip(0);
    setLoading(false);
    setShowGenerationView(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with User Info and Logout */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </Button>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-2xl">🚀</span>
                <span className="font-medium">Web Code Generator</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {!showGenerationView && (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 text-foreground">Web Code Generator</h1>
              <p className="text-muted-foreground">Generate beautiful HTML/CSS code from your description</p>
            </div>

            {/* Templates Section */}
            {showTemplates && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Quick Start Templates</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTemplates(false)}
              >
                Skip Templates
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 group border-2 hover:border-primary/50"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{template.icon}</span>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm group-hover:text-primary">
                      {template.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {template.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <CardDescription>
                Or describe your own website below for a custom design
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Template Display */}
      {selectedTemplate && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xl mr-2">{selectedTemplate.icon}</span>
                <div>
                  <span className="font-medium text-primary">Selected: {selectedTemplate.name}</span>
                  <CardDescription className="text-sm">
                    {selectedTemplate.description}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearTemplate}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            selectedTemplate
              ? `Customize your ${selectedTemplate.name.toLowerCase()} or leave as-is...`
              : "Describe your website... (e.g., 'Create a modern portfolio with dark theme')"
          }
          className="flex-1 h-12"
        />
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="px-6"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </form>
          </>
        )}

        {/* Generation View - Loading and Results */}
        {showGenerationView && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 text-foreground">Generating Your Website</h1>
              <p className="text-muted-foreground">Please wait while we create your custom website</p>
            </div>

            {loading && (
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="py-12">
                  <div className="text-center space-y-6">
                    {/* Main Loading Animation */}
                    <div className="relative">
                      <div className="text-4xl animate-bounce">🚀</div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto space-y-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${loadingProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(loadingProgress)}% Complete
                      </div>
                    </div>
                    
                    {/* Current Status */}
                    <div className="space-y-2">
                      <div className="text-lg font-medium text-primary animate-pulse">
                        {loadingTips[loadingTip]}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Please wait while we craft your perfect website...
                      </div>
                    </div>
                    
                    {/* Loading Icons */}
                    <div className="flex justify-center space-x-4 pt-4">
                      <div className="p-3 bg-primary/10 rounded-full animate-pulse">
                        <Code className="w-5 h-5 text-primary" />
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full animate-pulse">
                        <PaletteIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full animate-pulse">
                        <SparklesIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full animate-pulse delay-450">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    
                                  {/* Fun Facts */}
              <div className="bg-muted/50 rounded-lg p-4 max-w-lg mx-auto mt-6">
                <div className="text-xs text-muted-foreground mb-1">💡 Enhanced AI System</div>
                <div className="text-sm">
                  Our AI creates sophisticated websites with proper section widths, perfect alignment, generous spacing, and professional layouts - no more cramped sections!
                </div>
              </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {response && (
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value as "preview" | "code");
              // Force iframe population when switching to preview
              if (value === "preview" && response && iframeRef.current) {
                setTimeout(() => {
                  const doc = iframeRef.current?.contentWindow?.document;
                  if (doc) {
                    doc.open();
                    doc.write(response);
                    doc.close();
                  }
                }, 50);
              }
            }}>
              <div className="flex items-center justify-between border-b px-6 py-4">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startOver}
                >
                  Start Over
                </Button>
              </div>

              <TabsContent value="preview" className="m-0">
                <iframe 
                  ref={iframeRef} 
                  className="w-full h-[600px] border-0" 
                  title="Generated Website Preview"
                />
              </TabsContent>

              <TabsContent value="code" className="m-0 relative">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadCode}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant={copySuccess ? "default" : "secondary"}
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    {copySuccess ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
                <pre className="p-4 bg-slate-950 text-green-400 font-mono text-sm overflow-auto h-[600px]">
                  <code>{response}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
                </Card>
      )}
          </div>
        )}
      </div>
    </div>
  );
}
