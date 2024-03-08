"use server"
import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";

interface GetTasksProps {
  day: number;
  month: number;
  year: number;
}

export const getTasks = async ({ day, month, year }: GetTasksProps) => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }


    const userTasks = await prisma.task.findMany({
      where: {
        userId,
        day: day,
        month: month,
        year: year,
      }
    });

    const allTasks = await prisma.task.findMany({
      where:{
        day: day,
        month: month,
        year: year,
      },
      include: {
        team: {
          include: {
            members: {
              where: {
                clerkId: userId,
              },
            },
          },
        },
      },
    });

    const teamTasks = allTasks.filter(task => task.team?.members.length! > 0);

    const combinedTasks = userTasks.concat(teamTasks);

    const uniqueIds = new Set();
    const uniqueTasks = combinedTasks.filter(task => {
      if (!uniqueIds.has(task.id)) {
        uniqueIds.add(task.id);
        return true;
      }
      return false;
    });

    return uniqueTasks;
  } catch (error) {
    console.error("[GET_DASHOBARD_COURSES]", error);
    throw error;
  }
};