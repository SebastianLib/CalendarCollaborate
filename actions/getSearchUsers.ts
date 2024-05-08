"use server"
import db from "@/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props{
    input?: string;
    profileId:string
}

export const getSearchUsers = async({input, profileId}:Props) => {
    
    try {
        const {userId} = auth();
        
        if(!userId){
            return redirect("/sign-in")
        }
        
        const users = await db.user.findMany({
            where:{
                username:{
                    contains: input,
                    mode: 'insensitive',
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