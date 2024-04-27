"use server"
import db from "@/db";

interface GetTeamStatsProps {
  day: number;
  month: number;
  year: number;
  onlyTeam?: boolean;
  teamId: string;
}

export const GetTeamStats = async ({ day, month, year, onlyTeam, teamId }: GetTeamStatsProps) => {
  try {
    const tasks = await db.task.findMany({
      where: {
        day: day,
        month: month,
        year: year,
        teamId,
      }, include: {
        team: true,
        user: true,
      }
    }

    )
    if (!tasks) {
      return null
    }
    return tasks

  } catch (error) {
    console.error("[GET_DASHOBARD_COURSES]", error);
    throw error;
  }
};