import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Follower, User } from "@prisma/client";
import SingleFollower from "./SingleFollower";

interface ProfileModalProps {
  followers?: (Follower & { follower: User })[] | null;
  type: "followers" | "following";
  following?: (Follower & { user: User })[] | null;
}

const ProfileModal = ({ followers, following, type}: ProfileModalProps) => {

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
            followers?.length === 0 ? (
              <p className="text-center">No followers</p>
            ) : (
              <div>
                {followers?.map((user) => (
                  <SingleFollower
                    key={user.follower.id}
                    follower={user.follower}
                  />
                ))}
              </div>
            )
          ) : following?.length === 0 ? (
            <p className="text-center">No following</p>
          ) : (
            <div>
              {following?.map((follower) => (
                <SingleFollower
                  key={follower.user.id}
                  follower={follower.user}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
