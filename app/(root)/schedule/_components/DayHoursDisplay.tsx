"use client";
import { useAppContext } from "@/context";
import { Task, Team } from "@prisma/client";
import { useEffect, useState } from "react";
import SingleTask from "./SingleTask";

interface DayHoursDisplay {
  tasks: Task[] & { team?: Team };
}

const DayHoursDisplay = ({ tasks }: DayHoursDisplay) => {
  const { isToday } = useAppContext();

  const initialMinutes = new Date().getMinutes();
  const initialhours = new Date().getHours();

  const [currentHour, setCurrentHour] = useState(initialhours);
  const [currentMinute, setCurrentMinute] = useState(initialMinutes);
  const [percent, setPercent] = useState((currentMinute / 60) * 100);

  let hours = [];
  for (let i = 0; i < 24; i++) {
    const quarters = [[`${i}:00`], [`${i}:15`], [`${i}:30`], [`${i}:45`]];
    hours.push(quarters);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("xdddd");

      const currentDate = new Date();
      setCurrentHour(currentDate.getHours());
      setCurrentMinute(currentDate.getMinutes());
      setPercent((currentMinute / 60) * 100);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="flex flex-shrink-0  bg-gray-100 overflow-x-scroll"
      style={{ minHeight: tasks?.length < 8 ? 650 : 650 + tasks?.length * 70 }}
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
                        return String(hour) === task?.startingHour ? (
                          <SingleTask key={task.id} task={task} index={index} />
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
