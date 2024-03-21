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
      <div className="p-4 h-[300px] max-h-[300px] overflow-y-scroll bg-white border border-gray-100 rounded-md shadow-md">
        <RemoveTeamOrUser ownerId={ownerId}/>
      </div>
    </div>
  );
};

export default Options;
