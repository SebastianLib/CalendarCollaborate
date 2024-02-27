"use client";
import { getCalendar } from "@/actions/getCalendar";
import { createContext, useState, useContext } from "react";

interface Task {
  name: string;
  startedHour: string;
  endingHour: string;
  width: number;
  totalStarting: number;
  totalEnding: number;
  position: number;
  day: number;
  month: number;
  year: number;
}

interface AppContextProps {
    tasks: Task[];
    month: number;
    setMonth: React.Dispatch<React.SetStateAction<number>>; // Include setMonth in the interface
    day: number;
    setDay: React.Dispatch<React.SetStateAction<number>>;
    year: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
    getDayForTask: () => void;
    getTasks: () => Task[];
  }

  const AppContext = createContext<AppContextProps>({
    tasks: [],
    month: 1,
    setMonth: () => {},
    day: 1,
    setDay: () => {},
    year: 2024,
    setYear: () => {},
    getDayForTask: () => {},
    getTasks: () => []
  });
  
export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [tasks, setTasks] = useState<Task[]>([
    {
      name: "buy a kebab",
      startedHour: "11:15",
      endingHour: "14:30",
      width: 0,
      totalStarting: 0,
      totalEnding: 0,
      position: 0,
      day: 26,
      month: 1,
      year:2024
    },
    {
      name: "learning english",
      startedHour: "17:15",
      endingHour: "19:30",
      width: 0,
      totalStarting: 0,
      totalEnding: 0,
      position: 0,
      day: 26,
      month: 1,
      year:2024
    },
    {
      name: "training",
      startedHour: "12:15",
      endingHour: "15:30",
      width: 0,
      totalStarting: 0,
      totalEnding: 0,
      position: 65,
      day: 27,
      month: 1,
      year:2024
    },
  ]);
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [day, setDay] = useState(currentDate.getDate());
  const [currentYear, currentSetYear] = useState(currentDate.getFullYear());
  const [currentMonth, currentSetMonth] = useState(currentDate.getMonth());
  const [currentDay, currentSetDay] = useState(currentDate.getDate());

  const getDayForTask = () => {
    const calendar = getCalendar();
    console.log(
      year,
      calendar[month][day - 1].dayName,
      calendar[month][day - 1].number
    );
  };

  const getTasks = () => {
     const todayTasks = tasks.filter(task => task.day === day && task.month === month && task.year === year)
     todayTasks.forEach((task) => {
      const startedTimeParts = task.startedHour.split(":");
      const endingTimeParts = task.endingHour.split(":");
  
      // Przekształcamy godziny i minuty na liczby
      const startedHour = parseInt(startedTimeParts[0], 10);
      const startedMinute = parseInt(startedTimeParts[1], 10);
  
      const totalStarting = (startedHour * 60) + startedMinute   
  
      const endingHour = parseInt(endingTimeParts[0], 10);
      const endingMinute = parseInt(endingTimeParts[1], 10);
  
      const totalEnding = (endingHour * 60) + endingMinute
  
      // Obliczamy różnicę czasu w minutach
      const timeDifferenceInMinutes =
        endingHour * 60 + endingMinute - (startedHour * 60 + startedMinute);
      const width = (timeDifferenceInMinutes / 15) * 30;
      task.width = width;
      task.totalStarting = totalStarting;
      task.totalEnding = totalEnding;
    });
     return todayTasks
    }

  return (
    <AppContext.Provider value={{ tasks, month, setMonth, day, setDay, year, setYear, getDayForTask, getTasks }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
