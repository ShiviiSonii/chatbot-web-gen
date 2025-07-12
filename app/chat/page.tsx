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
import { Loader2, Code, Zap, PaletteIcon, SparklesIcon, Download, Save, CheckCircle } from "lucide-react";
import Header from "@/components/Header";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingTip, setLoadingTip] = useState(0);
  const [showGenerationView, setShowGenerationView] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

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

  // Cleanup intervals on component unmount
  useEffect(() => {
    return () => {
      // This cleanup will run when component unmounts
      // Individual intervals are cleared in the handleSubmit function
    };
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
    
      } catch (error) {
      console.error("❌ Error:", error);
      console.log("Something went wrong. Please try again.");
      clearInterval(progressInterval);
      clearInterval(tipInterval);
    } finally {
    setTimeout(() => setLoading(false), 500);
  }
};


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
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
    } catch (error) {
      console.error('Failed to download code:', error);
    }
  };

  const saveGeneration = async () => {
    if (!response || !input) return;
    
    setSaving(true);
    
    try {
      const title = input.length > 50 ? input.substring(0, 50) + '...' : input;
      
      const res = await fetch('/api/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          prompt: input,
          htmlCode: response,
          templateId: selectedTemplate?.id,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save generation');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save generation:', error);
      // Could add error state here if needed
    } finally {
      setSaving(false);
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
    setSelectedTemplate(null);
    setInput("");
    setLoadingProgress(0);
    setLoadingTip(0);
    setLoading(false);
    setShowGenerationView(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="chat" session={session} />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {!showGenerationView && (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 text-foreground">Web Code Generator</h1>
              <p className="text-muted-foreground">Generate beautiful HTML/CSS code from your description</p>
            </div>

            {/* Input Form - Now positioned above templates */}
            <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-2">
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
                  </div>
                </form>

            {/* Templates Section */}
            <Card className="border-2 border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg">
              <CardHeader>
                <div>
                  <CardTitle className="text-xl text-slate-800">Quick Start Templates</CardTitle>
                  <CardDescription className="text-slate-600">Choose a template to get started quickly, or describe your own website above</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all duration-300 group border-2 transform hover:scale-105 ${
                        selectedTemplate?.id === template.id
                          ? 'border-gray-500 ring-2 ring-gray-500/30 shadow-lg'
                          : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50/70 hover:shadow-xl hover:-translate-y-1'
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2 group-hover:scale-110 transition-transform duration-300">{template.icon}</span>
                          <Badge variant="secondary" className="text-xs group-hover:bg-gray-100 group-hover:text-gray-700 transition-colors duration-300">
                            {template.category}
                          </Badge>
                        </div>
                        <CardTitle className={`text-sm ${
                          selectedTemplate?.id === template.id
                            ? 'text-gray-700 font-semibold'
                            : 'group-hover:text-gray-600'
                        }`}>
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
              </CardContent>
            </Card>
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
                    onClick={saveGeneration}
                    disabled={saving}
                    className="flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : saveSuccess ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
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
