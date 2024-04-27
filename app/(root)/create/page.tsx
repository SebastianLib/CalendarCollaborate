import CalendarForm from "./_components/ScheduleForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/actions/getUserInfo";
import db from "@/db";

export default async function Home() {
  const { userId } = auth();

  if (!userId) redirect("/");

  const allTeams = await db.team.findMany({
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
