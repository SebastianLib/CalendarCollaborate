import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import React from "react";

interface RemoveTeamOrUserProps {
  ownerId: string;
}

const RemoveTeamOrUser = ({ ownerId }: RemoveTeamOrUserProps) => {
  const { userId } = auth();

  return (
    <div>
      {userId === ownerId ? (
        <Button variant="destructive">Remove Team</Button>
      ) : (
        <Button variant="destructive">Left this team</Button>
      )}
    </div>
  );
};

export default RemoveTeamOrUser;
