"use client";
import { Button } from "@/components/ui/button";
import { Follower, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  user: User;
  isMyAccount: boolean;
  followers:( Follower&{follower:User})[] | null;
  following:( Follower&{user:User})[] | null;
  isFollowing: boolean;
}

const UserProfile = ({
  user,
  isMyAccount,
  followers,
  isFollowing,
  following
}: UserProfileProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    
  const handleFollow = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/profile/${user.clerkId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeFollow = async() => {
    try {
      setLoading(true);
      await axios.delete(`/api/profile/${user.clerkId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      <Image
        src={user.photo}
        width={80}
        height={80}
        alt="user profile"
        className="rounded-full"
      />
      <h2 className="font-bold text-xl">{user.username}</h2>
      {isFollowing ? (
        <Button variant="secondary" disabled={loading} onClick={removeFollow} className="w-full max-w-40">
          Unfollow
        </Button>
      ) : (
        <>
          {!isMyAccount && (
            <Button disabled={loading} onClick={handleFollow} className="w-full max-w-40">
              Follow
            </Button>
          )}
        </>
      )}
      <div className="flex justify-center gap-4">
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold">
            {isMyAccount ? "my followers" : "followers"}
          </h2>
          <ProfileModal followers={followers} type="followers"/>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold">
            {isMyAccount ? "my following" : "following"}
          </h2>
          <ProfileModal following={following} type="following"/>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
