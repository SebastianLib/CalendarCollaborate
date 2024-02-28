import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
){
    try {
        const {userId} = auth();
        const data = await req.json();

        if(!userId){
            return new NextResponse("unauthorized", {status: 401})
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId: userId,
                day: data.day,
                month: data.month,
                year: data.year,
            }
        })
        const simultaneousTasks = tasks.filter(task => 
            data.totalStarting >= task.totalStarting && data.totalStarting <= task.totalEnding
            || data.totalEnding >= task.totalStarting && data.totalEnding <= task.totalEnding).length;
        

        const task = await prisma.task.create({
            data: {
                userId: userId,
                position: simultaneousTasks,
                ...data
            }
        })
        

        return NextResponse.json(task)
    } catch (error) {
        console.log("[CREATE_TASK]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}