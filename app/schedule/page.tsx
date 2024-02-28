"use client"
import DayHoursDisplay from "./_components/DayHoursDisplay";
import DateButtons from "./_components/DateButtons";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { getTasks } from "@/actions/getTasks";
import { Task } from "@prisma/client";

const SchedulePage = () => {  
  const { day, month, year} = useAppContext();
  const [tasks, setTasks] = useState<Task[] | null >();

  useEffect(()=>{
    const getAllTasks = async () => {

      try {
        const fetchedTasks = await getTasks({ day, month, year });
        setTasks(fetchedTasks );
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

  getAllTasks();
  },[day, month, year])
  
      return (
        <div className="m-4">
          <DateButtons/>
          <DayHoursDisplay tasks={tasks!}/>
        </div>
      );
}

export default SchedulePage