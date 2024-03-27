"use client"
import {useUser } from "@clerk/nextjs";
import Image from "next/image";

const UserProfile = () => {
    const { isLoaded, isSignedIn, user } = useUser()
    if (!isLoaded || !isSignedIn) {
      return null
    }
    
    return (
        <div className="flex flex-col gap-2 items-center mt-4">
            <Image
            src={user.imageUrl}
            width={80}
            height={80}
            alt="user profile"
            className="rounded-full"
            />
                <h2 className="font-bold text-xl">{user.firstName} {user.lastName}</h2>
                <div className="flex justify-center gap-4">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="font-semibold">My followers</h2>
                        <p>5</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="font-semibold">My following</h2>
                        <p>7</p>
                    </div>
                </div>
        </div>
    );
}

export default UserProfile;