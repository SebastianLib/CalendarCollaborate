import db from "@/db";
import { redirect } from "next/navigation";
import Members from "./_component/Members";
import { auth } from "@clerk/nextjs/server";
import TeamTasks from "./_component/TeamTasks";
import Options from "./_component/Options";
import { UsersRound } from "lucide-react";
import TeamStats from "./_component/TeamStats";

const PageId = async ({
  params,
}: {
  params: {
    teamId: string;
  };
}) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const team = await db.team.findUnique({
    where: {
      id: params.teamId,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  const userExist = team?.members.some((member) => member.clerkId === userId);

  if (!team || !userExist) redirect("/");

  const isOwner = team.members.some(member => member.clerkId === userId && member.role === "owner");
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold my-10 flex items-center justify-center gap-1">
        <UsersRound width={30} height={30}/>
        {team.name}
      </h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Members members={team.members} isOwner={isOwner}/>
        <TeamTasks />
        <Options members={team.members} isOwner={isOwner} team={team}/>
        <TeamStats/>
      </div>
    </div>
  );
};

export default PageId;
