import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Follower, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import SingleFollower from "./SingleFollower";

interface ProfileModalProps {
  followers?: (Follower & { follower: User })[] | null;
  type: "followers" | "following";
  following?: (Follower & { user: User })[] | null;
}

const ProfileModal = ({ followers, following, type }: ProfileModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {type === "followers" ? followers?.length || 0 : following?.length || 0}
      </DialogTrigger>
      <DialogContent>
        <h1 className="text-center font-bold text-2xl border-b pb-2">
          {type === "followers" ? "followers" : "following"}
        </h1>
        <div>
          {type === "followers" ? (
            <div>
              {followers?.map((follower) => (
                <SingleFollower
                  key={follower.follower.id}
                  follower={follower.follower}
                />
              ))}
            </div>
          ) : (
            <div>
              {following?.map((follower) => (
                <Link
                  key={follower.user.id}
                  href={follower.user.clerkId}
                  className="flex items-center gap-2 hover:bg-slate-50 transition p-4"
                >
                  <Image
                    className="rounded-full"
                    src={follower.user.photo}
                    width={30}
                    height={30}
                    alt="user image"
                  />
                  <p>{follower.user.username}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
