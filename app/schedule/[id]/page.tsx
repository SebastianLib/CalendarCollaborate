import { prisma } from "@/db";
import Information from "./_components/Information";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SinglePage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const singleTask = await prisma.task.findUnique({
    where: {
      id: params.id,
    },
    include: {
      team:true,
      user:true
    },
  });

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
      <Information singleTask={singleTask!} teams={teams}/>
    </div>
  );
};

export default SinglePage;
