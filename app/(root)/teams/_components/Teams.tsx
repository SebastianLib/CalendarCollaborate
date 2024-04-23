"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Team, TeamMembership, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props extends Team {
  members: (TeamMembership & { user: User })[];
}

interface TeamsProps {
  teams?: Props[];
  type: "member" | "notMember";
}

const Teams = ({ teams, type }: TeamsProps) => {
  const [loading, setLoading] = useState<boolean>();
  const { userId } = useAuth();
  const router = useRouter();

  const joinToTeam = async (teamId: string) => {
    try {
      setLoading(true);
      await axios.patch("/api/teams", { teamId: teamId });
      toast.success("you joined the team!");
      router.push("teams/" + teamId);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">
        {type === "member" ? "My teams" : "Find new team"}
      </h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
        {teams?.length === 0 || teams === undefined ? (
          teams === undefined ? (
            <p className="text-lg font-semibold">
              You must{" "}
              <Link href="/sign-in" className="text-blue-500 font-bold">
                login
              </Link>{" "}
              to join other teams
            </p>
          ) : (
            <p className="text-lg font-semibold">
              {type === "member"
                ? "You haven't joined any team yet."
                : "no teams found."}
            </p>
          )
        ) : (
          teams?.map((team) => {
            return (
              <div key={team.id} className="p-6 border shadow-xl space-y-4">
                <h2 className="text-xl font-bold">{team.name}</h2>
                <div className="space-y-1">
                  <p>Members:</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 md:gap-0">
                    <div className="flex items-center gap-1">
                      {team.members.slice(0, 5).map((member) => (
                        <Image
                          key={member.id}
                          src={member.user.photo}
                          width={30}
                          height={30}
                          alt="user image"
                          className="rounded-full"
                        />
                      ))}
                      {team.members.length > 5 && (
                        <p>+{team.members.length - 5}</p>
                      )}
                    </div>
                    {type === "notMember" ? (
                      !userId ? (
                        <Link href={`/sign-in`}>
                          <Button className="px-6">Login</Button>
                        </Link>
                      ) : (
                        <Button
                          disabled={loading}
                          onClick={() => joinToTeam(team.id)}
                          className="px-6"
                        >
                          Join
                        </Button>
                      )
                    ) : (
                      <Link href={`teams/${team.id}`}>
                        <Button className="px-6">Go there</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Teams;
