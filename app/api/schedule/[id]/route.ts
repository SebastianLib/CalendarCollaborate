import db from "@/db";
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
    const {type, data} = await req.json();
    
    const { id } = params;
    if(type==="updatePeople"){
      await db.peopleTasks.deleteMany({
        where:{
          taskId: id
        }
      })

      const task = await db.task.update({
        where: {
          id,
          userId: userId
        },
        data: {
          peopleTasks:{
            create: data,
          }
        }
      });
      return NextResponse.json(task);
    }else{
      const task = await db.task.update({
        where: {
          id,
          userId: userId
        },
        data: {
          ...data
        }
      });
      return NextResponse.json(task);
    }
  } catch (error) {
    console.log("[UPDATE_TASK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    
    const { id } = params;

    const task = await db.task.delete({
      where: {
        id,
        userId
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("[DELETE_TASK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}