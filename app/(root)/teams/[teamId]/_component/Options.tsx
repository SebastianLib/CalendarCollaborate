import { Settings } from "lucide-react";
import RemoveTeamOrUser from "./RemoveTeamOrUser";
import { Team, TeamMembership, User } from "@prisma/client";
import { getFollowInfo } from "@/actions/getFollowInfo";
import FollowTeammates from "./FollowTeammates";
import ChangeTeamName from "./ChangeTeamName";

interface OptionsParams {
  members: (TeamMembership & { user: User })[];
  isOwner: boolean;
  team: Team
}

const Options = async ({ members, isOwner, team }: OptionsParams) => {
  const { teammatesWithNoFollow, membersId } = await getFollowInfo({ members });

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold flex items-center gap-1">
        <Settings />
        Options
      </h2>
      <div className="flex flex-col tems-start gap-4 p-4 h-[300px] min-h-[300px] overflow-y-auto bg-white border border-gray-100 rounded-md shadow-md">
        <RemoveTeamOrUser isOwner={isOwner} />
        <FollowTeammates
          teammatesWithNoFollow={teammatesWithNoFollow}
          membersId={membersId}
        />
        {isOwner && <ChangeTeamName team={team}/>}
      </div>
    </div>
  );
};

export default Options;
