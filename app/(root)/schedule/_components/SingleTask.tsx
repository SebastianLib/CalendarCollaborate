import { Task, Team } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface SingleTask {
  task: (Task & {team?:Team});
  index: number,
  width: number,
}

const SingleTask = ({ task, index, width }: SingleTask) => {

  return (
    <div
      style={{ width: width, marginTop: (index * 70) }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="absolute !z-20">
          <Link href={`schedule/${task.id}`}>
            <div
              className="flex items-center h-[60px] z-30"
              style={{background:task.color}}
            >
              <p
                className="text-white line-clamp-1 pl-1 flex"
                style={{ width: width }}
              >
                {task.name.slice(0, width / 11)}
                {task.name.length > width / 12 ? "..." : null}
              </p>
            </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <div className="bg-white flex flex-col py-2 space-y-2 min-w-40">
              <p className="text-black text-lg">name: <span className="font-semibold">{task.name}</span></p>
              <p className="text-black text-lg">team: <span className="font-semibold">{task.team ? task.team.name : "no team"}</span></p>
              <Link className="text-sm text-white p-2 rounded-xl w-fit" 
              style={{background: task.color}}
              href={`schedule/${task.id}`}>
                see more
              </Link>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
     </div>
  );
};

export default SingleTask;
