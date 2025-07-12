import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Starting save generation request...");

    const session = await getServerSession();
    console.log("📝 Session check:", session ? "✅ Valid" : "❌ Invalid");

    if (!session || !session.user?.email) {
      console.log("❌ Unauthorized - no session or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("📋 Request body fields:", Object.keys(body));

    const { title, prompt, htmlCode, templateId } = body;

    if (!title || !prompt || !htmlCode) {
      console.log("❌ Missing required fields:", {
        title: !!title,
        prompt: !!prompt,
        htmlCode: !!htmlCode,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("🔍 Looking for user:", session.user.email);

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log("👤 Creating new user for:", session.user.email);
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || "",
        },
      });
    } else {
      console.log("👤 Found existing user:", user.id);
    }

    console.log("💾 Creating generation...");

    // Create generation
    const generation = await prisma.generation.create({
      data: {
        title,
        prompt,
        htmlCode,
        templateId,
        userId: user.id,
      },
    });

    console.log("✅ Generation created successfully:", generation.id);
    return NextResponse.json({ generation }, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving generation:", error);

    // Log more detailed error information
    if (error instanceof Error) {
      console.error("📋 Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      {
        error: "Failed to save generation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("🔍 Starting get generations request...");

    const session = await getServerSession();

    if (!session || !session.user?.email) {
      console.log("❌ Unauthorized - no session or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.log("👤 No user found, returning empty generations");
      return NextResponse.json({ generations: [] });
    }

    console.log("📋 Fetching generations for user:", user.id);

    const generations = await prisma.generation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        prompt: true,
        htmlCode: true,
        templateId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log("✅ Found", generations.length, "generations");
    return NextResponse.json({ generations });
  } catch (error) {
    console.error("❌ Error fetching generations:", error);

    if (error instanceof Error) {
      console.error("📋 Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      {
        error: "Failed to fetch generations",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
