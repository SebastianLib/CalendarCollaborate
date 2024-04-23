import { prisma } from "@/db";
import CalendarForm from "./_components/ScheduleForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/actions/getUserInfo";

export default async function Home() {
  const { userId } = auth();

  if (!userId) redirect("/");

  const allTeams = await prisma.team.findMany({
    include: {
      members: {
        where: {
          clerkId: userId,
        },
      },
    },
  });

  const teams = allTeams.filter(team => team.members.length > 0);

  const user = await getUserInfo(userId)
  if (!user) redirect("/");

  const following = user.following.map((follower)=>{
    return follower.user;
  })
  
  return (
    <div>
      <CalendarForm teams={teams} people={following}/>
    </div>
  );
}
