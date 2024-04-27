import db from "@/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { profileId: string } }
){
    try {
        const {userId} = auth();
        const {profileId} = params

        if(!userId || profileId === userId){
            return new NextResponse("unauthorized", {status: 401})
        }
        
        const theSameFollower = await db.follower.findMany({
            where:{
                userId: profileId,
                followerId: userId,
            }
        })

        if(theSameFollower.length > 0){
            return new NextResponse("User is already a follower.", {status: 409})
        }
        
        const newFollower = await db.follower.create({
            data:{
                userId: profileId,
                followerId: userId,
            }
        })
        return NextResponse.json({newFollower})
    } catch (error) {
        console.log("[POST_FOLLOW]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { profileId: string } }
){
    try {
        const {userId} = auth();
        const {profileId} = params

        if(!userId || profileId === userId){
            return new NextResponse("unauthorized", {status: 401})
        }
        
        const removeFollow = await db.follower.deleteMany({
            where:{
                userId: profileId,
                followerId: userId,
            }
        })
        return NextResponse.json({removeFollow})
    } catch (error) {
        console.log("[POST_FOLLOW]", error);
        return new NextResponse("Internal Error", {status:500})
    }
}