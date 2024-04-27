import db from "@/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
){
    try {
        const {user} = await req.json();   
        
        const newUser = await db.user.create({
            data:{
              clerkId: user.id,
              email: user.emailAddresses[0].emailAddress,
              username: user.username ,
              firstName: user.firstName ,
              lastName: user.lastName || "" ,
              photo: user.imageUrl,
            }
          })

        return NextResponse.json({newUser})
    } catch (error) {
        console.log("[CREATE_USER]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}