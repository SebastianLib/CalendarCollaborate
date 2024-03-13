import { Task } from "@prisma/client";
import EditName from "./EditName";
import EditHour from "./EditHour";
import { EditCalendar } from "./EditCalendar";
import EditColor from "./EditColor";
import DeleteTask from "./DeleteTask";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InformationProps {
  singleTask: Task;
}

const Information = ({ singleTask }: InformationProps) => {
  const { name, startingHour, endingHour, userId:taskUserId, date, color } = singleTask;
  const {userId} = auth();
  const isEditable:boolean = taskUserId === userId
  return (
    <section className="container">
      <div className="flex flex-col justify-center items-center mx-auto mt-10 py-10 max-w-2xl bg-gray-100 rounded-lg shadow-xl">
        <h1 className="font-bold text-3xl">Task Infromation</h1>
        <div className="flex flex-col w-full space-y-10 py-10 px-4 lg:px-20">

              <EditName isEditable={isEditable} name={name}/>

              <EditHour isEditable={isEditable} hour={startingHour} secondHour={endingHour} type="startingHour"/>

              <EditHour isEditable={isEditable} hour={endingHour} secondHour={startingHour} type="endingHour"/>

              <EditCalendar isEditable={isEditable} currentDate={date}/>
              
              <EditColor isEditable={isEditable} color={color}/>
              {isEditable ? <DeleteTask/>:<Link href="/schedule"><Button>Go back</Button></Link>}
          </div>
        </div>
    </section>
  );
};

export default Information;
