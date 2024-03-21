import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";
  import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import CreateTeamForm from "./CreateTeamForm";

const CreateTeam = async() => {

    const {userId} = auth();

    if(!userId) redirect("/")

    const people = await prisma.user.findMany({
        where: {
          NOT: {
            clerkId: userId
          }
        }
      });
      
  return (
    <Dialog>
    <DialogTrigger className="bg-blue-500 text-white px-4 py-2 flex items center gap-2"><Plus/> Create Team</DialogTrigger>
    <DialogContent>
      <CreateTeamForm people={people}/>
    </DialogContent>
  </Dialog>
  )
}

export default CreateTeam