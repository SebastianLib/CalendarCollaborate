"use client";
import { getCalendar } from "@/actions/getCalendar";
import { createContext, useState, useContext, useEffect } from "react";

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
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>; // Include setMonth in the interface
  day: number;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  getDayForTask: () => void;
  isToday: boolean;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
}

const AppContext = createContext<AppContextProps>({
  month: 1,
  setMonth: () => {},
  day: 1,
  setDay: () => {},
  year: 2024,
  setYear: () => {},
  getDayForTask: () => {},
  isToday: true,
  currentDay: 0,
  currentMonth: 0,
  currentYear: 0,
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [day, setDay] = useState(currentDate.getDate());
  const [currentYear, currentSetYear] = useState(currentDate.getFullYear());
  const [currentMonth, currentSetMonth] = useState(currentDate.getMonth());
  const [currentDay, currentSetDay] = useState(currentDate.getDate());
  const [isToday, setIsToday] = useState<boolean>(false);

  const getDayForTask = () => {
    const calendar = getCalendar();
    console.log(
      year,
      calendar[month][day - 1].dayName,
      calendar[month][day - 1].number
    );
  };

  useEffect(() => {
    if (currentMonth === month && currentDay === day && currentYear === year) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  }, [day, month, year]);

  return (
    <AppContext.Provider
      value={{
        month,
        setMonth,
        day,
        setDay,
        year,
        setYear,
        getDayForTask,
        isToday,
        currentDay,
        currentMonth,
        currentYear,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
