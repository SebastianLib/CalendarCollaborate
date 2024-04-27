"use server"
import db from "@/db";
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
      return null;
    }
    const tasksFromOtherPeople = await db.task.findMany({
      where: {
        day: day,
        month: month,
        year: year,
        peopleTasks: {
          some: {
            clerkId: userId
          }
        }
      },
      include: {
        peopleTasks: {
          include: {
            user: true
          }
        }
      }
    });


    const allTasks = await db.task.findMany({
      where: {
        day: day,
        month: month,
        year: year,
      },
      include: {
        team: {
          include: {
            members: true
          },
        },
      },
    });

    const aviableTasks = allTasks.filter(task => task.team?.members.some(user => user.clerkId === userId) || task.userId === userId)

    const uniqueIds = new Set();
    const uniqueTasks = aviableTasks.filter(task => {
      if (!uniqueIds.has(task.id)) {
        uniqueIds.add(task.id);
        return true;
      }
      return false;
    });

    return [...uniqueTasks, ...tasksFromOtherPeople];
  } catch (error) {
    console.error("[GET_DASHOBARD_COURSES]", error);
    throw error;
  }
};