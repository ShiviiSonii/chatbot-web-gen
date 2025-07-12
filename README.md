# 🚀 Web Code Generator - AI-Powered HTML & CSS Generator

A sophisticated chatbot application that generates beautiful, responsive HTML and CSS code using AI, complete with live preview functionality. Built for rapid MVP creation and professional landing page development.

## 🎯 Project Overview

This application is a full-stack web development tool that empowers users to create stunning websites through natural language prompts. It combines the power of AI with modern web technologies to deliver professional-grade HTML and CSS code in seconds.

### ✨ Key Features

- **🤖 AI-Powered Generation**: Uses Google's Gemini AI to create sophisticated HTML/CSS code
- **👁️ Live Preview**: Real-time preview of generated code within the chat interface
- **📱 Responsive Design**: All generated code is mobile-first and fully responsive
- **🔧 Template System**: Pre-built templates for common website types (Portfolio, Startup, Restaurant, etc.)
- **💾 Generation History**: Save and manage your created websites
- **🔐 Secure Authentication**: Multi-provider authentication (Google, GitHub, Email/Password)
- **⬇️ Export Options**: Download generated HTML files or copy code to clipboard
- **🎨 Modern UI**: Beautiful, professional interface built with Tailwind CSS and ShadcnUI

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadcnUI with Radix UI primitives
- **Icons**: Lucide React

### Backend
- **API Routes**: Next.js API Routes
- **Authentication**: NextAuth.js v4
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **AI Provider**: Google Gemini API (direct integration)

### Infrastructure
- **Hosting**: Vercel
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Auth

## 🚀 Live Demo

**Deployed URL**: https://chatbot-web-gen.vercel.app/

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Supabase recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/ShiviiSonii/chatbot-web-gen.git
cd chatbot-web-gen
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# AI Provider
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🎮 Usage Guide

### 1. Authentication
- Sign up/login using Google, GitHub, or email/password
- Session management handled by NextAuth.js

### 2. Generate Websites
- **Custom Prompts**: Describe your desired website in natural language
- **Template Selection**: Choose from pre-built templates and customize
- **AI Processing**: Watch the sophisticated AI generation process with progress indicators

### 3. Preview & Export
- **Live Preview**: See your website rendered in real-time
- **Code View**: Inspect the generated HTML/CSS code
- **Export Options**: Download as HTML file or copy to clipboard

### 4. Manage Generations
- **History**: View all your saved generations
- **Delete**: Remove unwanted generations
- **Reuse**: Copy or download code from previous generations

## 🏗️ Project Structure

```
chatbot-web-gen/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   ├── chat/          # AI chat endpoint
│   │   └── generations/   # Generation CRUD operations
│   ├── chat/              # Main chat interface
│   ├── history/           # Generation history
│   ├── login/             # Authentication pages
│   └── register/          
├── components/            # React components
│   ├── ui/               # ShadcnUI components
│   ├── Header.tsx        # Navigation header
│   ├── GenerationModal.tsx
│   └── Providers.tsx     # Context providers
├── lib/                  # Utility functions
│   ├── prisma.ts         # Database client
│   ├── supabase.js       # Supabase client
│   ├── templates.ts      # Template definitions
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema
└── types/                # TypeScript definitions
```

## 🤖 AI Integration Details

### Why I Chose Direct Integration Over Vercel AI SDK

**Performance Considerations**: I decided not to use Vercel's AI SDK due to performance concerns and opted for direct integration with Google's Gemini API. This approach provides:

- **Faster Response Times**: Direct API calls reduce middleware overhead
- **Better Error Handling**: More granular control over API responses
- **Customizable Processing**: Full control over prompt engineering and response formatting

### System Prompt Optimization

Our AI system uses sophisticated prompt engineering to generate high-quality code:

- **Template-Specific Prompts**: Customized prompts for different website types
- **Design Guidelines**: Enforced modern design principles and best practices
- **Responsive Requirements**: Automatic mobile-first responsive design
- **Code Quality**: Emphasis on clean, semantic HTML and efficient CSS

## 📋 Features Deep Dive

### 🎨 Template System
- **8 Professional Templates**: Portfolio, Startup, Restaurant, E-commerce, etc.
- **Customizable Prompts**: Modify template prompts for specific needs
- **Category Organization**: Templates organized by business type
- **Visual Previews**: Icon and description for each template

### 🔐 Authentication System
- **Multi-Provider Support**: Google, GitHub, Email/Password
- **Session Management**: JWT-based sessions with NextAuth.js
- **Protected Routes**: Secure API endpoints and pages
- **User Profiles**: Basic user information and preferences

### 💾 Generation Management
- **Persistent Storage**: All generations saved to PostgreSQL
- **User Association**: Generations linked to authenticated users
- **CRUD Operations**: Create, read, delete generations
- **Search & Filter**: Easy navigation through generation history

### 🎯 Code Generation Features
- **Professional Design**: Modern, clean layouts with proper typography
- **Responsive Layout**: Mobile-first design with breakpoints
- **Image Placeholders**: Elegant placeholder boxes with dimensions
- **Advanced CSS**: Grid, Flexbox, custom properties, animations
- **SEO Optimization**: Semantic HTML structure and meta tags

## 🔧 Technical Decisions

### Database Choice: Supabase + Prisma
- **PostgreSQL**: Robust relational database for complex queries
- **Supabase**: Managed hosting with built-in authentication
- **Prisma**: Type-safe database access with excellent TypeScript support

### UI Framework: ShadcnUI + Tailwind CSS
- **Component Library**: Pre-built, customizable components
- **Styling**: Utility-first CSS with Tailwind v4
- **Accessibility**: ARIA-compliant components from Radix UI
- **Dark Mode**: Built-in support for theme switching

### AI Provider: Google Gemini
- **Cost Effective**: Competitive pricing for high-quality generation
- **Performance**: Fast response times and reliable uptime
- **Capabilities**: Excellent code generation and understanding
- **Integration**: Simple REST API integration

---

**Made with ❤️ by Shivi Soni** 