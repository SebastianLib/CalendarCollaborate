import { prisma } from "@/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  console.log(user);
  if (!user) {
    redirect("/");
  }

  return (
    <div className="mt-10 container mx-auto">
      <h1 className="text-center text-3xl font-bold">
        {user?.firstName} Profile
      </h1>
      <Image
        src={user.photo}
        width={80}
        height={80}
        alt="user profile"
        className="rounded-full"
      />
      <h2 className="font-bold text-xl">
        {user.firstName} {user.lastName}
      </h2>
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
};

export default page;
