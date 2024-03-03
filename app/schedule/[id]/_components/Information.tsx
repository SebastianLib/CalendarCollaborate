import { Task } from "@prisma/client";
import EditName from "./EditName";
import EditHour from "./EditHour";
import { EditCalendar } from "./EditCalendar";
import EditColor from "./EditColor";
import DeleteTask from "./DeleteTask";

interface InformationProps {
  singleTask: Task;
}

const Information = ({ singleTask }: InformationProps) => {
  const { name, startingHour, endingHour, id, date, color } = singleTask;
  return (
    <section className="container">
      <div className="flex flex-col justify-center items-center mx-auto mt-10 py-10 max-w-2xl bg-gray-100 rounded-lg shadow-xl">
        <h1 className="font-bold text-3xl">Task Infromation</h1>
        <div className="flex flex-col w-full space-y-10 py-10 px-4 lg:px-20">

              <EditName name={name} id={id}/>

              <EditHour id={id} hour={startingHour} secondHour={endingHour} type="startingHour"/>

              <EditHour id={id} hour={endingHour} secondHour={startingHour} type="endingHour"/>

              <EditCalendar id={id} currentDate={date}/>
              
              <EditColor id={id} color={color}/>

              <DeleteTask id={id}/>
          </div>
        </div>
    </section>
  );
};

export default Information;
