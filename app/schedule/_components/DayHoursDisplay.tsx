"use client";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";

interface DayHoursDisplayProps {
  isToday: boolean;
}

const DayHoursDisplay = ({ isToday }: DayHoursDisplayProps) => {

  const {day, month, year, getDayForTask, getTasks} = useAppContext();
    const tasks = getTasks()
    
  const initialMinutes = new Date().getMinutes();
  const initialhours = new Date().getHours();

  const [percent, setPercent] = useState((initialMinutes / 60) * 100);
  const [currentHour, setCurrentHour] = useState(initialhours);
  const [currentMinute, setCurrentMinute] = useState(initialMinutes);

  let hours = [];
  for (let i = 0; i < 24; i++) {
    const quarters = [[`${i}:00`], [`${i}:15`], [`${i}:30`], [`${i}:45`]];
    hours.push(quarters);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      setCurrentHour(currentDate.getHours());
      setCurrentMinute(currentDate.getMinutes());
      setPercent((currentMinute / 60) * 100);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="min-h-[600px] flex flex-shrink-0 bg-gray-100 overflow-x-scroll">
      <div className="flex">
        {hours.map((hours, index) => {
          return (
            <div
              key={index}
              className="w-[120px] border border-gray-200 relative"
            >
              <p className="ml-2">
                {index < 10 ? `0${index}:00` : `${index}:00`}
              </p>
              <div
                className={`absolute bg-red-300 w-1 h-full z-50 ${
                  currentHour === index && isToday ? "visible" : "hidden"
                }`}
                style={{ left: `${percent}%` }}
              />
              <div className="flex">
                {hours.map((hour, index) => {
                  return (
                    <div key={index} className={`w-[30px] relative`}>
                      {/* {hour} */}
                      {tasks.map((task, index) => (
                        
                          String(hour) === task.startedHour ? (
                            <div
                              key={index}
                              className="bg-blue-500 absolute h-[60px] z-20"
                              style={{ width: task.width, marginTop: task.position }}
                            >
                              <p className="text-white">{task.name}</p>
                            </div>
                          )
                        : null
                      ))}

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
