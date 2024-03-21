import { prisma } from "@/db";
import CalendarForm from "./_components/ScheduleForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
  
  return (
    <div>
      <CalendarForm teams={teams}/>
    </div>
  );
}
