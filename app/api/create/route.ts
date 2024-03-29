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

        let task = {}
        if(data.team === undefined || data.team === "individual"){
            const { team, ...taskData } = data;
            task = await prisma.task.create({
                data: {
                    userId: userId,
                    ...taskData
                }
            }) 
        }
        else{
            const { team, ...taskData } = data;
            task = await prisma.task.create({
                data: {
                    userId: userId,
                    teamId: data.team,
                    ...taskData
                }
            }) 
        }  
        

        return NextResponse.json(task)
    } catch (error) {
        console.log("[CREATE_TASK]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}
