"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const destination = session ? "/chat" : "/login";
  const buttonText = session ? "Generate Code" : "Get Started - Login";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Modern Header within Banner */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative">
          {/* Navigation Header */}
          <nav className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-800">Web Code Generator</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                  How It Works
                </Link>
                <Link href="#examples" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Examples
                </Link>
                <Button asChild>
                  <Link href={destination}>
                    {session ? "Generate Code" : "Get Started"}
                  </Link>
                </Button>
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button variant="outline" asChild>
                  <Link href={destination}>
                    {session ? "Generate" : "Login"}
                  </Link>
                </Button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="text-6xl mb-6">🚀</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight">
                  Web Code Generator
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Transform your ideas into beautiful, functional websites with AI. 
                  Simply describe what you want, and watch as we generate clean HTML and CSS code instantly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="text-lg px-8 py-4">
                    <Link href={destination}>
                      {buttonText}
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="text-lg px-8 py-4">
                    <Link href="#how-it-works">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Features Section */}
          <div id="features" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Generator?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Generate complete web pages in seconds. No more starting from scratch.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                <p className="text-gray-600">
                  Powered by Google&apos;s Gemini AI to understand your requirements and create stunning designs.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-3">Beautiful Design</h3>
                <p className="text-gray-600">
                  Get modern, responsive designs that look great on all devices.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div id="how-it-works" className="mb-20">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Describe Your Vision</h3>
                  <p className="text-gray-600">
                    Tell us what kind of website you want. Be as detailed or as simple as you like.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">AI Generates Code</h3>
                  <p className="text-gray-600">
                    Our AI analyzes your description and creates clean, professional HTML and CSS code.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">Preview & Copy</h3>
                  <p className="text-gray-600">
                    See your website live, view the code, and copy it to use anywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Examples Section */}
          <div id="examples" className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">Try These Examples</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="text-gray-700 italic leading-relaxed">
                  &quot;Create a modern portfolio website with a dark theme and gradient background&quot;
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="text-gray-700 italic leading-relaxed">
                  &quot;Build a landing page for a tech startup with a hero section and feature cards&quot;
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="text-gray-700 italic leading-relaxed">
                  &quot;Design a restaurant website with a menu section and contact form&quot;
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <p className="text-gray-700 italic leading-relaxed">
                  &quot;Create a blog layout with a sidebar and article preview cards&quot;
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers who are already using AI to speed up their workflow.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
              <Link href={destination}>
                {session ? "Generate Code Now" : "Get Started Now"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
