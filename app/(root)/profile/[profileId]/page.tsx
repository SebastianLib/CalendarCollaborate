import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserProfile from "./_components/UserProfile";
import { getFollowers } from "@/actions/getFollowers";
import SearchProfile from "./_components/SearchProfile";
import { getSearchUsers } from "@/actions/getSearchUsers";

const page = async ({ params }: { params: { profileId: string } }) => {
  const { profileId } = params;
  
  const {userId} = auth();
  const searchUsers = await getSearchUsers( {profileId:profileId} );
  const user = await prisma.user.findUnique({
    where: {
      clerkId: profileId,
    },include:{
      followers:{
        include:{
          follower: true
        }
      },
      following:{
        include:{
          user: true
        }
      },
    },

  });
  if (!user) {
    redirect("/");
  }
  
  const isMyAccount = user.clerkId === userId;
  const data = await getFollowers(profileId);
  const allFollowers = data?.map((follower)=>{
    return follower.follower
  })
  const isFollowing = allFollowers?.some(follower => follower.clerkId === userId);
  
  return (
    <div className="mt-10 container mx-auto">
      <SearchProfile searchUsers={searchUsers} profileId={profileId}/>
      <h1 className="text-center text-3xl font-bold">
        {user.firstName} Profile
      </h1>
      <UserProfile 
      followers={user.followers} 
      following={user.following} 
      user={user} 
      isMyAccount={isMyAccount} 
      isFollowing={isFollowing || false}/>
    </div>
  );
};

export default page;
