import { Task, Team, User } from "@prisma/client";
import EditName from "./EditName";
import EditHour from "./EditHour";
import { EditCalendar } from "./EditCalendar";
import EditColor from "./EditColor";
import DeleteTask from "./DeleteTask";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EditDescription from "./EditDescription";
import { ClipboardList } from "lucide-react";
import EditTeam from "./EditTeam";
import Image from "next/image";

interface InformationProps {
  singleTask: Task & { team?: Team | null; user: User};
  teams: Team[];
}

const Information = ({ singleTask, teams }: InformationProps) => {
  const {
    name,
    description,
    startingHour,
    endingHour,
    userId: taskUserId,
    date,
    color,
    team,
    user,
  } = singleTask;
  const { userId } = auth();

  const isEditable: boolean = taskUserId === userId;
  return (
    <section className="container">
      <div className="flex flex-col justify-center items-center mx-auto my-5 py-5 max-w-2xl bg-gray-200 taskBackground rounded-lg shadow-xl">
        <h1 className="font-bold text-3xl flex items-center gap-1">
          <ClipboardList /> Task Infromation
        </h1>
        <div className="flex flex-col w-full sm:space-y-4 space-y-10 py-4 px-2 lg:px-10">
          <div className="flex flex-col gap-1 text-xl text-center sm:text-left col-span-2">
            <h2 className="font-bold text-md">Creator:</h2>
            <div className="flex justify-center sm:justify-start gap-1">
            <Image
              key={user.id}
              src={user.photo}
              width={30}
              height={30}
              alt="user image"
              className="rounded-full"
            />
            <p>{user.username}</p>
            </div>
          </div>
          <EditTeam isEditable={isEditable} team={team?.name} teams={teams} />

          <EditName isEditable={isEditable} name={name} />

          <EditDescription isEditable={isEditable} description={description} />

          <EditHour
            isEditable={isEditable}
            hour={startingHour}
            secondHour={endingHour}
            type="startingHour"
          />

          <EditHour
            isEditable={isEditable}
            hour={endingHour}
            secondHour={startingHour}
            type="endingHour"
          />

          <EditCalendar isEditable={isEditable} currentDate={date} />

          <EditColor isEditable={isEditable} color={color} />
          <div className="flex justify-center gap-2">
            <Link href="/schedule">
              <Button size={"lg"}>Go back</Button>
            </Link>
            {isEditable && <DeleteTask />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
