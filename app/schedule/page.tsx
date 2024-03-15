"use client"
import DayHoursDisplay from "./_components/DayHoursDisplay";
import DateButtons from "../../components/shared/DateButtons";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { getTasks } from "@/actions/getTasks";
import { Task, Team } from "@prisma/client";
import Loading from "../../components/shared/Loading";

const SchedulePage = () => {  
  const { day, month, year} = useAppContext();
  const [tasks, setTasks] = useState<(Task[] & {team?:Team})| null >();
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(()=>{
    const getAllTasks = async () => {
      try {
        setLoading(true)
        const fetchedTasks = await getTasks({ day, month, year });
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }finally{
        setLoading(false)
      }
    }

  getAllTasks();
  },[day, month, year])

  if(loading){
    return <div className="m-4">
    <DateButtons/>  
    <Loading/>
</div>
  }
  
      return (
        <div className="m-4">
          <DateButtons/>
          <DayHoursDisplay tasks={tasks!}/>
        </div>
      );
}

export default SchedulePage