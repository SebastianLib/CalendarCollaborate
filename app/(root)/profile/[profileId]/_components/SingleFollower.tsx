
import { Button } from "@/components/ui/button";
import {User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SingleFollowerProps {
  follower: User;
}

const SingleFollower = ({ follower}: SingleFollowerProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFollow = async (e:any ,type: "follow" | "unfollow") => {
    e.preventDefault();
    try {
      setLoading(true);
      if (type === "follow") {
        await axios.post(`/api/profile/${follower.clerkId}`);
      } else {
        await axios.delete(`/api/profile/${follower.clerkId}`);
      }
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div
      key={follower.id}
      className="flex items-center justify-between w-full gap-2 hover:bg-slate-50 transition p-4"
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src={follower.photo}
          width={30}
          height={30}
          alt="user image"
        />
        <p>{follower.username}</p>
      </div>
      <Link href={follower.clerkId}>
        <Button>
          View Profile
        </Button>
      </Link>
    </div>
  );
};

export default SingleFollower;
