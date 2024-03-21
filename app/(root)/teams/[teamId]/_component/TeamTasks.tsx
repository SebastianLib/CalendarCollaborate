"use client";
import { getTasks } from "@/actions/getTasks";
import DateButtons from "@/components/shared/DateButtons";
import { useAppContext } from "@/context";
import { Task } from "@prisma/client";
import { useEffect, useState } from "react";
import AllTeamTasks from "./AllTeamTasks";
import { ClipboardList } from "lucide-react";
import { useParams } from "next/navigation";

const TeamTasks = () => {
  const { day, month, year } = useAppContext();
  const [tasks, setTasks] = useState<Task[] | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const {teamId} = useParams<{ teamId: string }>();

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await getTasks({
          day,
          month,
          year,
          onlyTeam: true,
          teamId
        });
        fetchedTasks?.sort((a, b) => a.totalStarting - b.totalStarting)
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllTasks();
  }, [day, month, year]);
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold flex items-center gap-1"><ClipboardList/>Tasks</h2>
      <div className="border border-gray-100 rounded-md shadow-md p-4  h-[300px] max-h-[300px] overflow-y-scroll">
        <DateButtons size="sm" />
        {loading ? (
          <h2>Wait...</h2>
        ) : tasks?.length === 0 ? (
          <h2>There are no tasks on this day</h2>
        ) : (
          <AllTeamTasks tasks={tasks!} />
        )}
      </div>
    </div>
  );
};

export default TeamTasks;
