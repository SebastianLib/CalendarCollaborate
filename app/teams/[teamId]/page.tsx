import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Members from "./_component/Members";
import { auth } from "@clerk/nextjs/server";
import TeamTasks from "./_component/TeamTasks";

const PageId = async({
  params,
}: {
  params: {
    teamId: string;
  };
}) => {

  const {userId} = auth();

  if(!userId) redirect("/")

  const team = await prisma.team.findUnique({
    where:{
      id: params.teamId,
    },
    include:{
      members:{
        include:{
          user: true
        }
      }
    }
  }) 

  const userExist = team?.members.some(member => member.clerkId === userId);
    
  if(!team || !userExist) redirect("/")

  return <div className="container mx-auto">
      <h1 className="text-center text-3xl md:text-4xl font-bold  my-10">{team.name}</h1>
      <div className="grid grid-cols-3 gap-2">
      <Members members={team.members} ownerId={team.ownerId}/>
      <TeamTasks/>
      </div>
  </div>;
};

export default PageId;
