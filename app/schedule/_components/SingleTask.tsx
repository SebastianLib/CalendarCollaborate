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
      className="absolute z-20"
      style={{ width: task.width, marginTop: task.position * 70 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
          <Link href={`schedule/${task.id}`}>
            <div
              className="bg-blue-500 flex items-center h-[60px] z-20"
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
          <TooltipContent
            className=""
            style={{ marginTop: task.position * 37 }}
          >
            <div className="bg-white py-4 z-50">
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
