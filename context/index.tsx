"use client";
import { createContext, useState, useContext, useEffect } from "react";


interface AppContextProps {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>; // Include setMonth in the interface
  day: number;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  isToday: boolean;
  resetCalendar: () => void
}

const AppContext = createContext<AppContextProps>({
  month: 1,
  setMonth: () => {},
  day: 1,
  setDay: () => {},
  year: 2024,
  setYear: () => {},
  isToday: true,
  resetCalendar:() => {}
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const currentDate = new Date();
  
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [day, setDay] = useState(currentDate.getDate());
  const [isToday, setIsToday] = useState<boolean>(false);

  useEffect(() => {
    if (currentDate.getMonth() === month && currentDate.getDate() === day && currentDate.getFullYear() === year) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  }, [day, month, year]);

  const resetCalendar = () => {
      setDay(currentDate.getDate())
      setMonth(currentDate.getMonth())
      setYear(currentDate.getFullYear())
  }

  return (
    <AppContext.Provider
      value={{
        month,
        setMonth,
        day,
        setDay,
        year,
        setYear,
        isToday,
        resetCalendar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
