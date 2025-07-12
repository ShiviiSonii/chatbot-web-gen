"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, X, Download, Copy, CheckCircle } from "lucide-react";

interface Generation {
  id: string;
  title: string;
  prompt: string;
  htmlCode: string;
  templateId?: string;
  createdAt: string;
  updatedAt: string;
}

interface GenerationModalProps {
  generation: Generation;
  trigger?: React.ReactNode;
}

export default function GenerationModal({ generation, trigger }: GenerationModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Populate iframe when modal opens or tab changes to preview
  useEffect(() => {
    const populateIframe = () => {
      if (isOpen && generation && iframeRef.current && activeTab === "preview") {
        const doc = iframeRef.current.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(generation.htmlCode);
          doc.close();
        }
      }
    };

    // Add a small delay to ensure iframe is ready
    if (isOpen && activeTab === "preview") {
      const timer = setTimeout(populateIframe, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab, generation]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generation.htmlCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const downloadCode = () => {
    try {
      const blob = new Blob([generation.htmlCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download code:', error);
    }
  };

  const defaultTrigger = (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2"
      onClick={() => setIsOpen(true)}
    >
      <Eye className="h-4 w-4" />
      View
    </Button>
  );

  const modalContent = isOpen ? (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="w-[80vw] h-[95vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 truncate flex-1 mr-4">
            {generation.title}
          </h2>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
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
              variant={copySuccess ? "default" : "outline"}
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              {copySuccess ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content with shadcn Tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              setActiveTab(value as "preview" | "code");
              // Force iframe refresh when switching to preview
              if (value === "preview" && generation) {
                setTimeout(() => {
                  const doc = iframeRef.current?.contentWindow?.document;
                  if (doc) {
                    doc.open();
                    doc.write(generation.htmlCode);
                    doc.close();
                  }
                }, 50);
              }
            }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="grid grid-cols-2 rounded-none mr-auto">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-0 flex-1 overflow-hidden">
              <iframe 
                ref={iframeRef} 
                className="w-full h-full border-0" 
                title="Generated Website Preview"
              />
            </TabsContent>
            <TabsContent value="code" className="mt-0 flex-1 overflow-hidden">
              <div className="h-full w-full overflow-auto">
                <pre className="p-4 bg-gray-900 text-green-400 font-mono text-xs whitespace-pre-wrap break-words min-h-full">
                  <code>{generation.htmlCode}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger || defaultTrigger}
      </div>
      {typeof window !== 'undefined' && modalContent && createPortal(modalContent, document.body)}
    </>
  );
} 