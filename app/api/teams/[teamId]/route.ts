import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import db from '@/db';

export async function DELETE(req: Request,
  { params }: { params: { teamId: string } }) {

  const { teamId } = params;
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { deleteUserId } = await req.json();

    await db.teamMembership.delete({
      where: {
        teamId: teamId,
        id: deleteUserId
      }
    })

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log('[CREATE_TASK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { teamId: string } }) {
  const {data}= await request.json()
    
  if (!data.name || !params.teamId) {
    return NextResponse.json({ "message": 'missing required data' });
  }
  await db.team.update({
    where: {
      id: params.teamId
    }, data: {
      name: data.name
    }
  })

  return NextResponse.json({ status: 200 });
}