import { Task } from "@prisma/client";
import Link from "next/link";

interface AllTeamTasksProps {
  tasks: Task[];
}

const AllTeamTasks = ({ tasks }: AllTeamTasksProps) => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      {tasks?.map((task) => (
        <Link key={task.id} href={`/schedule/${task.id}`}>
          <div className="flex items-center justify-between p-4 w-full text-white" style={{background:task.color}}>
            <h2>{task.name}</h2>
            <div>
            <p>Starting: <span>{task.startingHour}</span></p>
            <p>Ending: <span>{task.endingHour}</span></p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllTeamTasks;
