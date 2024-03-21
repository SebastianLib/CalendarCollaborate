import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/db';

export async function DELETE(req:Request,
    { params }: { params: { teamId: string } }) {

      const {teamId} = params;
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { deleteUserId } = await req.json();  

    await prisma.teamMembership.delete({
        where:{
            teamId: teamId,
            id: deleteUserId
        }
    })

    return NextResponse.json({status:200});
  } catch (error) {
    console.log('[CREATE_TASK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}