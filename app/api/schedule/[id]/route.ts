import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const data = await req.json();
    
    const { id } = params;

    const task = await prisma.task.update({
      where: {
        id,
        userId: userId
      },
      data: {
        ...data
      }
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("[UPDATE_TASK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}