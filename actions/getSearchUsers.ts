"use server"
import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";

interface Props{
    input?: string;
    profileId:string
}

export const getSearchUsers = async({input, profileId}:Props) => {
    
    try {
        const {userId} = auth();
        
        if(!userId){
            return null
        }
        
        const users = await prisma.user.findMany({
            where:{
                username:{
                    contains: input
                },
                NOT:{
                    clerkId: profileId
                }
            },
            take: 5,
        })
        
        return users
    } catch (error) {
        console.error("[GET_SEARCH_USERS]", error);
    }
}