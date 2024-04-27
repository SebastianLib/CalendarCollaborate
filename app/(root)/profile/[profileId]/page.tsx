import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserProfile from "./_components/UserProfile";
import { getFollowers } from "@/actions/getFollowers";
import SearchProfile from "./_components/SearchProfile";
import { getSearchUsers } from "@/actions/getSearchUsers";
import { getUserInfo} from "@/actions/getUserInfo";

const page = async ({ params }: { params: { profileId: string } }) => {
  const { profileId } = params;
  
  const {userId} = auth();
  if (!userId) {
    redirect("/");
  }
  const searchUsers = await getSearchUsers( {profileId:profileId} );
  
  const user = await getUserInfo(profileId)
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
      user={user} 
      isMyAccount={isMyAccount} 
      isFollowing={isFollowing || false}/>
    </div>
  );
};

export default page;
