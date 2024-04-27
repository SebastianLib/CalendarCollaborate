import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import db from '@/db';

export async function DELETE(req:Request,
    { params }: { params: { teamId: string } }) {
      const {teamId} = params;
  try {
    const { userIdToDelete } = await req.json();
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }
    await db.task.deleteMany({
      where:{
          teamId: teamId,
          userId: userId,
      }
  });
    
    const deletedUser = await db.teamMembership.deleteMany({
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