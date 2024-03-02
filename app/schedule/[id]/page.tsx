import { prisma } from "@/db";
import Information from "./_components/Information";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SinglePage = async({
    params
  }:{
    params: {id: string;}
  }) => {

    const {userId} = auth();

    if(!userId) redirect("/")

    const singleTask = await prisma.task.findUnique({
      where: {
        userId,
        id: params.id
      }
    })
        
  return (
    <div>
      <Information singleTask={singleTask!}/>
    </div>
  )
}

export default SinglePage