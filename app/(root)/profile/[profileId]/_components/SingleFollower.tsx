import { getFollowers } from "@/actions/getFollowers";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SingleFollowerProps {
  follower: User;
}

const SingleFollower = ({ follower }: SingleFollowerProps) => {
  const { userId } = useAuth();
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
    
  const handleFollow = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`/api/profile/${follower.clerkId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeFollow = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.delete(`/api/profile/${follower.clerkId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkFollowing = async () => {
      const data = await getFollowers(follower.clerkId);
      const allFollowers = data?.map((follower) => {
        return follower.follower;
      });
      const following = allFollowers?.some(
        (follower) => follower.clerkId === userId
      );
      setIsFollowing(following);
    };
    checkFollowing();
  }, [handleFollow, removeFollow]);

  return (
    <Link
      key={follower.id}
      href={follower.clerkId}
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
      {isFollowing ? (
        <Button
          variant="secondary"
          disabled={loading}
          onClick={removeFollow}
          className="w-full max-w-20"
        >
          Unfollow
        </Button>
      ) : (
        <Button
          disabled={loading}
          onClick={handleFollow}
          className="w-full max-w-20"
        >
          Follow
        </Button>
      )}
    </Link>
  );
};

export default SingleFollower;
