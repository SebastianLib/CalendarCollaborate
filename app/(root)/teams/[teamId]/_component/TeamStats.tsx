"use client"
import { getTasks } from "@/actions/getTasks";
import { GetTeamStats } from "@/actions/getTeamStats";
import { useAppContext } from "@/context";
import { Task } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const TeamStats = () => {
  const { day, month, year } = useAppContext();
  const [teamStats, setTeamStats] = useState<{ [key: string]: number } | null>(null);
  const { teamId } = useParams<{ teamId: string }>();

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const data = await GetTeamStats({
          day,
          month,
          year,
          onlyTeam: true,
          teamId,
        });
        setTeamStats(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getAllTasks();
  }, [day, month, year]);

  if (!teamStats) {
    return null;
  }

  const chartData = {
    labels: Object.keys(teamStats), // Remove the outer array wrapper
    datasets: [
      {
        data: Object.values(teamStats),
        backgroundColor: [
          "#FF0000",
          "#2a71d0",
          "#50AF95",
          "#8B008B",          
          "#f3ba2f",
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  };
  
  return (
    <div className="overflow-hidden">
      <h2 className="text-xl font-semibold">Team Stats</h2>
      {Object.keys(teamStats).length > 0 ? 
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Who did how many tasks today"
            }
          }
        }}
      />
      : <p>No data.</p> }
    </div>
  );
};

export default TeamStats;