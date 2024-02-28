"use client"
import { getCalendar } from "@/actions/getCalendar";
import { useAppContext } from "@/context";
import { months } from "@/lib/utils";

const DateButtons = () => {
  const {day, month, setDay, setMonth} = useAppContext();

    const calendar:any = getCalendar();

    const handleDay = (action: string) => {
        if (action === "next") {
          if (calendar[month].length > day) {
            setDay((prev) => prev + 1);
          } else {
            setDay(1);
            setMonth((prev) => prev + 1);
          }
        } else {
          if (1 < day) {
            setDay((prev) => prev - 1);
          } else {
            setMonth((prev) => prev - 1);
            setDay(calendar[month - 1].length);
          }
        }
      };

  return (
    <div>
    <div className="flex gap-4 items-center">
    <button
      onClick={() => handleDay("prev")}
      className="bg-blue-600 text-white px-4 py-2"
    >
      back
    </button>
    <button
      onClick={() => handleDay("next")}
      className="bg-blue-600 text-white px-4 py-2"
    >
      next
    </button>
    </div>
    <div className="flex gap-2">
    <p className="text-xl font-semibold mt-2"><span className="font-bold">{months[month]}: </span> {calendar[month][day - 1].dayName} {calendar[month][day - 1].number}</p>
  </div>
  </div>
  )
}

export default DateButtons