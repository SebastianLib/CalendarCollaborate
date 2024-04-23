import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/db';

export async function PATCH(req:Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { teamId } = await req.json();

    const member = await prisma.teamMembership.create({
        data:{
            clerkId: userId,
            teamId: teamId
        }
    })

    return NextResponse.json(member);
  } catch (error) {
    console.log('[CREATE_TASK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}