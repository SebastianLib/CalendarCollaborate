import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import db from '@/db';

export async function DELETE(req:Request,
    { params }: { params: { teamId: string } }) {
  try {
    const {teamId} = params
    const { ownerId } = await req.json()
    const { userId } = auth();

    if (!userId || ownerId) {
      return new NextResponse('unauthorized', { status: 401 });
    }
    
    await db.team.delete({
      where:{
          id: teamId
      }
  })

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log('[CREATE_TASK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}