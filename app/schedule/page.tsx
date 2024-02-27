"use client";
import { useEffect, useState } from "react";
import DayHoursDisplay from "./_components/DayHoursDisplay";
import DateButtons from "./_components/DateButtons";
import { useAppContext } from "@/context";


const SchedulePage = () => {  
  const currentDate = new Date();
  const {day, month, year} = useAppContext();
    const [isToday, setIsToday] = useState<boolean>(false);

      useEffect(()=>{
        if(currentDate.getMonth() === month && currentDate.getDate() === day && currentDate.getFullYear() === year){
          setIsToday(true);
        }else{
          setIsToday(false);
        }
      }, [day, month, year])
    
    
      return (
        <div className="m-4">
          <DateButtons/>
          <DayHoursDisplay isToday={isToday}/>
        </div>
      );
}

export default SchedulePage