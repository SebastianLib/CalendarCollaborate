import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

export async function POST(req:Response) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { name, selectedPeople } = await req.json();

    const clerkIds = selectedPeople.map((user:any) => user.clerkId);
    const teamMemberships = clerkIds.map((clerkId: string) => ({
        clerkId,
      })).concat({clerkId: userId});

      const newTeam = await prisma.team.create({
        data: {
          name,
          ownerId: userId,
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