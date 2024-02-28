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

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        day: day,
        month: month,
        year: year,
      },
    });

    return tasks;
  } catch (error) {
    console.error("[GET_DASHOBARD_COURSES]", error);
    throw error; 
  }
};