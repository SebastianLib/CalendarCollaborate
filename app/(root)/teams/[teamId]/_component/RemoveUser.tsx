"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface RemoveUserProps {
  userId: string;
}

const RemoveUser = ({ userId }: RemoveUserProps) => {
  const params = useParams<{ teamId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRemoveUser = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.delete(`/api/teams/${params.teamId}`, {
        data: {
          deleteUserId:userId,
        },
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      size="sm"
      variant="destructive"
      onClick={handleRemoveUser}
    >
      Remove
    </Button>
  );
};

export default RemoveUser;
