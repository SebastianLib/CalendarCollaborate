"use server"
import  prisma  from "@/db";

export const getUserInfo= async(profileId:string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
              clerkId: profileId,
            },include:{
              followers:{
                include:{
                  follower:{
                    include:{
                      followers: true,
                      following: true
                  }
                  }
                }
              },
              following:{
                include:{
                  user: true,
                  follower:{
                    include:{
                      followers: true,
                      following: true
                  }
                }
              },
            },
    }});
        return user
    } catch (error) {
        console.error("[GET_FOLLOWERS_ERROR]", error);
    }
}