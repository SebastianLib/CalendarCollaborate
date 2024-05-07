import db from "@/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
){
    try {
        const {userId} = auth();       
        const {team, type, peopleIds, people, ...taskData} = await req.json();
        
        if(!userId){
            return new NextResponse("unauthorized", {status: 401})
        }
        let task = {}
        if(type === "individual"){            
           task = await db.task.create({
                data: {
                    userId: userId,
                    ...taskData
                }
            }) 
            return NextResponse.json({task})
        }
        if(type === "teams"){
           task = await db.task.create({
                data: {
                    userId: userId,
                    teamId: team,
                    ...taskData
                }
            }) 
            return NextResponse.json({task})
        }else{
            task = await db.task.create({
                data: {
                    userId: userId,
                    ...taskData,
                    peopleTasks: {
                        create: peopleIds,
                      },
                }
            }) 
        }  
        

        return NextResponse.json({task})
    } catch (error) {
        console.log("[CREATE_TASK]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}
