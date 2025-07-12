import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, prompt, htmlCode, templateId } = body;

    if (!title || !prompt || !htmlCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || "",
        },
      });
    }

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

    return NextResponse.json({ generation }, { status: 201 });
  } catch (error) {
    console.error("Error saving generation:", error);
    return NextResponse.json(
      { error: "Failed to save generation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ generations: [] });
    }

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

    return NextResponse.json({ generations });
  } catch (error) {
    console.error("Error fetching generations:", error);
    return NextResponse.json(
      { error: "Failed to fetch generations" },
      { status: 500 }
    );
  }
}
