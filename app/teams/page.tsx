import { prisma } from "@/db";
import CreateTeam from "./_components/CreateTeam";
import Teams from "./_components/Teams";

const TeamsPage = async () => {
  const teams = await prisma.team.findMany({
    include: {
      owner: true,
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  return (
    <div className="mt-10">
      <div className="w-full container mx-auto space-y-10">
        <CreateTeam />
        <Teams teams={teams} />
      </div>
    </div>
  );
};

export default TeamsPage;
