import { Task } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface SingleTask {
  task: Task;
}

const SingleTask = ({ task }: SingleTask) => {
  return (
    <div
      style={{ width: task.width, marginTop: task.position * 70 }}
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
                style={{ width: task.width }}
              >
                {task.name.slice(0, task.width / 11)}
                {task.name.length > task.width / 12 ? "..." : null}
              </p>
            </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <div className="bg-white py-4 min-w-40">
              <p className="text-black">{task.name}</p>
              <Link className="font-bold" href={`schedule/${task.id}`}>
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
