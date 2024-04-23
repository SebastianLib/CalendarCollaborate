"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface RemoveTeamOrUserProps {
  isOwner: boolean;
}

const RemoveTeamOrUser = ({ isOwner }: RemoveTeamOrUserProps) => {
  const { userId } = useAuth();
  const { teamId } = useParams<{ teamId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLeftOrRemove = async ({
    type,
  }: {
    type: "removeTeam" | "leftTeam";
  }) => {
    try {
      setLoading(true);
      await axios.delete(`/api/teams/${teamId}/${type}`, {
        data: {
          userIdToDelete: userId,
          isOwner: isOwner
        },
      });
      toast.success(type === "removeTeam" ? "you have removed the team" : "you have left the team");
      router.push("/teams");
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
        <AlertDialog>
        <AlertDialogTrigger
        className="bg-red-500 text-white max-w-[200px] w-full text-md px-4 py-2 rounded-md
        hover:bg-red-500/90 transition"
        >
         {isOwner ? "Remove Team" : "Left this team"}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction  disabled={loading}
            onClick={() => handleLeftOrRemove({ type: isOwner ? "removeTeam" : "leftTeam"})}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>  
  );
};

export default RemoveTeamOrUser;
