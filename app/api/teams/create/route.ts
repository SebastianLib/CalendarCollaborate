import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import db from '@/db';


export async function POST(req:Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthorized', { status: 401 });
    }

    const { name, people } = await req.json();

    const clerkIds = people.map((user:any) => user.clerkId);
    const teamMemberships = clerkIds.map((clerkId: string) => ({
        clerkId:clerkId,
      })).concat({clerkId: userId, role:"owner"});
      
      const newTeam = await db.team.create({
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