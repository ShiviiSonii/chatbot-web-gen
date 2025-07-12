import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the generation exists and belongs to the user
    const generation = await prisma.generation.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      );
    }

    // Delete the generation
    await prisma.generation.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Generation deleted successfully" });
  } catch (error) {
    console.error("Error deleting generation:", error);
    return NextResponse.json(
      { error: "Failed to delete generation" },
      { status: 500 }
    );
  }
}
