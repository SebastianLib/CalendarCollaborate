import { firstDayNames, dayNames } from "@/lib/xdd";

interface Day {
    number: number;
    dayName: string;
  }
  
  type Month = Day[];
  
  type Calendar = Month[];

function getFirstDayOfMonthName(year: number, month: number) {
    const firstDayOfMonth = new Date(year, month, 1);
    const dayIndex = firstDayOfMonth.getDay();
    return firstDayNames[dayIndex];
  }

const GetNumberOfDaysInAllMonths = () => {
    let numberOfDaysInAllMonths = [];
    for (let i = 0; i < 12; i++) {
      let number = new Date(2024, i + 1, 0).getDate();
      const firstDayName = getFirstDayOfMonthName(2024, i);

      numberOfDaysInAllMonths.push({
        number: number,
        firstDayName: firstDayName,
      });
    }
    return numberOfDaysInAllMonths;
  };

export const getCalendar = () => {
    const calendar:Calendar = [];
    const numberOfDaysInAllMonths = GetNumberOfDaysInAllMonths();
    numberOfDaysInAllMonths.forEach((month) => {
      let dayIndex = dayNames.findIndex((day) => day === month.firstDayName);
      let arrayOfDays = [];
      for (let i = 0; i < month.number; i++) {
        let number = i + 1;

        arrayOfDays.push({ number: number, dayName: dayNames[dayIndex] });

        if (dayIndex >= 6) {
          dayIndex = 0;
        } else {
          dayIndex++;
        }
      }
      calendar.push(arrayOfDays);
    });
    return calendar
  };