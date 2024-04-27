import db from "@/db";
import Information from "./_components/Information";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/actions/getUserInfo";

const SinglePage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const singleTask = await db.task.findUnique({
    where: {
      id: params.id,
    },
    include: {
      team:true,
      user:true,
      peopleTasks:{
        include:{
          user:true
        }
      }
    },
  });

  const allTeams = await db.team.findMany({
    include: {
      members: {
        where: {
          clerkId: userId,
        },
      },
    },
  });

  const user = await getUserInfo(userId)

  const following = user?.following.map((follower)=>{
    return follower.user;
  })
  

  const teams = allTeams.filter(team => team.members.length > 0);
  
  return (
    <div>
      <Information singleTask={singleTask!} teams={teams} following={following}/>
    </div>
  );
};

export default SinglePage;
