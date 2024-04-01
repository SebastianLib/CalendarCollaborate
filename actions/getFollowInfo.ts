import { auth } from "@clerk/nextjs";
import { TeamMembership, User } from "@prisma/client";
import { prisma } from "@/db";

interface GetFollowInfoProps{
    members: (TeamMembership & { user: User })[];
}

interface GetFollowInfoResult {
    teammatesWithNoFollow: string[];
    membersId: string[];
}

export const getFollowInfo = async({members}:GetFollowInfoProps): Promise<GetFollowInfoResult> => {
    const {userId} = auth();
    if(!userId){
        return  { teammatesWithNoFollow: [], membersId: [] }
    }
    const membersId = members.map((user)=> {
        return user.clerkId;
      }).filter((memberId)=>memberId !== userId);
;
    const allFollowers = await prisma.follower.findMany({
        where:{
            followerId: userId,
        },
        include:{
            user:true
        }
    })
    const teammatesWithNoFollow = membersId.filter((member) => !allFollowers.some((follower) => follower.userId === member));
    return {teammatesWithNoFollow, membersId  } 
}