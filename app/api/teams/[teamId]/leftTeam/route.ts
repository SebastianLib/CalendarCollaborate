import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/db';

export async function DELETE(req:Request,
    { params }: { params: { teamId: string } }) {
      const {teamId} = params;
  try {
    const { userIdToDelete } = await req.json();
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }
    await prisma.task.deleteMany({
      where:{
          teamId: teamId,
          userId: userId,
      }
  });
    
    const deletedUser = await prisma.teamMembership.deleteMany({
        where:{
            teamId: teamId,
            clerkId: userIdToDelete
        }
    })

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.log('[CREATE_TASK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}