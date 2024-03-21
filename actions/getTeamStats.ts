"use server"
import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";
import { Task, User } from "@prisma/client";
import { getTasks } from "./getTasks";

interface GetTeamStatsProps {
  day: number;
  month: number;
  year: number;
  onlyTeam?: boolean;
  teamId?: string;
}

export const GetTeamStats = async ({ day, month, year, onlyTeam, teamId }: GetTeamStatsProps) => {
  try {
    const tasks = await getTasks({day, month, year, onlyTeam, teamId})
    if (!tasks) {
      return null
    }

    type obj = {[key: string] : number}
    const usersStats:obj = {};
    tasks?.forEach(task => {
        usersStats[task.user.username] = (usersStats[task.user.username] || 0) + 1; 
    });
  
    return usersStats;
  } catch (error) {
    console.error("[GET_DASHOBARD_COURSES]", error);
    throw error;
  }
};