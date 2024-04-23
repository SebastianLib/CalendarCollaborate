"use client";
import { useAppContext } from "@/context";
import { Task, Team } from "@prisma/client";
import { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import { getInfo } from "@/actions/getInfo";
import { renderHours } from "@/utils/renderHours";
import { useRouter } from "next/navigation";

interface DayHoursDisplay {
  tasks: Task[] & { team?: Team };
}

const DayHoursDisplay = ({ tasks }: DayHoursDisplay) => {
  const { isToday } = useAppContext();
  const router = useRouter();
  const initialhours = new Date().getHours();
  const currentDate = new Date();

  const [currentHour, setCurrentHour] = useState(initialhours);
  const [percent, setPercent] = useState((currentDate.getMinutes() / 60) * 100);
  
  const hours = renderHours();
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        const currentDate = new Date();
        setCurrentHour(currentDate.getHours());
        setPercent((currentDate.getMinutes() / 60) * 100);
        router.refresh();
      }, 60000);
    
      return () => clearInterval(intervalId);
    }, []);
  return (
    <div
      className="flex flex-shrink-0  bg-gray-100 overflow-x-scroll"
      style={{ minHeight: tasks && tasks.length < 8 ? 650 : 650 + (tasks ? tasks.length * 70 : 0) }}
    >
      <div className="flex">
        {hours.map((hours, index) => {
          return (
            <div
              key={index}
              className="w-[120px] border border-gray-200 relative"
            >
              <p className="ml-2 pb-2">
                {index < 10 ? `0${index}:00` : `${index}:00`}
              </p>
              <div
                className={`absolute bg-red-400 w-1 top-0 h-full z-40 ${
                  currentHour === index && isToday ? "visible" : "hidden"
                }`}
                style={{ left: `${percent}%` }}
              />
              <div className="flex">
                {hours.map((hour, index) => {
                  return (
                    <div key={index} className={`w-[30px] cursor-pointer`}>
                      {tasks?.map((task, index) => {
                      const { width } = getInfo(task?.startingHour, task?.endingHour);
                        return String(hour) === task.startingHour ? (
                          <SingleTask key={task.id} task={task} index={index} width={width} />
                        ) : null;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayHoursDisplay;
