import { Settings } from "lucide-react";
import RemoveTeamOrUser from "./RemoveTeamOrUser";
import { auth } from "@clerk/nextjs";

interface OptionsParams{
  ownerId: string;
}

const Options = ({ownerId}:OptionsParams) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold flex items-center gap-1"><Settings/>Options</h2>
      <div className="border border-gray-100 rounded-md shadow-md p-4">
        <RemoveTeamOrUser ownerId={ownerId}/>
      </div>
    </div>
  );
};

export default Options;
