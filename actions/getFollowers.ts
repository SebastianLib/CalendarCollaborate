"use server"
import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";

export const getFollowers = async(profileId:string) => {
    try {
        const {userId} = auth();

        if(!userId || profileId === userId){
            return null
        }
        
        const followers = await prisma.follower.findMany({
            where:{
                userId: profileId,
            },
            include:{
                follower:true
            }
        })
        
        return followers
    } catch (error) {
        console.error("[GET_FOLLOWERS_ERROR]", error);
    }
}