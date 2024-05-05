"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { toast } from "react-toastify";
interface FollowTeammatesProps {
    teammatesWithNoFollow: string[];
    membersId: string[];
}

const FollowTeammates = ({ teammatesWithNoFollow, membersId }: FollowTeammatesProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleFollow = async () => {
    setLoading(true);
    teammatesWithNoFollow.forEach(async (user: string) => {
      try {
        await axios.post(`/api/profile/${user}`);
      } catch (error) {
        console.error(error);
      }
    });
    toast.success(`You have successfully followed all members!`)
    setLoading(false);
    router.refresh();
  };

  const handleRemoveFollow = async () => {
    setLoading(true);
    membersId.forEach(async (user: string) => {
      try {
        await axios.delete(`/api/profile/${user}`);
      } catch (error) {
        console.error(error);
      }
    });
    toast.success(`You have successfully unfollowed all members!`)
    setLoading(false);
    router.refresh();
  };

  return (
    <div>
      {teammatesWithNoFollow.length > 0 ? (
        <Button
          className="text-md max-w-[200px] w-full"
          onClick={handleFollow}
          disabled={loading || teammatesWithNoFollow.length === 0}
        >
          Follow all members
        </Button>
      ) : (
        <Button
          className="text-md max-w-[200px] w-full"
          onClick={handleRemoveFollow}
          disabled={loading}
          variant="secondary"
        >
          
        Unfollow all members
        </Button>
      )}
    </div>
  );
};

export default FollowTeammates;
