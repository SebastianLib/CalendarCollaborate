import { prisma } from "@/db";
import CreateTeam from "./_components/CreateTeam";
import Teams from "./_components/Teams";
import { auth } from "@clerk/nextjs";

const TeamsPage = async () => {
  const {userId} = auth();
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

  if(!userId){
    return     <div className="mt-10">
    <div className="w-full container mx-auto space-y-10">
      <Teams type="member"/>
      <Teams teams={teams} type="notMember"/>
    </div>
  </div>
  }
  const filteredTeams = teams.filter(team => team.members.every(member => member.user !== null));
  
  const userInTeams = teams.filter(team=>team.members.some(user => user.clerkId === userId))
  const userNotInTeams = teams.filter(team=>!team.members.some(user => user.clerkId === userId))
  
  return (
    <div className="mt-10">
      <div className="w-full container mx-auto space-y-10">
        <CreateTeam />
        <Teams teams={userInTeams} type="member"/>
        <Teams teams={userNotInTeams} type="notMember"/>
      </div>
    </div>
  );
};

export default TeamsPage;
