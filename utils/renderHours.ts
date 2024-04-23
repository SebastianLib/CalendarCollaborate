"use client"
import { useMemo } from "react";

export const renderHours = () => {
  
  const hours = useMemo(() => {
    let hoursArray = [];
    for (let i = 0; i < 24; i++) {
      const quarters = [[`${i}:00`], [`${i}:15`], [`${i}:30`], [`${i}:45`]];
      hoursArray.push(quarters);
    }
    return hoursArray;
  }, []);
  return hours;
};