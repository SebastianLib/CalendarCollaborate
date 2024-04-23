"use client"
import { getCalendar } from "@/utils/getCalendar";
import { useAppContext } from "@/context";
import { months } from "@/utils/arrays";
import { useEffect, useState } from "react";

interface DateButtonProps{
  size?: "sm"
}

const DateButtons = ({size}:DateButtonProps) => {
  const {day, month, setDay, setMonth, year, setYear} = useAppContext();
  const [calendar, setCalendar] = useState<any>(null);

  const handlePrevYear = () => {
    const data = getCalendar(year-1)
    setDay(data[11].length)
    setCalendar(data)
  }
  const handleYear = () => {
    const data = getCalendar(year+1)
    setCalendar(data)
  }
  
    useEffect(() => {
      const data = getCalendar(year)
      setCalendar(data)
    }, []);

    const handleDay = (action: string) => {
        if (action === "next") {
          if (calendar[month].length > day) {
            setDay((prev) => prev + 1);
          } else {
            if(month === 11){
              setDay(1)
              setMonth(0)
              setYear(prev => prev+1)
              handleYear()
              return
            }

            setDay(1);
            setMonth((prev) => prev + 1);
          }
        } else {
          if (1 < day) {
            setDay((prev) => prev - 1);
          } else {
            if(day === 1 && month === 0){
              setMonth(11)
              setYear(prev => prev-1)
              handlePrevYear()
              return
            }
            setMonth((prev) => prev - 1);
            setDay(calendar[month - 1].length);
          }
        }
      };
      
      if(!calendar){
        return null
      }
  return (
    <div className={`${size === "sm" && ""}`}>
    <div className={`flex items-center ${size === "sm" ? "flex gap-1":" gap-4"}`}>
    <button
      onClick={() => handleDay("prev")}
      className={`bg-blue-600 text-white px-4 py-2 ${size === "sm" ? "text-sm px-3" : "px-4 py-2"}`}
    >
      back
    </button>
    <button
      onClick={() => handleDay("next")}
      className={`bg-blue-600 text-white px-4 py-2 ${size === "sm" ? "text-sm px-3" : "px-4 py-2"}`}
    >
      next
    </button>
    </div>
    <div className="flex gap-2">
    <p className={` font-semibold ${size==="sm" ? "text-lg" : "text-xl"} mt-2`}><span className="font-bold">{year} {months[month]}: </span> {calendar[month][day - 1].dayName} {calendar[month][day - 1].number}</p>
  </div>
  </div>
  )
}

export default DateButtons