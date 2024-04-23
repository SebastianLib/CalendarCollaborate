import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/db';


export async function POST(req:Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { name, selectedPeople } = await req.json();

    const clerkIds = selectedPeople.map((user:any) => user.clerkId);
    const teamMemberships = clerkIds.map((clerkId: string) => ({
        clerkId:clerkId,
      })).concat({clerkId: userId, role:"owner"});
      
      const newTeam = await prisma.team.create({
        data: {
          name,
          members: {
            create: teamMemberships,
          },
        },
      });
    return NextResponse.json(newTeam);
  } catch (error) {
    console.log('[CREATE_TASK]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}