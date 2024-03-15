import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/db';

export async function DELETE(req:Request,
    { params }: { params: { teamId: string } }) {
  try {
    const {teamId} = params

    const { userId } = auth();
    if (!userId ) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const team = await prisma.team.findUnique({
      where: {
        id: teamId
      }
    })

    if (userId !== team?.ownerId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    await prisma.teamMembership.deleteMany({
      where:{
          teamId: teamId
      }
  })
    
     await prisma.team.delete({
        where:{
            id: teamId
        }
    })

      await prisma.task.deleteMany({
        where:{
            teamId: teamId
        }
    })

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log('[CREATE_TASK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}