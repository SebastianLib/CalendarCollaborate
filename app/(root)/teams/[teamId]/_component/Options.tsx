import { Settings } from "lucide-react";
import RemoveTeamOrUser from "./RemoveTeamOrUser";
import { TeamMembership, User } from "@prisma/client";
import { getFollowInfo } from "@/actions/getFollowInfo";
import FollowTeammates from "./FollowTeammates";

interface OptionsParams{
  ownerId: string;
  members: (TeamMembership & { user: User })[];
}

const Options = async({ownerId, members}:OptionsParams) => {
  const {teammatesWithNoFollow, membersId }= await getFollowInfo({members})
    
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold flex items-center gap-1"><Settings/>Options</h2>
      <div className="flex flex-col tems-start gap-4 p-4 h-[300px] min-h-[300px] overflow-y-scroll bg-white border border-gray-100 rounded-md shadow-md">
        <RemoveTeamOrUser ownerId={ownerId}/>
        <FollowTeammates teammatesWithNoFollow={teammatesWithNoFollow} membersId={membersId}/>
      </div>
    </div>
  );
};

export default Options;
