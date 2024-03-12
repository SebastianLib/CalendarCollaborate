import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/db';

export async function DELETE(req:Request,
    { params }: { params: { teamId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { deleteUserId } = await req.json();

    const deletedUser = await prisma.teamMembership.delete({
        where:{
            teamId: params.teamId,
            id: deleteUserId
        }
    })

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log('[CREATE_TASK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}